const express = require('express')
const {route } = require('express/lib/application')

const routes = express.Router()
const Detail = require("../models/detail")
const Slider = require("../models/slider")
const Service = require("../models/service")   
const Contact = require('../models/contact')

//Making the end points/ routes 

routes.get("/"  , async (request , response ) => {
   
  //Fetching the data using Detail Model from the database to show it dynamically on database
   const details = await Detail.findOne({"_id":"642a6c28535475d3e71955db"}) 
   //console.log(details)   //The await ensure to stop flow till result is retured from function. Basically it make it of Synchrounou nature , to supress JS asynchrounous nature (contine things in background and process with next line of codes)
   const slides = await Slider.find()
   //console.log(slides)
   const services = await Service.find()
   //console.log(services)    //Just refresh browser to see changes



  response.render("index" ,{
    details:details ,
     slides:slides ,
     services:services

    }) ;  //sending the object in  hbs file to show to user things dynamically .

});

// End point for handling the Form Submission of Contact Form
routes.post("/process-contact-form", async (request,response)=>{

 // console.log("Form is submitted , Now use body parser to save its json foramt in database")
 // console.log(request.body)

 //Use try catch : using async await , synchrounous to handle data once its fetched

 try {
  const data = await Contact.create(request.body)   //save to database
  console.log(data)
  response.redirect("/")

 } catch (error) {
  console.log(error)
  response.redirect("/")

}

})




routes.get("/gallery" ,async (request,response)=>{
  
  const details = await Detail.findOne({"_id":"642a6c28535475d3e71955db"}) 
  response.render("gallery",{details:details})
  

})
routes.get("/about" ,async (request,response)=>{
  
  const details = await Detail.findOne({"_id":"642a6c28535475d3e71955db"}) 
  response.render("about",{details:details})
  

})
routes.get("/services" ,async (request,response)=>{
  
  const details = await Detail.findOne({"_id":"642a6c28535475d3e71955db"}) 
  response.render("services",{details:details})
  

})
routes.get("/contactUs" ,async (request,response)=>{
  
  const details = await Detail.findOne({"_id":"642a6c28535475d3e71955db"}) 
  response.render("contactUs",{details:details})
  
//    response.send("This is Response from Routes file .")
})



module.exports=routes
