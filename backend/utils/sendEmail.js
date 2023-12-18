const nodemailer = require('nodemailer')

const sendEmail = async (email, url) => {
  try {
    const transporter =  nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: 'Account Verification',
      text: 'Welcome to DeliFooD',
      html: `
        <div>
        <a href=${url}>Click here to acitvate your account</a>
        </div>`,
    })
    console.log('email sent successfully!!!')
  } catch (error) {
    console.log('Email verfied not done')
    console.log(error)
  }
}

module.exports =  sendEmail
