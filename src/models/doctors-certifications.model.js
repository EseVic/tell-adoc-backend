module.exports = (sequelize, dataType) => {
  const doctorCertifications  = sequelize.define('doctorCertifications', {
    doctorId: {
      type: dataType.INTEGER,
      allowNull: false,
      trim: true,
      unique: true,
    },
    certificationName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    certificationIssuingAuthority: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    certificationDate: {
      type: dataType.DATE,
      allowNull: false,
      trim: true
    },
    certificationExpiryDate: {
      type: dataType.DATE,
      allowNull: true,
      trim: true,
    },
    certificationComment: {
      type: dataType.STRING,
      trim: true,
      
    },
  });

  return doctorCertifications;
};
