const Doctor = require('../models/doctorModel');

exports.createDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, specialty, availability, staffId } = req.body;
    const newDoctor = new Doctor({
      firstName,
      lastName,
      email,
      phone,
      specialty,
      availability,
      staffId,
    });
    
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }

  exports.getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
  };
  
  exports.getDoctorById = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ doctorId: req.params.doctorId });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctor', error: error.message });
    }
  };
  
  exports.updateDoctor = async (req, res) => {
    try {
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { doctorId: req.params.doctorId },
        req.body,
        { new: true }
      );
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ message: 'Error updating doctor', error: error.message });
    }
  };
  
//   exports.deleteDoctor = async (req, res) => {
//     try {
//       const deletedDoctor = await Doctor.findOneAndDelete({ doctorId: req.params.doctorId });
//       if (!deletedDoctor) {
//         return res.status(404).json({ message: 'Doctor not found' });
//       }
//       res.status(200).json({ message: 'Doctor deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting doctor', error: error.message });
//     }
//   };
};


