const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = (to, subject, text, html)=>{

    const msg = {
        to ,
        from: {
          email: 'info@pms.lk',
          name: 'Project Management Solutions'
      },
        subject,
        text,
        html,
      }
      
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}


module.exports = sendMail

