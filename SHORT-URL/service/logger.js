const fs = require("fs");

const logger=(filename,type)=>{
    
    if(type == "success"){
      fs.appendFile(filename,``,(err,data)=>{

      })
    }else if(type == "error"){
      fs.appendFile(filename,``,(err,data)=>{
        
      })
    }else{
        fs.appendFile(filename,``,(err,data)=>{
        
        })
    }

}

module.exports=logger