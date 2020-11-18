const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const sendMail = (to, subject, text, html)=>{

    const msg = {
        to , 
        from: 'info@pms.lk',
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

