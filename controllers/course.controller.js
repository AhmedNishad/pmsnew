const Course = require('../models/course.model')

let express = require('express')
let router = express.Router()

router.get('/:moniker', (req,res) => {
    let mon = req.params.moniker
    Course.findOne({moniker: mon}, (err, course)=>{
         // Replace with Unfound page
        
            Course.find({}, (error, courses)=>{
                if(err || course == null) 
                    return res.render("pages/message-page",{courses,message: "Course Not Found"})

                return res.render("pages/course-detailsv2",{course, courses})
            })
    })
})

router.get('/display/all', (req,res) => {
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
    console.log(req.body)
    //return res.send("Posted")
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
        courseDates: [{date: new Date().addDays(10), timeFrom: "", timeTo: ""}],
        price: req.body.price
    })
    course.save((err)=>{
        if(err){
            console.log(err)
            return res.status(500).json({error: "Error creating course", posted: req.body})
        }
        return res.redirect("/courses/"+ req.body.moniker)
        //return res.render("pages/course-details",{course})  
        res.send("Course Created Successfully") // Redirect to newly created course page
    })
})

router.get("/:moniker/update", (req, res)=>{
    let mon = req.params.moniker
    Course.findOne({moniker: mon}, (err, course)=>{
        if(err || course == null) 
            return res.status(404).json({error: "Course Not Found"}) // Replace with Unfound page
        
            
            return res.render("pages/updateCourse", {course})
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
    //return res.json(updateBody)
    //return res.json(req.body)
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