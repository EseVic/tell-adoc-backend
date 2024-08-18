const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    personId:{
      type: dataType.STRING,
      allowNull: true,
    },
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    gender: {
      type: dataType.ENUM('male', 'female'),
      allowNull: false,
      trim: true,
    },
    dateOfBirth: {
      type: dataType.DATE,
      allowNull: false,
      trim: true,
    },
    phoneNumber: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: dataType.STRING,
      allowNull: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: dataType.ENUM('doctor', 'patient', 'admin'),
      allowNull: false,
      trim: true,
    },
    verifyToken:  {
      type: dataType.STRING,
     
    }
  });

  user.associate = (models) => {
    user.hasOne(models.Agent, {
      foreignKey: 'userId',
      onDelete: 'CASCADE', // This ensures that when a user is deleted, the associated agent is also deleted
    });
  };

  return user;
};
