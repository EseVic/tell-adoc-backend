// const { db } = require("../models");
// // const bcrypt = require("bcryptjs");
// // const { sign } = require("jsonwebtoken");
// require("dotenv").config();
// // const { emailService } = require('../services');

// // const axios = require("axios");
// // const generator = require("generate-password");
// // const { email } = require("../config/config");



// exports.patientController = {


//  createPatient: (req, res) => {
//   let patientId = req.params.patientId
//   const payload = {patientId: patientId, ...req.body}
//   db.leads.create(payload)
//   .then(async (data) => {
//       res.status(200).send({
//           data,
//           status: true,
//           message: "Patient created successfully!",
//         });
//   })
//   .catch((err) => {
//     res.status(400).send({
//       message: err.message || "Could not find record!",
//       status: false
//     });
//   });
// },

//  getAllPatients: (req, res) => {
//   let patientId = req.params.agentId

//     db.users
//       .findAndCountAll({
//         where: {patientId: patientId},
//         include: [{
//           model: db.patient,
//           as: "patient",   
//       }],

//       })
//       .then((data) => {
//         res.status(200).send({
//           data,
//           status: true,
//           message: "all patients retrieved successfully!",
//         });
//       })
//       .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record!",
//           status: false
//         });
//       });
//   },

//   getSinglePatient: (req, res) => {
//     // let agentId = req.params.agentId
//     let patientId = req.params.patientId

//     db.users
//       .findOne({
//         where: {id: patientId},
//         include: [{
//           model: db.patient,
//           as: "patient",   
//       },
//       {
//         model: db.patient,
//         as: "patient",   
//     }
//     ],

//       })
//       .then((data) => {
//         res.status(200).send({
//           data,
//           status: true,
//           message: "patient retrieved successfully!",
//         });
//       })
//       .catch((err) => {
//         res.status(400).send({
//           message: err.message || "Could not find record!",
//           status: false
//         });
//       });
//   },

//   updateLead: (req, res) => {
//     let leadId = req.params.leadId
//     const payload = req.body
//     db.policy.update(payload, {
//         where: {
//           id: leadId,
//         },
//       })
//     .then(async (data) => {
//         res.status(200).send({
//             data,
//             status: true,
//             message: "Lead updated successfully!",
//           });
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: err.message || "Could not find record!",
//         status: false
//       });
//     });
//  },

// }