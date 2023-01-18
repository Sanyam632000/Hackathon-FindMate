const Question = require("../Model/Question.js")
const Comment = require("../Model/Comment.js")
const router = require("express").Router();

//Post a Question

router.post("/create", async(req,res) =>{
    const newQuestion = await new Question(req.body);

    try{
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    }
    catch(err){
        res.status(404).json(err);
    }
})

//Get All Questions
router.get("/AllQuestion", async(req,res) => {
    try{
        Question.find({}, function (err, questions) {

                res.json(questions)
        });
    }
    catch(err){
        res.status(401).json(err)
    }
})


//Post Comment
router.post("/post/comment", async(req,res) =>{
    const newComment = await new Comment(req.body);

    try{
        const savedComment = await newComment.save();
            res.status(200).json(savedComment);

       /* const valid_commenting_to_id_from_question = await Question.find({_id:req.body.commenting_to_id})
        const valid_commenting_to_id_from_comment = await Comment.find({_id:req.body.commenting_to_id})
        if(valid_commenting_to_id_from_question || valid_commenting_to_id_from_comment){
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        }
        else{
            res.status(404).json(err);
        }*/

    }
    catch(err){
        res.status(404).json(err);
    }
})

//Fetch Comments of Question
router.get("/GetQuestionComment/:id", async(req,res) =>{
    try{
        const comment = await Comment.find({commenting_to_id: req.params.id})
        res.status(200).json(comment)
    }
    catch(err){
        res.status(404).json(err)
    }
})


//Get Question By Department
router.get("/GetQuestion/Department/:department", async(req,res) =>{
    try{
        if(req.params.department != "All"){
            const QuestionByDepartment = await Question.find({Department_Related_To: req.params.department})
            res.status(200).json(QuestionByDepartment)
        }
        else{
            Question.find({}, function (err, questions) {

                res.json(questions)
        });
        }

    }
    catch{
        res.status(404).json(err)
    }
})

module.exports = router
