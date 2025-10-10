
const URL = require("../model/url") ;
const shortid = require('shortid');
 
 const handleGenerateNewShorlUrl=async (req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({"error":"Url is required"});
    
    const shortId=shortid.generate()
       await URL.create({
            shortId: shortId,
            redirectUrl:body.url,
            visitHistory:[]
        });

    //  return res.json({
    //     msg:"success",
    //     id:shortId
    //  })    
    const allUser = await URL.find({});
        return res.render("home",{
            id:shortId,
            urls:allUser
        })

 }

 const handleUrlRedirect = async (req, res) => {
    try {
      const id = req.params.id;
  
      const entry = await URL.findOneAndUpdate(
        { shortId: id },
        {
          $push: {
            visitHistory: {
              ip_address: req.ip,
              timestamp: new Date(), 
            },
          },
        },
        { new: true }
      );
  
      if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
      }
  
      if (!entry.redirectUrl) {
        return res.status(500).json({ error: "Redirect URL missing in database" });
      }
  
      let redirectUrl = entry.redirectUrl;
     
      if (!/^https?:\/\//i.test(redirectUrl)) {
        redirectUrl = "https://" + redirectUrl;
      }
    
      console.log(`Redirecting ${req.ip} -> ${redirectUrl}`);
      return res.redirect(redirectUrl);
     
    } catch (error) {
      console.error("Error in redirect:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 const handleUrlAnalytics= async (req,res)=>{
    const id=req.params.id;
    const result= await URL.findOne({
        shortId:id
    });

    res.json({"No of clicks ": result.visitHistory.length ,"analytics":result});

 } ;
  

 module.exports={
    handleGenerateNewShorlUrl,
    handleUrlRedirect,
    handleUrlAnalytics
 }