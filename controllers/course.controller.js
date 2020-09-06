const Course = require('../models/course.model')

let express = require('express')
let router = express.Router()

router.get('/:moniker', (req,res) => {
    let mon = req.params.moniker;
    let enrollNow = req.query.enrollNow;
    let enrollNowDate = req.query.enrollNowDate;
    console.log(enrollNow)
    Course.findOne({moniker: mon}, (err, course)=>{
            Course.find({}, (error, courses)=>{
                
                if(err || course == null) 
                    return res.render("pages/message-page",
                    {courses,message: "Course Not Found"})

                    if(enrollNow == "true"){
                        return res.render("pages/course-detailsv2",{course, courses, enrollNow})
                    }

                return res.render("pages/course-detailsv2",{course, courses, enrollNow:""})
            })
    })
})

router.get('', (req,res) => {
    console.log("Loading all courses")
    Course.find({}, (error, courses)=>{
        if(error || courses == null) 
            return res.render("pages/message-page",{courses,message: "Course Not Found"})

        return res.render("pages/all-courses",{ courses})
    })
})

router.get('/display/schedule', (req,res) => {
    console.log("Loading Schedule")
    Course.find({}, (error, courses)=>{
        if(error || courses == null) 
            return res.render("pages/message-page",{courses,message: "Course Not Found"})

        return res.render("pages/course-schedule",{ courses})
    })
})

router.post("", (req,res) => {
    let course = new Course({
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
        courseDates: [{date: new Date(), timeFrom: "", timeTo: "", times: ""}],
        price: req.body.price
    })
    course.save((err)=>{
        if(err){
            console.log(err)
            return res.status(500).json({error: "Error creating course", posted: req.body})
        }
        return res.redirect("/courses/"+ req.body.moniker)
        res.send("Course Created Successfully") 
    })
})

router.post("/:moniker/update", (req, res) => {
    console.log("Updating course")
    console.log(req.body.course)
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
    Course.findOneAndUpdate({moniker: req.params.moniker}, updateBody, function (err, course) {
        Course.find({}, (error, courses)=>{
            if(err || course == null){
                console.log(err)
                return res.render("pages/message-page",{courses,message: "Course Not Found"})
            } 

            return res.render("pages/course-detailsv2",{course, courses})
        })
    });
})

router.post("/:moniker/delete", (req, res)=>{
        Course.findOneAndRemove({moniker: req.params.moniker}, function (err) {
            if (err) 
            return  res.status(500).json({error: "Error deleting course"})
            res.send('Deleted successfully!');
        })
})

module.exports = router