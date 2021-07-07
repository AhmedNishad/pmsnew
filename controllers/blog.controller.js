let express = require('express')
let router = express.Router()

const Course = require('../models/course.model')

router.get('/', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/main', {courses:courses });
    })
})

router.get('/sigiriya', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/sigiriya', {courses:courses });
    })
})

router.get('/essential-tool', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/tool', {courses:courses });
    })
})
router.get('/what-is-agile', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/what-is-agile', {courses:courses });
    })
})
router.get('/benifits-agile', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/benifits-agile', {courses:courses });
    })
})

router.get('/pmp-exam-changes-2021', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/pmp-exam-changes-2021', {courses:courses });
    })
})

router.get('/pmbok-guide-7th-edition', (req,res)=>{
    Course.find({}, (err, courses)=>{
        if(err || courses == null) 
            return res.status(404).json({error: "No Courses Found"})
        
            return res.render('blog/pmbok-guide-7th-edition', {courses:courses });
    })
})

module.exports = router