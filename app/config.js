const appRoot = require('app-root-path');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const { isString } = require('util');

var np_utils = require('./np_utils');

const con = require('./connect');

global.APP_ROOT_PATH = appRoot.path;
global.DS = path.sep;

var env_path = global.APP_ROOT_PATH + `${DS}app${DS}environments${DS}env.js`;
env_path = !fs.existsSync(env_path) ? `.${DS}environments${DS}env.js` : env_path;

var environment = require(env_path);

global.ENV = isString(environment) ? environment : 'default';
global.DB = [];

setConfig = () => {
    let config_path = global.APP_ROOT_PATH + `${DS}app${DS}environments${DS}${global.ENV}.yml`;
    let ymlFile = null;
    let config = null;

    try {
        if (fs.existsSync(config_path)) {
            ymlFile = fs.readFileSync(config_path, 'utf8');
            config = yaml.load(ymlFile);
            global.DB = config.DB;
        }
    } catch (error) {
        global.APP_ERRORS = global.APP_ERRORS || [];
        global.APP_ERRORS.push(error);
    }

    return config;
}

setConfig();
con.connect();