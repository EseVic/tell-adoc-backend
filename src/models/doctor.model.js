module.exports = (sequelize, dataType) => {
    const doctor = sequelize.define('doctor', {
      // doctorId: {
      //   type: dataType.STRING,
      //   allowNull: false,
      // },  
      currentAddress: {
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
      qualification:{
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
      specialization:{
        type: dataType.STRING,
        allowNull: true,
        trim: true,
      },
      yearsOfExperience: {
        type: dataType.DATE,
        allowNull: false,
        trim: true,
      },
      consultationFee:{
        type: dataType.INTEGER,
        allowNull: true,
        trim: true,
      },
      affiliatedHospital:{
        type: dataType.STRING,
        allowNull: true,
        trim: true,
      },
      resume:{
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
      license:{
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
    });

    return doctor;
  };