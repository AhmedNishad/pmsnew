let express = require('express')
let router = express.Router()

const Course = require('../models/course.model')
const Reservation = require('../models/reservation.model')
const Inquiry = require('../models/inquiry.model')
const Registration = require('../models/registration.model')

router.get('/courses', (req,res)=>{
    console.log("Admin all courses")
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"}) // Replace with Unfound page
        
            return res.render('pages/admin-course-list', {courses:courses });
    })
})

router.get("/courses/:moniker/update", (req, res)=>{
    console.log("admin course ")
    let mon = req.params.moniker
    Course.findOne({moniker: mon}, (err, course)=>{
        if(err || course == null) 
            return res.status(404).json({error: "Course Not Found"}) // Replace with Unfound page
        
            
            return res.render("pages/updateCourse", {course})
    })
})

router.get('/courses/create/new', (req,res)=>{
    res.render('pages/createCourse')
})


router.post("/courses/:moniker/update", (req, res) => {
    console.log("Updating course")
    console.log(req.body)
    let updateBody = {
        title:  req.body.title, // Title at top of 
        type: req.body.type, // Agile, project management etc
        introduction: req.body.introduction, 
        duration:   req.body.duration, // Hours, days
        courseFee:   req.body.courseFee, // USD
        courseNumber: req.body.courseNumber, 
        moniker: req.body.moniker, // SEO Friendly URL for the course
        objectives: req.body.objectives, 
        testimonials: req.body.testimonials,
        courseContent: req.body.courseContent,
        targetAudience: req.body.targetAudience,
        learningMethodology: req.body.learningMethodology,
        otherDetails: req.body.otherDetails, // Miscellaneous details like course links
        externalLinks: req.body.externalLinks,
        PDUTable: req.body.PDUTable,  // For the tables
        keyTakeaway: req.body.keyTakeaway,
        courseImage: req.body.courseImage,
        courseDates: req.body.courseDates,
        FAQs: req.body.FAQs,
        price: req.body.price
    }
    //return res.json(updateBody)
    //return res.json(req.body)
    Course.findOneAndUpdate({moniker: req.params.moniker}, updateBody, function (err, course) {
        Course.find({}, (error, courses)=>{
            if(err || course == null){
                console.log(err)
                return res.render("pages/message-page",{courses,message: "Course Not Found"})
            } 

            return res.redirect("/courses/"+ req.params.moniker)
            return res.render("pages/course-detailsv2",{course, courses})
        })
    });
})

router.post("/courses/:moniker/delete", (req, res)=>{
        Course.findOneAndRemove({moniker: req.params.moniker}, function (err) {
            if (err) 
            return  res.status(500).json({error: "Error deleting course"})
            res.send('Deleted successfully!');
        })
})

router.get('/reservations', (req,res)=>{
    Reservation.find({}, (err, reservations)=>{
        if(err) 
            return res.status(404).json({error: "Error"}) // Replace with Unfound page
        
            return res.render('pages/admin-reservations', {reservations:reservations });
    })
})

router.get('/inquiries', (req,res)=>{
    Inquiry.find({}, (err, inquiries)=>{
        if(err) 
            return res.status(404).json({error: "Error!"}) // Replace with Unfound page
        
            return res.render('pages/admin-inquiries', {inquiries });
    })
})

router.get('/registrations', (req,res)=>{
    Registration.find({}, (err, registrations)=>{
        if(err) 
            return res.status(404).json({error: "Error!"}) // Replace with Unfound page
        
            return res.render('pages/admin-registrations', {registrations });
    })
})

module.exports = router