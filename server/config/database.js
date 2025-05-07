
const mongoose = require('mongoose');
require('dotenv').config();


exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log('database connection established') })
        .catch((err) => {

            console.log('error connecting to database');
            console.log(err);
            process.exit(1);

    })
}