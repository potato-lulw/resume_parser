const { spawn } = require('child_process');
const path = require('path');

const callPythonScript = (filePath) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = path.join(__dirname, '..', 'scripts', 'test.py');
        const pythonProcess = spawn('python', [pythonScriptPath, filePath]);

        let data = '';
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data.toString()}`);
            reject(new Error(`Python script error: ${data.toString()}`));
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Error parsing JSON response from Python script'));
                }
            }
        });
    });
};

module.exports = {
    callPythonScript,
};