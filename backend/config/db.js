const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (!db) {
        try{
            await client.connect();
        }catch(e) {
            return console.error(e);
        }
        db = client.db('resume-parser'); 
        // console.log("DB connection established")
    }
    return db;
}

module.exports = connectDB;