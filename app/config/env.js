const env = {
    database : "csv_data",
    username : "root",
    password : "root",
    host : "localhost",
    dialect : `mysql`,
    pool : {
        max : 5,
        min : 0,
        acquire : 40000,
        idle : 10000
    }

};

module.exports = env;