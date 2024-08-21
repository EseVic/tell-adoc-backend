const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const db = require("../models/index");
const bcrypt = require('bcryptjs');
const { constants } = require("./constants");
const users = db.user;
const department = db.department;
require('dotenv').config();

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


//Doctor Session
exports.userController = {
  createDoctor: (req, res) => {
      const user = req.body;
      user.password = bcrypt.hashSync(user.password, 10);
      if(user.userType !== "doctor"){
          res.status(400)
             .send({
              message: "User Must be a doctor"
            })
      }else{
      users.create(user, {include: {
          model: department,
          attributes:['departmentId']
      }}
        ).then((data) => {
        res.status(200).send({
          success: true, 
          message: "Doctor Added Successfully",
          data: data
        });
          }).catch((err) => {
        constants.handleErr(err, res)
          })
        }
  },

  getById: (req, res) => {
    users
      .findOne({
        where: {
          id: req.userId
        },
      })
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: "Record not found",
          });
        }
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record",
        });
      });
  },

  updateProfile: (req, res) => {
    const user = req.body;
    user.id = req.userId;
    if(user.password){
      user.password = bcrypt.hashSync(user.password, 10);
    }
    users  
      .update(user, {where: {
        id: user.id
      }}, {include: {
        model: department,
        attributes:['departmentId']
    }})
      .then((data) => {
        if (data[0] !== 1) {
          res.status(400).send({
            message: "Record not found",
          });
        }
        res.status(200).send({message: "Record Updated"});
      })
      .catch((err) => {
        constants.handleErr(err, res);
      })
  },
  getAllPatients: (req, res) => {
    users
      .findAll()
      .then((data) => {

        let userObj = [];
        data.forEach((user) => {
          if(user.userType === "patient") {
            userObj.push(user)
          }
          
        });


        res.status(200).send({
          success: true,
          message: "All patients retrieved successfully",
          data: userObj,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record",
        });
      });
  },
  getAllDoctors: (req, res) => {
    users
      .findAll()
      .then((data) => {

        let userObj = [];
        data.forEach((user) => {
          if(user.userType === "doctor") {
            userObj.push(user)
          }
          
        });
        res.status(200).send({
          success: true,
          message: "All doctors retrieved successfully",
          data: userObj,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record",
        });
      });
  }, 
  getAllAdmin: (req, res) => {
    users 
      .findAll()
      .then((data) => {

        let userObj = [];
        data.forEach((user) => {
          if(user.userType === "doctor") {
            userObj.push(user)
          }
          
        });
        res.status(200).send({
          success: true,
          message: "All admins retrieved successfully",
          data: userObj,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record",
        });
      });
  }
};


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
