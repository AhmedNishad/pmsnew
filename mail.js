var nodemailer = require('nodemailer');

module.exports = async (toAddress) => {
    let testAccount = await nodemailer.createTestAccount()
    console.log(testAccount)
    
    var transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
       secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    let text = `Your payment was successfully recieved`;
    var mailOptions = {
        from: 'ahmednishad3@gmail.com',
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