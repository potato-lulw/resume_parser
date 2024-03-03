// controllers/uploadController.js

const pythonScriptController = require('./pythonController');

const uploadFile = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  console.log(req.file);
  try {
    await pythonScriptController.callPythonScript(req.file.path);
    res.status(200).json({ message: 'File processed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
};

module.exports = {
  uploadFile,
};