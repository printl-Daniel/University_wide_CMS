const { upload, parseCSV } = require('../../middleware/csvUpload');
const Student = require('../../models/Student/studentModel');

// Route to upload the CSV and save data to the database
exports.uploadCSV = (req, res, next) => {
  upload.single('csvFile')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: `Error uploading file: ${err.message}` });
    }

    parseCSV(req, res, async () => {
      try {
        if (!req.parsedData || req.parsedData.length === 0) {
          return res.status(400).json({ message: 'No data found in the CSV file.' });
        }

        // Insert the parsed data into MongoDB
        const savedStudents = await Student.insertMany(req.parsedData);

        return res.status(200).json({
          message: 'CSV data successfully uploaded and saved.',
          students: savedStudents,
        });
      } catch (error) {
        console.error('Error saving data to database:', error);
        return res.status(500).json({ message: 'Error saving data to database.' });
      }
    });
  });
};

// Route to fetch all students from the database with optional filters
exports.displayAllData = async (req, res) => {
  const { college, yearAndSection } = req.query;

  try {
    let filterCriteria = {};

    // Apply filters if provided
    if (college) filterCriteria.college = college;
    if (yearAndSection) filterCriteria.yearAndSection = yearAndSection;

    // Fetch students from the database with the filter criteria
    const students = await Student.find(filterCriteria);

    return res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Error fetching data from database.' });
  }
};

// Route to fetch all distinct colleges from the database
exports.getColleges = async (req, res) => {
  try {
    // Fetch distinct colleges from the Student model
    const colleges = await Student.distinct('college');
    
    return res.status(200).json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return res.status(500).json({ message: 'Error fetching colleges' });
  }
};


exports.getYearAndSections = async (req, res) => {
  try {
    // Fetch distinct Year and Section combinations
    const yearAndSections = await Student.distinct('yearAndSection');
    
    return res.status(200).json(yearAndSections);
  } catch (error) {
    console.error('Error fetching Year & Sections:', error);
    return res.status(500).json({ message: 'Error fetching Year & Sections' });
  }
};