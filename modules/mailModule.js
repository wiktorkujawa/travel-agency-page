const nodemailer = require('nodemailer');
const config = require('config');


const transporter = nodemailer.createTransport({
  host: "smtp.eu.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: config.get('email'),
    pass: config.get('password')
  }
});

const getPasswordResetURL = (user, token) =>
  `https://travel-testing.com/password/reset/${user._id}/${token}`

const resetPasswordTemplate = (user, url) => {
  const from = config.get('email')
  const to = user.email
  const subject = "Reset hasła travel-testing.com"
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `

  return { from, to, subject, html }
}

module.exports = { transporter, getPasswordResetURL, resetPasswordTemplate }