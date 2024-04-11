const nodemailer = require("nodemailer");
const htmlContentOtp = require("./htmlContentOtp");

async function sendMail({ email, subject, title, text, verificationLink }) {
  const HOST = process.env.EMAIL_HOST || "";
  const NO_REPLY_EMAIL = process.env.NO_REPLY_EMAIL || "";
  const USER = process.env.ADMIN_EMAIL || "";
  const PASSWORD = process.env.EMAIL_PASSWORD || "";
  const PORT = Number(process.env.EMAIL_PORT) || 465;

  const HTML_CONTENT = htmlContentOtp(title, text, verificationLink);

  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      service: "gmail",
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: NO_REPLY_EMAIL,
      to: email,
      subject: subject,
      html: HTML_CONTENT,
      attachments: [
        {
          filename: "logo.png",
          path: process.cwd() + "/public/images/logo.jpeg",
          cid: "Logo",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = sendMail;
