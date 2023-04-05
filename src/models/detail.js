const mongoose=require("mongoose");
const Detail = mongoose.Schema(
  {
     brandName  : String ,
     brandIconUrl:String , 
     links: [
        {
            label:String,
            url:String,
         },
     ]
  }
);

module.exports=mongoose.model("detail",Detail);        //detail-Collection in MongoDB , Detail name of the Schema made to be used in other files
