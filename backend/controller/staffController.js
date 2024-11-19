const staffUser = require('../models/staffModel.js');
const bcrypt = require('bcrypt');

exports.createStaff = async (req, res) => {
    const {firstName, lastName, email, password, role, phone, address, employmentDate, status} = req.body
    
    try{

        const hashedPassword = await bcrypt.hash(password, 10);
        const { firstName, lastName, email, password, role, phone, address, employmentDate, status } = req.body;

        const newStaff = new staffUser({
          firstName,
          lastName,
          email,
          password: hashedPassword,  // Make sure to hash the password before saving
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

exports.getStaff = async (req, res) => {
    try {
        const staffMembers = await staffUser.find();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff members', error });
    }
};

// Update staff member details
exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address, status } = req.body;

    try {
        const updatedStaff = await staffUser.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                phone,
                address,
                status
            },
            { new: true }  // Return the updated document
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json({
            message: 'Staff member updated successfully',
            data: updatedStaff
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff member', error });
    }
};