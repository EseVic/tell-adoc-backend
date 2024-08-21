var express = require('express');
var router = express.Router();
const {calendarController} = require("../../controllers/calendar.controller")
// const { jwtAuth } = require("../middleware/auth");


/* Uodate specific calendar. */
router.put('/update/:id', calendarController.update);


/* Get all doctors calendar. */
router.get('/all', calendarController.getAll);

/* Create doctor calendar. */
router.post('/create', calendarController.create);

/* Get calendar of a doctor. */
router.get('/doctor/:id', calendarController.getByDoctorId);

/* Get calendar of a doctor. */
// router.post('/create-multiple', calendarController.createMultiple);


/* Get calendar by its id. */
// router.get('/:id', calendarController.getByCalendarId);

/* delete calendar by its id. */
router.delete('/delete/:id', calendarController.delete);




module.exports = router;
