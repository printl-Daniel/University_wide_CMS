const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorControlller');

// Route to add a new doctor
router.post('/add', doctorController.createDoctor);

// Route to fetch all doctors
router.get('/', doctorController.getAllDoctors);

// Route to fetch a specific doctor by doctorId
router.get('/:doctorId', doctorController.getDoctorById);

// Route to update a doctor’s information
router.put('/:doctorId', doctorController.updateDoctor);

// Route to deactivate a doctor
// router.delete('/:doctorId', doctorController.deleteDoctor);

module.exports = router;
