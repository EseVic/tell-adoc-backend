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



  /**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: patient doctor booking
 */

 /**
 * @swagger
 * /booking/doctorId:
 *  post:
 *     summary: Create booking
 *     description: Doctor and Patient can create bookings.
 *     tags: [Bookings]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingType
 *               - duration
 *               - amount
 *             properties:
 *               bookingType:
 *                 type: string
 *               duration:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               bookingsType: Car Insurance
 *               duration: 4yrs
 *               amount: 200000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/policy'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 *  get:
 *     summary: Get all bookings
 *     description: patient and patient can retrieve all bookings.
 *     tags: [bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: booking
 *         schema:
 *           type: string
 *         description: booking type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: booking duration
 *       - in: query
 *         name: amount
 *         schema:
 *           type: string
 *         description: amount to be paid 
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/policy'
 *       
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
 /**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking
 *     description: Only authorized users can fetch booking information.
 *     tags: [bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: booking
 *         schema:
 *           type: string
 *         description: booking type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: booking duration
 *       - in: query
 *         name: amount
 *         schema:
 *           type: string
 *         description: amount to be paid 
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Plan'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a booking
 *     description: Only authorized users can update booking information.
 *     tags: [bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: booking
 *         schema:
 *           type: string
 *         description: booking type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: booking duration
 *       - in: query
 *         name: amount
 *         schema:
 *           type: string
 *         description: amount to be paid 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingType:
 *                 type: string
 *               duration:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               bookingType: surgeon
 *               duration: 4yrs
 *               amount: 200000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Plan'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete booking
 *     description: Only authorized users can delete booking.
 *     tags: [booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: booking
 *         schema:
 *           type: string
 *         description: booking type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: booking duration
 *       - in: query
 *         name: amount
 *         schema:
 *           type: string
 *         description: amount to be paid
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */