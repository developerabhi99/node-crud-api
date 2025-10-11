const express = require("express")
const {handleGenerateNewShorlUrl,handleUrlRedirect,handleUrlAnalytics} = require("../controller/url")

const router=express.Router();

router.post("/",handleGenerateNewShorlUrl);
router.get("/:id",handleUrlRedirect);
router.get("/analytics/:id",handleUrlAnalytics);


module.exports=router;