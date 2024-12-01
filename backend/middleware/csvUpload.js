const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Ensure the 'public/uploads' directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for CSV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in 'public/uploads'
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Unique filename with timestamp
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true); // Accept only CSV files
    } else {
      cb(new Error('Only CSV files are allowed'), false); // Reject non-CSV files
    }
  },
});

// Middleware to parse the uploaded CSV file
const parseCSV = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const results = [];

  // Read and parse the uploaded CSV file
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => {
      results.push({
        college: toUpperCase(data.College || ''),
        program: toUpperCase(data.Program || ''),
        yearAndSection: toUpperCase(data['Year and Section'] || ''),
        major: toUpperCase(data.Major || 'NONE'),
        studentNo: toUpperCase(data['Student No.'] || ''),
        fullname: toUpperCase(data.Fullname || ''),
      });
    })
    .on('end', () => {
      req.parsedData = results; // Attach parsed data to the request object

      // Delete the file after processing to free up space
      fs.unlinkSync(req.file.path);

      next(); // Pass control to the next middleware or route handler
    })
    .on('error', (error) => {
      console.error('Error parsing CSV:', error);
      res.status(500).json({ message: 'Error parsing CSV file' });
    });
};

// Utility function to convert a string to uppercase
const toUpperCase = (str) => {
  if (str == null) return ''; // Handle null or undefined values
  return str.trim().toUpperCase(); // Remove extra spaces and convert to uppercase
};

module.exports = { upload, parseCSV };
