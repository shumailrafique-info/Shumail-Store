const nodemailer = require("nodemailer");

const SendEmail = async (options) => {
  console.log("working");
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  console.log("working");

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("working");

  await transporter.sendMail(mailOptions);
  console.log("working");
};

module.exports = SendEmail;
