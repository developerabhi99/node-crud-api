const fs=require('fs')

//creating file

//fs.writeFileSync('./test.txt',"Hello writing using fs file sync")

//creteing fie using Async need to invoke callback to handle error

// fs.writeFile('./test.txt',"Hello writing using fs file async",(err)=> {
//     if(err) console.log("Got error ",err);
//     })

//reading using fs file sync these return data directly

// const data=fs.readFileSync('./test.txt','utf-8')
// console.log("Data ",data)

//reading using fs readFile async

// fs.readFile('./test.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log("Getting error ",err)
//         return
//     }
//     console.log(data)
// })

//updating file using fs.appendFileSync

// fs.appendFileSync('./test.txt',"\n these is new line")

// fs.appendFile('./test.txt', '\n new line using async',(err)=>{
//     if(err){
//         console.log("Encountered error ",err);
//     }
    
// })

// fs.unlinkSync('.test.txt')

// fs.copyFileSync('./test.txt','./newFile.txt')