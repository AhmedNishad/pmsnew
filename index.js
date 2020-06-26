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

//app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + '/public'))
// use res.render to load up an ejs view file

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/paynow/:moniker', function(req, res) {
    //console.log(req.body)
    //return res.json(req.body)

    // ----------------- Payment gateway redirect ------------------
    
    // Once action is complete... then create and store registration
    Course.findOne({ moniker: req.params.moniker}, (err, course)=>{
        if(err || course == null){
            return res.render("pages/message-page",{courses,message: "Coure Not Found"})
        }
        console.log(course)
        let registration = new Registration({
            name: req.body.name,
            email: req.body.email,
            courseName: course.title,
            address: req.body.address,
            mobile: req.body.mobile,
            fee: course.price
        })

        registration.save((err)=>{
            Course.find({}, (error, courses)=>{
                if(error){
                    console.log(error)
                    return res.render("pages/message-page",{courses,message: "Failed to Register. Please try again soon or contact hotline"})
                }

                return res.render("pages/message-page",{courses,message: "Your Registration has been received. Our team will respond shortly"})
            }) 
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

app.listen(8080);
console.log('8080 is the magic port');