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


module.exports = router