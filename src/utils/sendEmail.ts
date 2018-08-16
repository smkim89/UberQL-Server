import Mailgun from "mailgun-js";
 const mailGunClient = new Mailgun({
  apiKey: process.env.MAIL_GUN_API_KEY || "",
  domain: process.env.MAIL_GUN_DOMAIN || ""
});

const sendEmail = (to: string, subject: string, html: string) => {
    const emailData = {
      from: "postmaster@swago.co.kr",
      to,
      subject,
      html
    };
    return mailGunClient.messages().send(emailData);
  };
   export const sendVerificationEmail = (to : string, fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
    return sendEmail(to, emailSubject, emailBody);
  };