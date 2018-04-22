/** NOTE: a database name as specified in config should already 
 *       exist on MySQL Sever!!
 * PS: please do not remove the console.log() comments, they may be needed 
 *     in the near future...
 */

// TODO: Ensure this test runs first

const models = require('../models');
const config = require('../config/config.json');
const Sequelize = require('sequelize');
const { exec, spawnSync } = require('child_process');
const path = require('path');
const IS_WIN = process.platform === 'win32';

describe('MySQL Intial Testing', () => {
    var sequelize;
    beforeAll(() => {
        sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
            host: 'localhost',
            dialect: 'mysql',
            dialectOptions: {multipleStatements: true},
        });
        sequelize.query(`DROP DATABASE IF EXISTS ${config.test.database};  CREATE DATABASE ${config.test.database};`);
    });
    afterAll(() => {
        // TODO: workout how to drop database after *ALL* tests are run
    });
    describe('MySQL connection:', () => {
        it('existence', (done) => {
            sequelize.authenticate()
            .then(() => {
                expect(true).toBe(true);
                done();
            });
        });
    });
    describe('Seeding database:', () => {
        it('Migrating schemas', (done) => {
            const otherPath = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
            const child = spawnSync(otherPath, ['db:migrate'], { stdio: [0, 1, 2] });
            if (child.error) {
                throw child.error;
            }
            const tables = sequelize.query('show tables;').then(myTableRows => {
                let isPresent = false;
                for (let i = myTableRows.length - 1; i >= 0; i--) {
                    if (myTableRows[i][0]['Tables_in_test'] === 'BotConfigs') {
                        isPresent = true;
                        break;
                    }
                }
                expect(isPresent).toBe(true);
            });
            // console.log('error', child.error);
            // console.log('stdout ', child.stdout);
            // console.log('stderr ', child.stderr);
            done();
        });
        it('Seeding data (25 records)', (done) => {
            const otherPath = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
            const child = spawnSync(otherPath, ['db:seed:all'], { stdio: [0, 1, 2]});
            if (child.error) {
                throw child.error;
            }
            let bots = models.BotConfig.findAndCountAll().then(result => {
                // the number of items added to be database should be 25, since the database was recreated
                expect(result.count).toBe(25);
            });
            // console.log('error', child.error);
            // console.log('stdout ', child.stdout);
            // console.log('stderr ', child.stderr);
            done();
        });
    });
 
});