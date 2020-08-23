Record = {
    ID: '',
    table: '',
    reset: function () {
        checkENV();

        var properties = Object.getOwnPropertyNames(this).filter(item => typeof this[item] !== 'function' && item != 'ID' && item != 'table');

        properties.forEach(item => {
            delete this[item];
        });

        return this;
    },
    get: function (fields = [], args = {}, table = false) {
        checkENV();

        var table = table || this.table || '';
        if(table == '' || typeof args !== 'object') return {};

        delete args.table;

        fields = fields || [];
        var keys = Object.keys(fields);
        var val = '';

        var sql = `SELECT `;
        if(keys.length < 1) {
            sql += `*`;
        } else {
            fields.forEach(field => {
                sql += `${field}`;
                
                if(field != fields[fields.length - 1]) {
                    sql += `, `;
                }
            });
        }

        sql += ` FROM `;
        sql += `${table}`;

        keys = Object.keys(args);
        val = '';
        var where = ``;
        if(keys.length > 0) {
            where += ' WHERE ';

            keys.forEach(key => {
                val = args[key];

                where += `${key} = '${val}'`;
                
                if(val == args[keys[keys.length - 1]]) {
                    where += `;`;
                } else {
                    where += ` AND `;
                }
            });
        }

        sql += where;

        return sql;
    },
    set: function (data = []) {
        checkENV();
        this.reset();

        if (data.length) {
            data.forEach((el, i) => {
                this[i] = el;
            });
        }

        return this;
    }
}

module.exports = Record;