const { db } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
// const { patientService } = require('../services');

// const axios = require("axios");
// const generator = require("generate-password");
// const { email } = require("../config/config");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { route } = require("../routes/v1/doctor.route");
const router = require("../routes/v1/doctor.route");



exports.patientController = {


 createPatient: (req, res) => {
  let patientId = req.params.patientId
  const payload = {patientId: patientId, ...req.body}
  db.patient.create(payload)
  .then(async (data) => {
      res.status(200).send({
          data,
          status: true,
          message: "Patient created successfully!",
        });
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || "Could not find record!",
      status: false
    });
  });
},

 getAllPatients: (req, res) => {
  let patientId = req.params.patientId

    db.users
      .findAndCountAll({
        where: {patientId: patientId},
        include: [{
          model: db.patient,
          as: "patient",   
      }],

      })
      .then((data) => {
        res.status(200).send({
          data,
          status: true,
          message: "all patients retrieved successfully!",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record!",
          status: false
        });
      });
  },

  getSinglePatient: (req, res) => {
    let patientId = req.params.patientId

    db.users
      .findOne({
        where: {id: patientId},
        include: [{
          model: db.patient,
          as: "patient",   
      },
      {
        model: db.patient,
        as: "patient",   
    }
    ],

      })
      .then((data) => {
        res.status(200).send({
          data,
          status: true,
          message: "patient retrieved successfully!",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Could not find record!",
          status: false
        });
      });
  },

  updatePatient: (req, res) => {
    let patientId = req.params.patientId
    const payload = req.body
    db.patient.update(payload, {
        where: {
          id: patientId,
        },
      })
    .then(async (data) => {
        res.status(200).send({
            data,
            status: true,
            message: "Patient updated successfully!",
          });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Could not find record!",
        status: false
      });
    });
 },

}

// // for patientdoctor service file
// const getPatientAndDoctor = async(patientId)=>{
//   const result = await db.patient.findOne({
//     where: {id: patientId},
//     include: db.doctor
//   })
//   return result;
// }

// module.exports ={
//   getPatientAndDoctor,
  
// }

// // for patientdoctor controller file

// const createPatients = catchAsync(async (req, res) =>{
//   const patients = await patientservice.createPatient(req.body);
//   res.status(httpStatus.CREATED).send(patients)
// })

// const createPatientAndDoctor = catchAsync(async (req, res) =>{
//   const patients = await patientService.createPatientAndDoctor(req.body.doctor, req.body.patients);
//   res.status(httpStatus.CREATED).send(patients)
// })

// module.exports = {
//   createPatientAndDoctor,
//   createPatients
// }

// // patient route
// router
//   .route('./patientdoctor')
//   .post(this.patientController.createPatientAndDoctor);