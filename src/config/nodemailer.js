import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "santiarteche7@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
    authMethod: "LOGIN",
  },
});

export const sendRecoveryMail = (email, recoveryLink) => {
  const mailOptions = {
    from: "santiarteche7@gmail.com",
    to: email,
    subject: "Link para restablecer su contraseña",
    text: `Haca click en el siguiente enlace para reestablecer su contraseña ${recoveryLink}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado correctamente");
    }
  });
};
