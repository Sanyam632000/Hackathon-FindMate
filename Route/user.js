const User = require("../Model/User.js")
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Gete User By Id
router.get('/:id', async(req,res) =>{
    try{
        const user = await User.find({_id:req.params.id});
        if(user){
            res.json(user)
        }
        else{
            res.status(300).json("NO user with this id found..")
        }

    }
    catch(err){
        res.status(400).json(err)
    }

})

//Get All User
router.get('/get/all_users', async(req,res) =>{
    try{
        User.find({}, function (err, users) {

                res.json(users)
        });
    }
    catch(err){
        res.status(401).json(err)
    }
})

//Find student by course
router.get('/get/user/:department', async(req,res) =>{
    try{
      const user = await User.find({Course_Taken_This_Semester:req.params.department})
      res.status(200).json(user)
    }
    catch(err){
        res.status(401).json(err)
    }
})

//Add Course
router.put('/addCourse/:id/:course', async(req,res) => {
    try{
        res.json('hell')
        const user = await User.findById(req.params.id)
        await user.updateOne({$push:{Course_Taken_This_Semester : req.params.course}})
        res.status(200).json('Course has been successfully added')
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Remove Course
router.put('/removeCourse/:id/:course', async(req,res) => {
    try{
        
        const user = await User.findById(req.params.id)
        await user.updateOne({$pull: {Course_Taken_This_Semester : req.params.course}})
        res.status(200).json('Course has been successfully added')
      
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Find user by department
router.get("/GetUser/Department/:subject", async(req,res) =>{
    try{
        if(req.params.subject != "All"){
            const UserByDepartment = await User.find({Course_Taken_This_Semester: req.params.subject})
            res.status(200).json(UserByDepartment)
        }
        else{
            User.find({}, function (err, user) {

                res.json(user)
        });
        }

    }
    catch{
        res.status(404).json(err)
    }
})

module.exports = router