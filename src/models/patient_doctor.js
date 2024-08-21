module.exports = (sequelize, dataType) => {
    const patientDoctor = sequelize.define('patientDoctor', {    
      userId: {
        type: dataType.STRING,
        allowNull: true,
      },
    });
    
    return patientDoctor;
  };