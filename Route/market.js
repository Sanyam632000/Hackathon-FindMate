const Market = require("../Model/Market.js")
const router = require("express").Router();

//Create Post
router.post("/marketPost", async(req,res) =>{
    const newMarketPost = await new Market(req.body)
    try{
        const savedMarketPost = await newMarketPost.save()
        res.status(200).json(savedMarketPost)
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Get All Market Post
router.get("/getAllMarketPost", async(req,res) =>{
    try{
        Market.find({}, function (err, marketPosts) {

            res.json(marketPosts)
        })
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Find Post By subject or department
router.get("/getPostByDepartment/:department", async(req,res) =>{
    try{
        const postBYDepartment = await Market.find({Department:req.params.department})
        res.status(200).json(postBYDepartment)
    }
    catch(err){
        res.status(404).json(err)
    }
})

module.exports = router