module.exports = (sequelize, dataType) => {
    const patient = sequelize.define('patient', {    
      patientId: {
        type: dataType.STRING,
        allowNull: true,
      },
    });
    
    return patient;
  };