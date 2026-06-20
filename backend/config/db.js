const mysql=require("mysql2");

const db=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "competitive_programming"
});

module.exports=db.promise();