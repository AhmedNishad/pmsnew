// server.js
// load the things we need
var express = require('express');
const Course = require('./models/course.model')
const Reservation = require('./models/reservation.model')
const Inquiry = require('./models/inquiry.model')
const Registration = require('./models/registration.model')
var app = express();
var bodyParser = require('body-parser')

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nishad:@ristotlE456@sayat-g5aje.mongodb.net/pms?retryWrites=true&w=majority', {useNewUrlParser: true});

let courseController = require('./controllers/course.controller')
let blogController = require('./controllers/blog.controller')
let adminController = require('./controllers/admin.controller')
const sha1 = require('sha1');
var crypto = require('crypto')
//app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + '/public'))
// use res.render to load up an ejs view file

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Send notification for every course on day of course (Cron Job)


// index page 
app.get('/', function(req, res) {
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"}) // Replace with Unfound page
        
            return res.render('pages/index', {courses:courses });
    })
});

// about page 
app.get('/about', function(req, res) {
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"}) // Replace with Unfound page
        
            return res.render('pages/about', {courses:courses });
    })
});

app.get('/contact', function(req, res) {
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"}) // Replace with Unfound page
        
            return res.render('pages/contact', {courses:courses });
    })
});

app.post('/contact', (req,res)=>{
    console.log(req.body)
    let inquiry = new Inquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        query: req.body.message,
        placedOn: new Date()
    })
    inquiry.save((err)=>{
        Course.find({}, (error, courses)=>{
            if(err){
                console.log(err)
                return res.render("pages/message-page",{courses,message: "Failed to Send Message. Please try again soon or contact hotline"})
            }
            return res.render("pages/message-page",{courses,message: "Your Inquiry has been received. Our team will respond shortly"})
        })
        
    })
    
})

app.get('/register', function(req, res) {
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"}) // Replace with Unfound page
        
            return res.render('pages/register-online', {courses:courses });
    })
    
});

app.post('/register', function(req, res) {
    
    //console.log(req.body)
    //return res.json(req.body)
    let reservation = new Reservation({
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        type: req.body.type,
        date: req.body.date
    })
    reservation.save((err)=>{
        Course.find({}, (error, courses)=>{
            if(err){
                console.log(err)
                return res.render("pages/message-page",{courses,message: "Failed to Register. Please try again soon or contact hotline"})
            }
            return res.render("pages/message-page",{courses,message: "Your Reservation has been received. Our team will respond shortly"})
        }) 
    })
});

app.get('/paynow/:moniker', function(req, res) {
    let mon = req.params.moniker
    Course.findOne({moniker: mon}, (err, course)=>{
         // Replace with Unfound page
        
            Course.find({}, (error, courses)=>{
                if(err || course == null) 
                    return res.render("pages/message-page",{courses,message: "Course Not Found"})

                return res.render("pages/pay-now",{course, courses})
            })
    })
});

// Response from the gateway based on the result
app.get('/response', (req,res)=>{
   
   let pgInstanceId = "73787690";
   let merchantId = "73797374";
   let hashKey = "EB1BDE02A037BF65";

   res.set('pragma', 'no-cache');
   res.set('cache-control', 'No-cache');

   let transactionTypeCode = req.body.transaction_type_code
   let installments = req.body.installments
   let transactionId = req.body.transaction_id

   let amount = req.body.amount
   let exponent = req.body.exponent
   let currencyCode = req.body.currency_code
   let merchantReferenceNo = req.body.merchant_reference_no

   let status = req.body.status
   let eci = req.body["3ds_eci"];
   let pgErrorCode = req.body["pg_error_code"];

   // TODO Custom Error Handling
   let pgErrorDetail = req.body["pg_error_detail"];
   let pgErrorMsg = req.body["pg_error_msg"];

   let messageHash = req.body["message_hash"];

   let messageHashBuf = `${pgInstanceId}|${merchantId}|${transactionTypeCode}|${installments}|${transactionId}|${amount}|${exponent}|${currencyCode}|${merchantReferenceNo}|${status}|${eci}|${pgErrorCode}|${hashKey}|`
   //$messageHashBuf=$pgInstanceId."|".$merchantId."|".$transactionTypeCode."|".$installments."|".$transactionId."|".$amount."|".$exponent."|".$currencyCode."|".$merchantReferenceNo."|".$status."|".$eci."|".$pgErrorCode."|".$hashKey."|";

   let sha1EncryptedHash = crypto.createHash('sha1');
   sha1EncryptedHash.update(messageHashBuf);

   let bufferObj = Buffer.from(sha1EncryptedHash.digest('hash'), "utf8");
   let base64String = bufferObj.toString("base64");

   let messageHashClient = "13:" + base64String;

   let hashMatch = false;

   if (messageHash==messageHashClient){
       hashMatch = true;
   } else {
       hashMatch = false;
       // Handle bad request
       return res.send("Hash failed to match");
   }

   // Handle Card Declined Error
   if(pgErrorCode == "13004"){
    Course.find({}, (error, courses)=>{
        if(error || course == null){
            console.log(error)
            return res.render("pages/message-page",{courses,message: "Course Not Found"})
        } 

        return res.render("pages/message-page",{courses,message: "Card Issuer Declined Payment"})
    })
   }

   //Success 
   if(status == "50020")
   {
       let updateBody = {
            paymentComplete: true
       };
       let sendConfirmation = require('./mail');
       // Update Registration
       Registration.findOneAndUpdate({_id: merchantReferenceNo}, updateBody, function (err, registration) {
        Course.find({}, (error, courses)=>{
            if(err || registration == null){
                console.log(err);
                return res.render("pages/message-page",{courses,message: "Registration Not Found"});
            } 
            sendConfirmation(registration.email);
            return res.render("pages/message-page",{courses,message: "Payment Successful!"});
        });
    });
   }else{
        // Delete associated registration
        Registration.findOneAndRemove({_id: merchantReferenceNo}, function (err) {
            if (err) 
            return  res.status(500).json({error: "Error deleting Registration"})
            Course.find({}, (error, courses)=>{
                if(error || courses == null){
                    console.log(error)
                    return res.render("pages/message-page",{courses,message: "Registration Not Found"})
                } 
    
                return res.render("pages/message-page",{courses,message: "Could not process payment"})
            })
        })
   }
})

