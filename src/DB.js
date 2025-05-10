import mongoose from "mongoose";

mongoose.connect('mongodb://0.0.0.0')

const db = mongoose.connection;

function database() {

    db.on('open', () => {
        console.log("connected Sucessfully");

    });
    db.on('error', () => {
        console.log(" not connected ");

    });



}



export default database;