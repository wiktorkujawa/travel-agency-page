const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
const { transporter, getPasswordResetURL, resetPasswordTemplate } = require('../../modules/mailModule');
// Item Model
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          )
        })
    })
});


router.post('/user/reset_password', (req, res) => {
  const { email } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });

          const url = getPasswordResetURL(user, token);
          const emailTemplate = resetPasswordTemplate(user, url)
          console.log(url);
          const sendEmail = () => {
            transporter.sendMail(emailTemplate, (err, info) => {
              if (err) {
                console.log(err);
              }
              // console.log(`** Email sent **`, info.res)
            })
          }
          sendEmail();
        }
      )
    })
});

router.post('/receive_new_password/:userId/:token', (req, res) => {
  const { userId, token } = req.params
  const { newPassword, confirmNewPassword } = req.body
  // Simple validation
  if (!newPassword) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  else if (newPassword != confirmNewPassword) {
    return res.status(400).json({ msg: 'Passwords must be matched' });
  }

  User.findOne({ _id: userId })

    .then(user => {

      const secret = user.password
      const payload = jwt.decode(token, secret)

      if (payload.id === user.id) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newPassword, salt, (err, hash) => {
            // if (err) throw err;
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json("Password changed accepted"))
              .catch(err => res.status(500).json(err))
          })
        })
      }
    })
    .catch(() => {
      res.status(404).json("Invalid user")
    })
})


router.post('/user/changePassword/', (req, res) => {
  const { email, oldPassword, newPassword } = req.body
  // find if old password is valid
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  User.findOne({ email })
    .then(user => {
      bcrypt.compare(oldPassword, user.password)
        .then(isMatch => {
          if (isMatch) {
            // const secret = user.password
            // const payload = jwt.decode(token, secret)
            bcrypt.genSalt(10, (err, salt) => {
              // Call error-handling middleware:
              if (err) throw err;
              bcrypt.hash(newPassword, salt, (err, hash) => {
                // Call error-handling middleware:
                if (err) throw err;
                // change to new password
                User.findOneAndUpdate({ email }, { password: hash })
                  .then(() => res.status(202).json("Password changed accepted"))
                  .catch(err => res.status(500).json(err))
              })
            })
          }
          else return res.status(400).json({ msg: 'Invalid credentials' });
        })
        .catch(() => {
          res.status(404).json("Invalid user")
        })
    })
});



// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;