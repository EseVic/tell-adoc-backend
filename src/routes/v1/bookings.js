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
 *     summary: Create Policies
 *     description: Admin and agent can create policies.
 *     tags: [Policies]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - policyType
 *               - duration
 *               - amount
 *             properties:
 *               policyType:
 *                 type: string
 *               duration:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               policyType: Car Insurance
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
 *     summary: Get all policies
 *     description: admins and agents can retrieve all policies.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: policy
 *         schema:
 *           type: string
 *         description: policy type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: policy duration
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
 * /policy/{id}:
 *   get:
 *     summary: Get a policy
 *     description: Only authorized users can fetch policy information.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: policy
 *         schema:
 *           type: string
 *         description: policy type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: policy duration
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
 *     summary: Update a policy
 *     description: Only authorized users can update policy information.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: policy
 *         schema:
 *           type: string
 *         description: policy type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: policy duration
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
 *               policyType:
 *                 type: string
 *               duration:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               policyType: Car Insurance
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
 *     summary: Delete a policy
 *     description: Only authorized users can delete policies.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: policy
 *         schema:
 *           type: string
 *         description: policy type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: policy duration
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