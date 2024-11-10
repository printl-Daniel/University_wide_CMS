const staffUser = require('../models/staffModel.js');

exports.createStaff = async (req, res) => {
    const {firstName, lastName, email, password, role, phone, address, employmentDate, status} = req.body
    
    try{
        const { firstName, lastName, email, password, role, phone, address, employmentDate, status } = req.body;

        const newStaff = new staffUser({
          firstName,
          lastName,
          email,
          password,  // Make sure to hash the password before saving
          role,
          phone,
          address,
          employmentDate,
          status,
        });

        await newStaff.save();
        res.status(201).json({
            message: 'staff member created successfully',
            data: newStaff
        });
    } catch (error){
        res.status(500).json({ message: 'Error creating staff member', error });
    }
};