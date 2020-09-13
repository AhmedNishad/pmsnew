var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  title:  String, // Title at top of 
  type: String, // Agile, project management etc
  introduction: {body: String, highlights: []}, 
  duration:   String, // Hours, days
  courseFee:   String, // USD
  courseNumber: String, 
  moniker: String, // SEO Friendly URL for the course
  objectives: [{ text: String }], 
  FAQs: [{ question: String, answer: String }], 
  testimonials: [{ body: String, author: String }],
  courseContent: [{ body: String }],
  targetAudience: [{ body: String }],
  learningMethodology: [{text: String}],
  otherDetails: [{text: String}], // Miscellaneous details like course links
  externalLinks: [{link: String, address: String}],
  PDUS: [{pdus: String, technical: String, leadership: String, strategy: String}],  // For the tables
  PDUTable: String,
  keyTakeaway: String,
  certificateUrl: String,
  courseImage: String,
  seoKeywords: String,
  seoDescription: String,
  price: { type: Number, default: 0 },
  nextSession: { type: Date, default: Date.now }, // 
  courseDates: [{date: Date, timeFrom: String, timeTo: String, times: String}]
});

module.exports = mongoose.model('Course', courseSchema)