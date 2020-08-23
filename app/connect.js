const mysql = require('mysql');

global.npdb = () => { };

con = {
    connect: () => {
        if(global.DB == 'undefined' || (typeof global.DB == 'object' && Object.keys(global.DB).length < 1)) throw new Error(`err[1] Database environment undefined.`);
        if(global.DB.db_host == 'undefined' || global.DB.db_host == '') throw new Error(`err[2] Database host undefined.`);
        if(global.DB.db_name == 'undefined' || global.DB.db_name == '') throw new Error(`err[3] Database name undefined.`);
        if(global.DB.db_user == 'undefined' || global.DB.db_user == '') throw new Error(`err[4] Database user undefined.`);

        var con = mysql.createConnection({
            host: global.DB.db_host,
            user: global.DB.db_user,
            password: global.DB.db_password
        });

        con.connect((err) => {
            if (err) throw new Error(err);

            global.npdb = con;
        });
    }
}

module.exports = con;