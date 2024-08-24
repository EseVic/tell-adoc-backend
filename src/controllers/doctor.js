// const { db } = require("../models");
// const bcrypt = require("bcryptjs");
// const { sign } = require("jsonwebtoken");
// require("dotenv").config();
// const { emailService } = require('../services');

// // const axios = require("axios");
// const generator = require("generate-password");
// const { email } = require("../config/config");



// exports.doctorController = {

//  createDoctor: (req, res) => {
//     let doctorId = req.params.doctorId
//     const payload = {doctorId: doctorId, ...req.body}
//     db.doctor.create(payload)
//     .then(async (data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "doctor created successfully",
//           });
//     })
//     .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//  },


//  updateDoctor: (req, res) => {
//     let doctorId = req.params.doctorId
//     const payload = req.body
//     db.doctor.update(payload, {
//         where: {
//           id: doctorId,
//         },
//       })
//     .then(async (data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "doctor updated successfully",
//           });
//     })
//     .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//  },

//   deleteDoctor: (req, res) => {
//     let doctorId = req.params.doctorId
//     db.doctor.destroy({
//         where: {
//           id: doctorId,
//         },
//       })
//     .then(async (data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "doctor deleted successfully",
//           });
//     })
//     .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//  },

//  getDoctor: (req, res) => {
//     let doctorId = req.params.doctorId
  
//     db.doctor.findAndCountAll({
//         where: {
//             doctorId: doctorId
//           },
//       })
//       .then((data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "All Doctors retrieved successfully",
//           });
//     })
//     .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//  },

//  getOneDoctor: (req, res) => {
   
//     let doctorId = req.params.doctorId

  
//     db.doctor.findOne({
//         where: {
//             doctorId: doctorId,
//             // id: doctorId
//           },
//       })
//       .then((data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "Doctor retrived successfully",
//           });
//     })
//     .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//  },

//   getAllDoctorPatient: (req, res) => {
//     let doctorId = req.params.doctorId
//     db.patient
//       .findAndCountAll({
//         include: [{
//           model: db.doctor,
//           as: "doctor",
//           where: {id: doctorId}
//       }]
//       })
//       .then((data) => {
//         res.status(200).send({
//           data,
//           status: true,
//           message: "all patient retrieved successfully",
//         });
//       })
//       .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//   },

//   getSinglePatientInfo: (req, res) => {
//     let patientId = req.params.patientId
//     db.patient
//       .findOne({
//         include: [{
//           model: db.doctor,
//           as: "doctor",
//           where: {id: agentId}
//       }]
//       })
//       .then((data) => {
//         res.status(200).send({
//           data,
//           status: true,
//           message: "patient info retrieved successfully",
//         });
//       })
//       .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record",
//           status: false
//         });
//       });
//   },


//   //Bookings

//   getAllBookings: (req, res) => {
//     let doctorId = req.params.doctorId
  
//       db.booking
//         .findAndCountAll({
//           include: [{
//             where: {doctorId: doctorId},
//             model: db.patient,
//             as: "patient",   
//         },{
//             model: db.doctor,
//             as: "doctor",   
//         }],
  
//         })
//         .then((data) => {
//           res.status(200).send({
//             data,
//             status: true,
//             message: "all Doctor's booking retrieved successfully",
//           });
//         })
//         .catch((err) => {
//           res.status(400).send({
//             message: err.message || "Could not find record",
//             status: false
//           });
//         });
//     },

// }