app.post('/paynow/:moniker', function(req, res) {
    Course.findOne({ moniker: req.params.moniker}, (err, course)=>{
        if(err || course == null){
            return res.render("pages/message-page",{courses,message: "Coure Not Found"})
        }
        let registration = new Registration({
            name: req.body.name,
            email: req.body.email,
            courseName: course.title,
            address: req.body.address,
            mobile: req.body.mobile,
            fee: course.price,
            placedOn: new Date(),
            paymentComplete: false
        })

        registration.save((errr, reg)=>{
            if(errr)
                console.log(errr);
                let pgdomain="www.paystage.com";
                let pgInstanceId="73787690";
                let merchantId="73797374";
                let hashKey="EB1BDE02A037BF65";
             
                res.set('pragma', 'no-cache');
                res.set('cache-control', 'No-cache');
             
                let perform='initiatePaymentCapture#sale';
                let currencyCode='144';
                let amount= course.price * 100;
                let merchantReferenceNo = reg._id; // Needs to be the created registrations mongoId
                let orderDesc = 'PMS Online Payment';
             
                let messageHash = `${pgInstanceId}|${merchantId}|${perform}|${currencyCode}|${amount}|${merchantReferenceNo}|${hashKey}|` 
                let sha1EncryptedHash = crypto.createHash('sha1')
                sha1EncryptedHash.update(messageHash)
                
                let bufferObj = Buffer.from(sha1EncryptedHash.digest('hash'), "utf8");
                 let base64String = bufferObj.toString("base64");
                 let message_hash = `CURRENCY:7:${base64String}`;
                let header = `<html>
                 <head><title>Processing..</title>
                    <script language='javascript'>
                    function onLoadSubmit() {
                        document.merchantForm.submit();
                    }
                    </script>
                </head>`;

                let body = `<body onload="onLoadSubmit();">
                <br />&nbsp;<br />
                <center><font size="5" color="#3b4455">Transaction is being processed,<br/>Please wait ...</font></center>
                <form name="merchantForm" method="post" action="https://${pgdomain}/AccosaPG/verify.jsp">
            
                <input type="hidden" name="pg_instance_id" value="${pgInstanceId}" />
                <input type="hidden" name="merchant_id" value="${merchantId}" />
                
                <input type="hidden" name="perform" value="${perform}" />
                <input type="hidden" name="currency_code" value="${currencyCode}" />
                <input type="hidden" name="amount" value="${amount}" />
                <input type="hidden" name="merchant_reference_no" value="${merchantReferenceNo}" />
                <input type="hidden" name="order_desc" value="${orderDesc}" />
            
                <input type="hidden" name="message_hash" value="${message_hash}" />
            
                <noscript>
                    <br />&nbsp;<br />
                    <center>
                    <font size="3" color="#3b4455">
                    JavaScript is currently disabled or is not supported by your browser.<br />
                    Please click Submit to continue the processing of your transaction.<br />&nbsp;<br />
                    <input type="submit" />
                    </font>
                    </center>
                </noscript>
                </form>
            </body>
            </html>`;

            let html = header + body;
            return res.send(html); 
        })
    })
});

app.use('/courses', courseController)
app.use('/blog', blogController)
app.use('/admin/a6', adminController)

app.get('/createCourse', (req,res)=>{
    res.render('pages/createCourse')
})

// To Do Replace with Delete
app.get('/reservations/:id/delete', (req,res)=>{
    Reservation.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) 
            return  res.status(500).json({error: "Error deleting reservation"})

        return res.redirect("/admin/a6/reservations")
    })
})

app.get('/inquiry/:id/delete', (req,res)=>{
    Inquiry.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) 
            return  res.status(500).json({error: "Error deleting inquiry"})

        return res.redirect("/admin/a6/inquiries")
    })
})

app.get('/registration/:id/handle', (req,res)=>{
    console.log(req.params.id)
    Registration.findByIdAndUpdate({_id: req.params.id}, {handled: true}, function (err) {
        if (err) 
            return  res.status(500).json({error: "Error handling registration"})

        return res.redirect("/admin/a6/registrations")
    })
})

app.listen(process.env.PORT || 8080);
console.log('8080 is the magic port');