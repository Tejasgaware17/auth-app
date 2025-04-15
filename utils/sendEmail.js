const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // Setting up the  transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Options
  const mailOptions = {
    from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  // Sending the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
