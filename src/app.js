const express = require("express")
const hbs = require("hbs")
const mongoose =require("mongoose")

//require("dotenv").config();

//making the app
const app = express()
const routes = require('./routes/main')     //using routes from mail file
//importing the module Detail - Schema for Dynamic links etc
const Detail = require('./models/detail')
const Slider = require('./models/slider')
const Service=require('./models/service')
//Using it as middleware to convert form data to json and save  it to database
const bodyParser= require('body-parser')  

//To be used in form submission : Make sure parse is use befor the routes.
app.use(bodyParser.urlencoded({extended:true}));

//serving the static file using this path , like images,css
app.use("/static" , express.static("public") )     //Open in browser  localhost:5556/static/images/apple.jpg
//serving the end points made in routes folderr
app.use('',routes);


// srb - template engine  configuration : 
app.set('view engine','hbs')
app.set("views","views")      // 2 is the path of views folder here
hbs.registerPartials("views/partials")    //To make partial work

//db connection MongoDB : This not worked for me in Version 6 of MongoDB So use below method
// mongoose.connect("mongodb://localhost/website_tut" , () => {
//     console.log("Database Connected ")
// })

//Updated Database connectivity
const url = 'mongodb://127.0.0.1:27017/website_tut'
mongoose.connect(url ,  {useNewUrlParser: true})
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)

// Saving the details of Dynamic links in the database.
//We are commenting out this method , so that same data is not saved again and again

// Detail.create({
//   brandName:"Ma Sharda Traders",
//   brandIconUrl:"/static/images/MST.png",
//   links:[
//     {
//        label:"Home",
//        url:"/",
//     },
//     {
//       label:"Services",
//       url:"/services",
//    },
//     {
//       label:"Gallery",
//       url:"/gallery",
//    },
//     {
//       label:"About",
//       url:"/about",
//    },

//   ]
// });
//  Method to 1 time generate the Slider details in Database.
// Slider.create(
//   [
//     {
//       title:'Learn Java ',
//       subTitle:'Its is the most popular language.',
//       imageUrl:'/static/images/s1.png'
//     },
//     {
//       title:'Python Django ',
//       subTitle:'Popular Framword ',
//       imageUrl:'/static/images/s2.png'
//     },
//     {
//       title:' What about Node js  ',
//       subTitle:'Node is the environment to execute JS outside browser ',
//       imageUrl:'/static/images/s3.png'
//     },
//   ]
// );

// Make  sure to stop program then Saving the dettails of courses one time to the database. And then commenting out the code.

// Service.create([

// {
//   icon:'fab fa-accusoft',
//   title:'Contact For Delivery',
//   description:'We provide the fast accurate and time bound delivery ',
//   linkText:'Contact',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },
// {
//   icon:'fas fa-webcam',
//   title:'CCTV Survilence',
//   description:' ALl are monitored under high resolution cctvs',
//   linkText:'Check',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },
// {
//   icon:'fas fa-warehouse-alt',  
//   title:' Warehousing ',
//   description:'Provide attracting discount on selected purchase to be store in Warehouses',
//   linkText:'Check Rates',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },
// {
//   icon:'fas fa-wheelchair',
//   title:'Sitting Arrangement',
//   description:' Service for time bound agreement with sitting and guidance ',
//   linkText:'Click Here',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },
// {
//   icon:'fas fa-wifi',
//   title:'Free Wifi Availabe ',
//   description:'Access to Wifi / Internet to all the incoming customers ',
//   linkText:'Connect',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },
// {
//   icon:'fas fa-percent',
//   title:'Discount',
//   description:'Provide Effective discount on bulk purchases with home Delivery',
//   linkText:'Order Now',
//   link:'https://www.facebook.com/profile.php?id=100009510345970'

// },




// ])






// ///---------------------------------------------------------



})

db.on('error', err => {
  console.error('connection error:', err)
});






//listening  the port
app.listen( process.env.PORT | 5556 ,   ()=>{
    console.log("Server started at port ")
    console.log(process.env.PORT)
} );














//Version 5 way of connecting the database
// mongoose.connect(url , () =>{
//      console.log("DB connected ")
//  })
//  const db = mongoose.connection


