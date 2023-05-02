const nodemailer = require("nodemailer");

const name = "ramesh";
const email = "ramesh123@gmail.com";

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "83596f3c9e3dc1",
      pass: "a7147c6aa95fe1",
    },
  });

  // send mail with defined transport object
  const message = {
    from: `<${email}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
