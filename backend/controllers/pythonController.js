const { spawn } = require('child_process');
const path = require('path');

const callPythonScript = (filePath) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = path.join(__dirname, '..', 'scripts', 'test.py');
        const pythonProcess = spawn('python', [pythonScriptPath, filePath]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data.toString()}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data.toString()}`);
            reject(new Error(`Python script error: ${data.toString()}`));
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                resolve(`Python script exited with code ${code}`);
            }
        });
    });
};

module.exports = {
    callPythonScript,
};