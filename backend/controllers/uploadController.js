// controllers/uploadController.js
const uploadFile = (req, res) => {
    console.log(req.file);
    res.status(200).json({ message: 'File uploaded successfully!' });
  };
  
  module.exports = {
    uploadFile,
  };