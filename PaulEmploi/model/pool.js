var mysql = require("mysql");
var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p028",
    password: "j136vcydSRLj",
    database: "sr10p028"
});
module.exports = pool;
