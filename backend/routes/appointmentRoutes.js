const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPatientAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');

// Protected routes - require authentication
router.use(protect);

router.route('/')
  .get(getPatientAppointments)
  .post(createAppointment);

router.route('/:id')
  .put(updateAppointmentStatus)
  .delete(deleteAppointment);

module.exports = router;
