// orginal code https://gist.github.com/vincentbernat/10239464

'use strict';

var setup = require('../.'),
    should = require('should'),
    path = require('path'),
    Sequelize = require('sequelize'),
    db = require('../../lib/db'),
    config = require('../../lib/config'),
    logger = require('../../lib/logger');

describe('Sequelize migration', function() {

  beforeEach(function(done) {
    // Setup the database
    db.sequelize
      .getQueryInterface()
      // .dropAllTables()
      .complete(function() { done(); }, function(err) { done(err); });
  });

  it('should execute without any error', function(done) {
    db.sequelize
      .getMigrator({
        path: path.join(config.get('path:root'), 'db', 'migrations'),
        filesFilter: /^\d.*\.js$/,
        logging: function() {}
      })
      .migrate()
      .complete(function() { done(); },
                function(err) { done(err); });
  });

  it('should give the same result as sync', function(done) {
    var s = new Sequelize('', '', '', {
      dialect: 'mysql',
      storage: ':memory:',
      logging: function() {}
    });
    s
      .getMigrator({
        path: path.join(config.get('path:root'), 'db', 'migrations'),
        filesFilter: /^\d.*\.js$/,
        logging: function() {}
      })
      .migrate()
      .then(function() {
        return db.sequelize
          .sync({force: true})
          .then(function() {
            return db.sequelize.query('CREATE TEMP VIEW sqlm AS SELECT * FROM sqlite_master',
                                      null, {raw: true});
          })
          .then(function() {
            return db.sequelize.query('SELECT sql FROM sqlm WHERE name != \'SequelizeMeta\' ORDER BY sql',
                                      null, {raw: true})
              .then(function(db1) {
                return s.query('CREATE TEMP VIEW sqlm AS SELECT * FROM sqlite_master',
                               null, {raw: true})
                  .then(function() {
                    return s.query('SELECT sql FROM sqlm WHERE name != \'SequelizeMeta\' ORDER BY sql',
                                   null, {raw: true});
                  })
                  .then(function(db2) {
                    db1.should.eql(db2);
                    done();
                  });
              });
          });
      })
      .catch(function(err) { done(err); });
  });
});