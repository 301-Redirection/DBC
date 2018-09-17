const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../');
require('module').Module._initPaths();
const models = require('models');
const config = require('../../config/config.js');
const Sequelize = require('sequelize');
const { spawnSync } = require('child_process');

const IS_WIN = process.platform === 'win32';

describe('MySQL Intial Testing', () => {
    let sequelize;
    beforeAll((done) => {
        sequelize = new Sequelize(
            '',
            config.test.username,
            config.test.password,
            {
                host: 'localhost',
                dialect: 'mysql',
                dialectOptions: { multipleStatements: true },
            }
        );
        sequelize.query(`DROP DATABASE IF EXISTS ${config.test.database}; CREATE DATABASE ${config.test.database};`)
            .then(() => {
                const otherPath = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
                const child = spawnSync(otherPath, ['db:migrate'], { stdio: [0, 1, 2] });
                if (child.error) {
                    throw child.error;
                }
                const otherPath2 = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
                const child2 = spawnSync(otherPath2, ['db:seed:all'], { stdio: [0, 1, 2] });
                if (child2.error) {
                    throw child2.error;
                }
                sequelize.query(`use ${config.test.database}`).then(() => { done(); });
            });
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
            sequelize.query('show tables;').then((myTableRows) => {
                let isPresent = false;
                for (let i = myTableRows.length - 1; i >= 0; i -= 1) {
                    if (myTableRows[i][0].Tables_in_test.toLowerCase() === 'BotConfigs'.toLowerCase()) {
                        isPresent = true;
                        break;
                    }
                }
                expect(isPresent).toBe(true);
                done();
            });
        });
        it('Seeding data (25 records)', (done) => {
            models.BotConfig.findAndCountAll().then((result) => {
                expect(result.count).toBe(25);
                done();
            });
        });
    });
});
