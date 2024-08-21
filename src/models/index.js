const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');
const fs = require("fs");

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

// const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
//   host: sequelize.host,
//   dialect: sequelize.dialect,
//   pool: {
//     min: 0,
//     max: 100,
//     acquire: 5000,
//     Idle: 1000,
//   },
// });


sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.doctor = require('./doctor.model')(sequelizeInstance, Sequelize);
db.patient = require('./patient.model')(sequelizeInstance, Sequelize);
db.doctorCertifications = require('./doctors-certifications.model')(sequelizeInstance, Sequelize);
db.booking = require('./booking')(sequelizeInstance, Sequelize);
db.department = require('./department') (sequelizeInstance, Sequelize);
db.calendar = require('./calendar') (sequelizeInstance, Sequelize);

// relationships for models

db.users.hasOne(db.patient)
db.patient.belongsTo(db.users);

db.users.hasOne(db.doctor)
db.doctor.belongsTo(db.users);

// db.doctor.hasMany(db.patient);
// db.patient.belongsTo(db.doctor)

// db.patient.hasMany(db.doctor)
// db.doctor.belongsTo(db.patient)

db.patient.belongsToMany(db.doctor, {through: "patient_doctor"})
db.doctor.belongsToMany(db.patient, {through: "patient_doctor"})

db.doctorCertifications.hasMany(db.doctor)
db.doctor.belongsTo(db.users)

db.users.hasMany(db.booking)
db.booking.belongsTo(db.users)

db.department.hasMany(db.users);
db.users.belongsTo(db.department);

db.users.hasOne(db.calendar);
db.calendar.belongsTo(db.users);



module.exports = {
  db,
};
