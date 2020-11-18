var nodemailer = require('nodemailer');

module.exports = async (toAddress) => {
    let testAccount = await nodemailer.createTestAccount();
    
    /* var transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
       secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    }); */

    var transporter = nodemailer.createTransport({
      host: 'mail.pms.lk',
      port: 587,
      secure: false,
      auth: {
        user: 'info@pms.lk',
        pass: 'pmsinfo@13245'
      }
    });
    
    let text = `Your payment was successfully recieved`;
    var mailOptions = {
        from: 'info@pms.lk',
        to: toAddress,
        subject: 'Payment Successful | PMS',
        text
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
      
}