const { db } = require('../models');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const randn = require('randn');
const { authService, userService, tokenService, emailService } = require('../services');

// console.log(randn(6));

const register = catchAsync(async (req, res) => {
  const type = req.query.type;
  // console.log(type)
  let verifyToken = '';
  // let emaildata = {};
  switch (type) {
    case 'doctor':
      const user = req.body;
      // console.log(user);
      if (!req.body || !req.body.email) {
        res.status(400).send({
          status: false,
          message: 'All field required',
        });
      }
      db.users
        .findOne({
          where: {
            email: user.email,
          },
        })
        .then(async (data) => {
          if (data && data.isEmailVerified) {
            res.status(404).send({
              status: false,
              message: 'This Email is taken',
            });
          } else if (data && !data.isEmailVerified) {
            verifyToken = generator.generate({
              length: 5,
              numbers: true,
            });
            
            const to = [data.email.toString()];
            const subject = 'Verify your account';
            const text = `Dear user, 
                Thanks for signing up to Tell-adoc! Your verification pin is: ${verifyToken}`;
            await emailService.sendEmail(to, subject, text);
            await db.users.update({verifyToken: verifyToken}, { where: { id: data.id } });

            res.status(200).send({
              status: true,
              message: 'Token sent to mail',
              data

            
            });
          } else {
            if (user.password) {
              user.password = bcrypt.hashSync(user.password, 10);
            }
            //  else {
            //   user.password = bcrypt.hashSync(user.doctor, 10);
            // }

            //token verification
            user.userType = 'doctor';
            verifyToken = generator.generate({
              length: 5,
              numbers: true,
            });
            user.verifyToken = verifyToken;
            db.users
              .create(user)
              .then(async (data1) => {
                await db.doctor.create({ ...user, userId: data1.id, doctorId: `DOC-${(randn(6))}` });
                const to = [data1.email.toString()];
                const subject = 'Verify your account';
                const text = `Dear user,
                Thanks for signing up to Tell-adoc! Your verification pin is: ${verifyToken}`;
                await emailService.sendEmail(to, subject, text);
                delete data1.password;
                delete data1.verifyToken;
                const respayload = {
                  id: data1.id,
                  firstName: data1.firstName,
                  lastName: data1.lastName,
                  email: data1.email,
                  phoneNumber: data1.phoneNumber,
                };

                res.status(200).send({
                  status: true,
                  message: 'Token sent to mail',
                  data: respayload,
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(400).send({
                  status: false,
                  message: error.message,
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            status: false,
            message: error.message,
          });
        });
      break;

      case 'patient':
      const patientData = req.body;
      // console.log(user);
      if (!req.body || !req.body.email) {
        res.status(400).send({
          status: false,
          message: 'All field required',
        });
      }
      db.users
        .findOne({
          where: {
            email: patientData.email,
          },
        })
        .then(async (data) => {
          if (data && data.isEmailVerified) {
            res.status(404).send({
              status: false,
              message: 'This Email is taken',
            });
          } else if (data && !data.isEmailVerified) {
            verifyToken = generator.generate({
              length: 5,
              numbers: true,
            });
            
            const to = [data.email.toString()];
            const subject = 'Verify your account';
            const text = `Dear user, 
                Thanks for signing up to Tell-adoc! Your verification pin is: ${verifyToken}`;
            await emailService.sendEmail(to, subject, text);
            await db.users.update({verifyToken: verifyToken}, { where: { id: data.id } });

            res.status(200).send({
              status: true,
              message: 'Token sent to mail',
              data

            
            });
          } else {
            if (patientData.password) {
              patientData.password = bcrypt.hashSync(patientData.password, 10);
            }
            //  else {
            //   user.password = bcrypt.hashSync(user.doctor, 10);
            // }


            //token verification
            patientData.userType = 'patient';
            verifyToken = generator.generate({
              length: 5,
              numbers: true,
            });
            patientData.verifyToken = verifyToken;
            db.users
              .create(patientData)
              .then(async (data1) => {
                await db.patient.create({ ...patientData, userId: data1.id, patientId: `PTC-${(randn(6))}`  });
                const to = [data1.email.toString()];
                const subject = 'Verify your account';
                const text = `Dear user,
                Thanks for signing up to Tell-adoc! Your verification pin is: ${verifyToken}`;
                await emailService.sendEmail(to, subject, text);
                delete data1.password;
                delete data1.verifyToken;
                const respayload = {
                  id: data1.id,
                  firstName: data1.firstName,
                  lastName: data1.lastName,
                  email: data1.email,
                  phoneNumber: data1.phoneNumber,
                };

                res.status(200).send({
                  status: true,
                  message: 'Token sent to mail',
                  data: respayload,
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(400).send({
                  status: false,
                  message: error.message,
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            status: false,
            message: error.message,
          });
        });
      break;
    default:
      return res.status(400).send({ message: 'No type for user', status: false });
  }
});

const login = catchAsync(async (req, res) => {
  const type = req.query.type;

  switch (type) {
    case 'doctor':
      try {
        const user = await db.users.findOne({
          where: { email: req.body.email },
          include: [{ model: db.doctor, as: 'doctor' }],
        });
        // if record doesn't exist
        if (!user) {
          return res.status(404).send({
            status: false,
            message: 'Invalid username or password',
          });
        }

        if (!user.isEmailVerified) {
          return res.status(404).send({
            status: false,
            message: 'verify account first',
          });
        }

        // compare the request password with the hashed password saved in the database
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        // // if password is not valid
        if (!passwordIsValid) {
          return res.status(404).send({
            accessToken: null,
            message: 'Invalid username or password',
            status: false,
          });
        }
        delete user.password;
        delete user.verifyToken;

        // let payload = {
        //   userId: user.id,
        //   userType: user.userType,
        // };
        const tokens = await tokenService.generateAuthTokens(user.doctor.id);
        res.status(200).send({
          status: true,
          data: { user, tokens },
          // accessToken: token,
          message: 'successfully logged in',
        });
      } catch (err) {
        res.status(400).send({
          status: false,
          message: 'Could not fetch record' + err,
        });
      }

      break;
    case 'patient':
      await db.users
        .findOne({
          where: { email: req.body.email },
          include: [{ model: db.patient, as: 'patient' }],
        })
        .then(async( patientData) => {
          // if record doesn't exist
          console.log( patientData)
          if (!patientData) {
            return res.status(404).send({
              message: 'Invalid username or password',
            });
          }
          if (!patientData.isEmailVerified) {
            return res.status(404).send({
              status: false,
              message: ' verify account first',
            });
          }
          // compare the request password with the hashed password saved in the database
          let passwordIsValid = bcrypt.compareSync(req.body.password,  patientData.password);
          console.log(passwordIsValid)
          // if password is not valid
          if (!passwordIsValid) {
            return res.status(404).send({
              accessToken: null,
              message: 'Invalid username or password',
            });
          }

          // let payload = {
          //   patientId:  patientData.id,
          //   userType:  patientData.userType,
          // };
          delete  patientData.password;
          delete  patientData.verifyToken;
          // console.log( patientData.patient.id)
          const tokens = await tokenService.generateAuthTokens( patientData.id);
          console.log(tokens)
          res.status(200).send({
            status: true,
            data:  patientData,
            accessToken: tokens,
            message: 'successfully logged in',
          });
        })
        .catch((err) => {
          res.status(400).send({
            status: false,
            message: 'Could not fetch record' + err,
          });
        });
      break;
    default:
      return res.status(400).send({ message: 'No type for user', status: false });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send('logged out successfully!');
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  // res.status(httpStatus.NO_CONTENT).send();

  const role = req.query.type || 'unknown'; // Adjust 'unknown' as needed
  console.log(role)
  res.status(httpStatus.NO_CONTENT).json({ status: 'success', role });
});

const resetPassword = catchAsync(async (req, res) => {
  const passwordReset = await authService.resetPassword(req.query.token, req.body.password);
  // res.status(httpStatus.NO_CONTENT).send();
  res.send(passwordReset)

  const role = req.query.type || 'unknown'; // Adjust 'unknown' as needed
  console.log(role)
  res.status(httpStatus.NO_CONTENT).json({ status: 'success', role });
});

const verifyEmail = catchAsync(async (req, res) => {
  const type = req.query.type;

  switch (type) {
    case 'doctor':
      try {
        // const { userId } = req.decodedData;
        const user = await db.users.findOne({
          where: {
            email: req.body.email,
            role: req.query.type,
          },
        });
        console.log(req.query.type)
        console.log(user)
        if (user.verifyToken !== req.body.verifyToken) {
          res.status(400).send({ status: false, message: 'Verify account error' });
        } else {
          const updatedUser = await db.users.update(
            { isEmailVerified: true },
            {
              where: {
                id: user.id,
              },
            }
          );
          if (!updatedUser) {
            res.status(400).send({
              status: false,
              message: 'Verify account error',
            });
          }

          res.status(200).send({
            status: true,
            message: 'Successfully verified your account',
          });
        }
      } catch (error) {
        res.status(400).send({
          status: false,
          message: error.message || 'Verify account error',
        });
      }
      break;
    case 'patient':
      try {
        // const { userId } = req.decodedData;
        const patientData = await db.users.findOne({
          where: {
            email: req.body.email,
            role: req.query.type,
          },
        });
        if ( patientData.verifyToken !== req.body.verifyToken) {
          res.status(400).send({ status: false, message: 'Verify account error' });
        } else {
          const updatedUser = await db.users.update(
            { isEmailVerified: true },
            {
              where: {
                id:  patientData.id,
              },
            }
          );
          if (!updatedUser) {
            res.status(400).send({
              status: false,
              message: 'Verify account error',
            });
          }

          res.status(200).send({
            status: true,
            message: 'Successfully verified your account',
          });
        }
      } catch (error) {
        res.status(400).send({
          status: false,
          message: error.message || 'Verify account error',
        });
      }
      break;
    default:
      return res.status(400).send({ message: 'No type for user', status: false });
  }
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
