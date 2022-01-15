// 1. Import library - npm install nodemailer nodemailer-sendgrid
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');

const config = require('../config');
const { htmlTemplate, textTemplate } = require('./email-template');

exports.emailConfirmation = async (firstName, email) => {
  const options = {
    apiKey: config.email.sendgridApiKey,
  };

  // 2. Create the transport (e.g. Fake/Ethereal, Gmail, Sendgrid, MailGun, Postmark, etc.)
  let transporter = nodemailer.createTransport(sgTransport(options));

  // 3. Send Email
  await transporter.sendMail({
    from: `"${config.email.senderUsername}" <${config.email.senderEmail}>`, // sender address
    to: `${email}`, // list of receivers
    subject: 'LATCOM - Successful Register', // subject line
    text: textTemplate(firstName), // plain text body
    html: htmlTemplate(firstName), // html body
  });
};
