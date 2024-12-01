const express = require('express');
const router = express.Router();
const { uploadCSV, displayAllData, getColleges, getYearAndSections} = require('../../controller/StudentEnrollment/csvController');

// Route for uploading CSV file
router.post('/upload', uploadCSV);

// Route for fetching all students
router.get('/students', displayAllData);

router.get('/colleges', getColleges);

router.get('/year-and-sections', getYearAndSections);
module.exports = router;
