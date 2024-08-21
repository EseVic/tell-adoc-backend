var express = require("express");
var router = express.Router();
const { bookingsController } = require('../../controllers/bookings.controller')
// const { jwtAuth } = require("../middleware/auth");

/* create new record. */
// router.post("/create", bookingsController.create);

/* GET users listing. */
router.get("/getall", 
bookingsController.getAll);

router.get("/patient", 
bookingsController.getbyPatientId);

router.get("/doctor", 
bookingsController.getbyDoctorId);



/* GET each booking by Id. */
router.get(
  "/:id",
  bookingsController.getByBookingId
);

/* GET each booking by userID. */

router.get(
  "/userBookings",
  bookingsController.getByBookingId
);


/* Update user record by id. */
router.put("/update/:id", bookingsController.update);

/* Update user record by id. */
router.post("/create-booking", bookingsController.createBooking);


/* Delete user by id. */
router.delete("/delete/:id", bookingsController.delete);

module.exports = router;
