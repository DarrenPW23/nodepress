global.checkENV = () => {
    if(global.DB == 'undefined') throw new Error(`err[1] Database environment undefined.`);
    if(global.DB.db_host == 'undefined') throw new Error(`err[2] Database host undefined.`);
    if(global.DB.db_name == 'undefined') throw new Error(`err[3] Database name undefined.`);
    if(global.DB.db_user == 'undefined') throw new Error(`err[4] Database user undefined.`);
}