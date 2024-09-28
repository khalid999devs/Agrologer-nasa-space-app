const nodemailer = require('nodemailer');
const { writeFileSync } = require('fs');
const { htmlCreator } = require('./htmlTemplates');
const { EmailCover, EmailTextCover } = require('./TemplateCover');

let transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

const mailer = async (data, mode) => {
  const { subject, body, text } = htmlCreator(mode, data);

  let mailContent = {
    from: `GOLDEN DOT PROPERTIES LTD. <${process.env.SERVER_EMAIL}>`,
    to: `${data.client.email}`,
    subject: subject,
    html: body ? EmailCover(body) : null,
    text: text ? EmailTextCover(text) : null,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailContent, function (error, mailData) {
      const date = new Date();
      const fullTime = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} ,time-${date.getHours()}:${date.getMinutes()}`;

      if (error) {
        writeFileSync(
          './logs/failed/sentEmails.txt',
          `{succeed:false,fullTime:"${fullTime}",mode:"${mode}",email:"${data.client.email}"},\n`,
          {
            encoding: 'utf8',
            flag: 'a+',
            mode: 0o666,
          }
        );
        console.log(error);

        reject('email sending failed. something went wrong');
      } else {
        writeFileSync(
          './logs/succeed/sentEmails.txt',
          `{succeed:true,fullTime:"${fullTime}",mode:"${mode}",email:"${data.client.email}"},\n`,
          {
            encoding: 'utf8',
            flag: 'a+',
            mode: 0o666,
          }
        );
        resolve('success');
      }
    });
  });
};

module.exports = mailer;
