const Appointment = require('../models/Appointment');
const asyncHandler = require('express-async-handler');

// Get all appointments for a patient
exports.getPatientAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.user.id })
    .populate('doctorId', 'name specialty')
    .sort({ date: 1 });
  res.json(appointments);
});

// Create a new appointment
exports.createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time, type, location, notes } = req.body;

  const appointment = await Appointment.create({
    patientId: req.user.id,
    doctorId,
    date,
    time,
    type,
    location,
    notes
  });

  res.status(201).json(appointment);
});

// Update appointment status
exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Verify that the user owns this appointment
  if (appointment.patientId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  appointment.status = status;
  await appointment.save();

  res.json(appointment);
});

// Delete appointment
exports.deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Verify that the user owns this appointment
  if (appointment.patientId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await appointment.remove();
  res.json({ message: 'Appointment removed' });
});