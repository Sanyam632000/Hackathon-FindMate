import './App.css';
import { BrowserRouter as Router,Link,Routes,Route, useNavigate,Navigate } from "react-router-dom"
import {MdAccessTime,MdComment,MdPhotoSizeSelectActual} from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import {AuthContext} from './AuthContext.js'
import {loginCall} from './apiCall.js'
import axios from 'axios';



//import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const {user_detail} = useContext(AuthContext);
  return <>
          <Router>       

            <Routes>
                <Route exact path='/' element={<Home/> }>  </Route>
                <Route exact path='/student' element={<Student/> }>  </Route>
                <Route exact path='/addCourse' element={<AddCourse/> }>  </Route>
                <Route exact path='/market' element={<Market/> }>  </Route>
                <Route exact path='/mychat' element={<MyChat/> }>  </Route>
                <Route exact path='/login' element={user_detail ? <Navigate to='/' />: <Login/>}>  </Route>
                <Route exact path='/registers' element={<Singup/> }>  </Route>
                <Route exact path='/chat' element={<MyChat/> }>  </Route>
                
            </Routes>

        </Router>
         </>
}

const Home =()=>{



  
  const [isScrolled,setIsScrolled] = useState(false)
  const {user_detail} = useContext(AuthContext);
  const [allQuestions,setAllQuestions] = useState([]);
  //const [Comment,setComment] = useRef();
  const Department_Related_To = useRef();
  //const DepartmentForFilter = useRef();
  const [departmentForFilter,setDepartmentForFilter] = useState()
  const Question = useRef();
  
  const [question,setQuestion] = useState("");
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  const PostCommentOnQuestion =async(e)=>{
    e.preventDefault();
    //console.log(user_detail._id)
    const newPostOnQuestion = {
      userId: user_detail._id,
      Department_Related_To: Department_Related_To.current.value,
      Question: Question.current.value
    }

    try{
      await axios.post("http://localhost:7070/question/create",newPostOnQuestion)    
      window.location.reload()       
   }
   catch(err){
     console.log(err)
   }    
  }

  useEffect(()=>{
    const fetchAllQuestions=async()=>{
      const res = await axios.get("http://localhost:7070/question/AllQuestion")
      setAllQuestions(res.data)
    }
    fetchAllQuestions()
  },[])


  /*useEffect(() => {
    const fetchFilterDepartment =async()=>{
      const res = await axios.get(`http://localhost:7070/question/GetQuestion/Department/${DepartmentForFilter}`)
      console.log(res.data)
    }
    fetchFilterDepartment()
  },[DepartmentForFilter])*/

  const DepartmentForFilter =async(e)=>{
    setDepartmentForFilter(e.target.value)
    try{
      const res = await axios.get(`http://localhost:7070/question/GetQuestion/Department/${e.target.value}`)
      setAllQuestions(res.data)
      console.log(res.data)

    }
    catch(err){

    }
    console.log(e.target.value)
  }

  const QuestionToPost = (e)=>{
    setQuestion(e.target.value)
    if(user_detail){
      console.log(e.target.value)
    }
    else{
      alert("You are Not Login Yet. Your Question will not be posted unless you login.")
    }
    
  }

  window.onscroll =() => {
    setIsScrolled(window.pageYOffset < 40 ? false:true)
    return () => (window.onscroll = null)
 }
  
 

  return<>

     <header className={isScrolled?'header-black':'header'}>
       <div className='header-div'>
       <h1 className={isScrolled?'for-header-black':''}>Connect</h1>
       </div>
      

      <ul className='header-middle-ul'>
        <li ><Link to='/' className={isScrolled?'header-black-link':'header-links'}>Home</Link></li>
        <li><Link to='/student' className={isScrolled?'header-black-link':'header-links'}>Students</Link></li>
        <li><Link to='/market' className={isScrolled?'header-black-link':'header-links'}>Market</Link></li>
        <li><Link to='/mychat' className={isScrolled?'header-black-link':'header-links'}>MyChat</Link></li>
      </ul>

      <ul className='header-right-ul'> 
        <Link to='/login' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Login</button></Link>
        <Link to='/registers' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Register</button></Link>

        <Link to='/addCourse' className='header-button-links'> <button className={user_detail?'header-button':'header-button-hidden'}>Add Info</button></Link>
      </ul>
   </header>

   <div className={user_detail?'written-post':'written-post-hidden'}>
      <h1>Ask Question?</h1>
                  
      <div className='home-subject'>
        <h2>Subject: </h2>
          <select ref={Department_Related_To}>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
          </select>
      </div>

      <TextareaAutosize className='add-comment-textarea' cacheMeasurements value={question} onChange={QuestionToPost} ref={Question} placeholder='Ask Your Question Here...'/>
      <button className='post-question-button' onClick={PostCommentOnQuestion}>Post</button>
  </div>

  <div className='find-questions-by-department'>
    <h2>Find Question by Subject: </h2>
    <select onChange={DepartmentForFilter}>
        <option value="All">All</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Physics">Physics</option>
      </select>
  </div>


    {allQuestions.map((ques) => {
      return<>
              <HomeQuestion key={ques._id} {...ques}/>
            </>
    })}
    
      

    {/*
      <div className='written-post'>
          <h1>Does anyone know good elective?</h1>
          <h3 className='post-anonymous-name'>diskjei2</h3>
          <div className='post-h6'>  
            <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
            <h5><MdComment size={15}></MdComment><span>25</span></h5>
          </div>

        <TextareaAutosize className='add-comment-textarea' cacheMeasurements value={value} onChange={e => setValue(e.target.value)} placeholder='Add Comment...'/>


        <h2 className='all-comments-h2'>All Comments</h2>


          <div className='previous-comments'>
            <h3 className='post-anonymous-name'>diskjei2</h3>
            <div className='post-h6'>  
              <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
              <h5><MdComment size={15}></MdComment><span>25</span></h5>
            </div>
             <p className='previous-comments-h3'>Because jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. You can do it like this.Because jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. You can do itkldsjs kfldj kjkdl lBecause jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it 
             </p>
          </div>

          
          <div className='previous-comments'>
            <h3 className='post-anonymous-name'>slsodndl2</h3>
            <div className='post-h6'>  
              <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
              <h5><MdComment size={15}></MdComment><span>25</span></h5>
            </div>
             <p className='previous-comments-h3'>Because jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. You can do it like this.Because jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. You can do itkldsjs kfldj kjkdl lBecause jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. You can do it like this.pr Because jest provides polyfills for DOM objects by requiring jsdom and react-test-renderer doesn't provide refs for rendered components out of the box (calling ref callbacks with null), you need to supply a mocked ref in your tests in you need it for your tests. 
             </p>
          </div>

          
        


      </div>



      <div className='written-post'>
          <h1>Have anyone taken EECS 2001?</h1>
          <h3 className='post-anonymous-name'>diskjei2</h3>
          <div className='post-h6'>  
            <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
            <h5><MdComment size={15}></MdComment><span>25</span></h5>
          </div>

        <TextareaAutosize className='add-comment-textarea' cacheMeasurements value={value} onChange={e => setValue(e.target.value)} placeholder='Add Comment...'/>

</div>*/}


        </>
}

const HomeQuestion =({Question,userId,Department_Related_To,_id})=>{

  const [value,setValue] = useState("");
  const [anonymousName,setAnonymousName] = useState();
  const [commentOfQuestion,setCommentOfQuestion] = useState([]);
  const comment = useRef()
  const {user_detail} = useContext(AuthContext)
  
  
  useEffect(() =>{
    const fetchUserWhoPostQuestion =async()=>{
      const res = await axios.get(`http://localhost:7070/${userId}`)
      //console.log(res.data[0].username)
      setAnonymousName(res.data[0].username)
    }
    fetchUserWhoPostQuestion()
  },[userId])

  

  useEffect(() => {
    const fetchCommentOfQuestion =async()=>{
      const res = await axios.get(`http://localhost:7070/question/GetQuestionComment/${_id}`)
      setCommentOfQuestion(res.data)
     // console.log(res.data)
    }
    fetchCommentOfQuestion()
  },[_id])

  const commentOnQuestion =async(e)=>{
    e.preventDefault()
    const newCommentOnQuestion ={
        commenting_to_id:_id,
        comment_from: user_detail._id,
        comment: comment.current.value
    }
    try{
      await axios.post(`http://localhost:7070/question/post/comment`,newCommentOnQuestion)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
  }


  return<>

            

              <div className='written-post'>
                  <h1>{Question}</h1>
                  <h3 className='post-anonymous-name'>{anonymousName}</h3>
                  <div className='post-h6'>  
                    <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
                    <h5><MdComment size={15}></MdComment><span>25</span></h5>
                  </div>
                  <h4 className='post-subject'>Subject: {Department_Related_To}</h4>

                <TextareaAutosize className={user_detail?'add-comment-textarea':'written-post-hidden'} cacheMeasurements value={value} onChange={e => setValue(e.target.value)} ref={comment} placeholder='Add Comment...'/>
                <button className={user_detail?'post-question-button':'written-post-hidden'} onClick={commentOnQuestion}>Post</button>


                <h2 className='all-comments-h2'>All Comments</h2>

                {commentOfQuestion.map((comments_of_ques) => {
                  return<>
                          <CommentOfQuestion key={comments_of_ques._id} {...comments_of_ques}/>
                        </>
                })}

                
                  

              </div>

        </>
}

const CommentOfQuestion =({_id,comment,comment_from})=>{

  const [value,setValue] = useState("");
  const [anonymous_comment_from,setAnonymousCommentFrom] = useState()
  const [nestedComments,setNestedComments] = useState([])
  const commentOnComment = useRef()
  const {user_detail} = useContext(AuthContext)
  

  useEffect(() => {
    const fetchUserWhoMadeComment =async()=>{
      const res = await axios.get(`http://localhost:7070/${comment_from}`)
      
      setAnonymousCommentFrom(res.data[0].username)
    }
    fetchUserWhoMadeComment()
  },[comment_from])


  useEffect(()=>{
    const fetchNestedComments =async()=>{
      const res = await axios.get(`http://localhost:7070/question/GetQuestionComment/${_id}`)
      setNestedComments(res.data)
     // console.log(res.data)
    }
    fetchNestedComments()
  },[_id])


  const commentOfComments =async(e)=>{
    e.preventDefault()
    const newNestedComment = {
      commenting_to_id:_id,
      comment_from: user_detail._id,
      comment: commentOnComment.current.value
    }
    try{
      await axios.post(`http://localhost:7070/question/post/comment`,newNestedComment)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
    
  }


  return<>
  <div className='previous-comments'>
                    <h3 className='post-anonymous-name'>{anonymous_comment_from}</h3>
                    <div className='post-h6'>  
                      <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
                      <h5><MdComment size={15}></MdComment><span>25</span></h5>
                    </div>
                    <p className='previous-comments-h3'>{comment}
                    </p>
                    
                    <TextareaAutosize className={user_detail?'previos-comment-textarea':'written-post-hidden'} cacheMeasurements value={value} onChange={e => setValue(e.target.value)} ref={commentOnComment} placeholder='Add Comment...'/>
                    <button className={user_detail?'post-commentOnComment-button':'written-post-hidden'} onClick={commentOfComments}>Post</button>

                    <h4 className='all-comments-h2'>Previous Comments</h4>

                    {nestedComments.map((nested_comment) =>{
                      return<>
                             <NestedComment key={nested_comment._id} {...nested_comment}/>
                            </>
                    })}

                    

                   
                    

                  </div> 
        </>
}


const NestedComment =({comment,comment_from})=>{

  const [anonyName,setAnonyName] = useState()

  useEffect(() => {
    const fetchUserWhoMadeNestedComment =async()=>{
      const res = await axios.get(`http://localhost:7070/${comment_from}`)
      
      setAnonyName(res.data[0].username)
    }
    fetchUserWhoMadeNestedComment()
  },[comment_from])

  return<>
          <div className='nested-comments'>
          <h3 className='post-anonymous-name'>{anonyName}</h3>
          <div className='post-h6'>  
            <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
            <h5><MdComment size={15}></MdComment><span>25</span></h5>
          </div>
            <p className='comments-to-comments'>{comment}</p>
          </div>
        </>
}

const AddCourse =()=>{
  const [selected, setSelected] = useState("");
  const {user_detail} = useContext(AuthContext)
  const [course,setCourse] = useState()
  const [courseToBeRemoved,setCourseToBeRemoved] = useState()
 // console.log(user_detail.Course_Taken_This_Semester)
 // const [userCurrentEnrollment,setUserCurrentEnrollment] = useState(user_detail.Course_Taken_This_Semester)
  //setUserCurrentEnrollment(user_detail.Course_Taken_This_Semester)


  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
   
  };


  const All = ["Select Course","EECS 3101","EECS 1020","MATH 1299","MATH 2000"];
  const EECS = ["Select Course","EECS 3101","EECS 1020"];
  const MATH = ["Select Course","MATH 1299","MATH 2000"];
  

  let type = null;
  let option = null;
  

  if (selected === "All") {
    type = All;
  } else if (selected === "Computer Science") {
    type = EECS;
  } else if (selected === "Mathematics") {
    type = MATH;
  }

  if (type) {
    option = type.map((el) => <option key={el}>{el}</option>);
  }

  const CourseWantToAdd =(e)=>{
    e.preventDefault()
    setCourse(e.target.value)
  }

  const CourseWantToRemove =(e)=>{
    e.preventDefault()
    setCourseToBeRemoved(e.target.value)
  }

  const CourseAdded =async(e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:7070/addCourse/${user_detail._id}/${course}`)
    console.log(`${user_detail._id} + ${course}`)
 //   setUserCurrentEnrollment([...userCurrentEnrollment,course])
    window.location.reload()
    
  }
  
  const CourseRemoved =async(e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:7070/removeCourse/${user_detail._id}/${courseToBeRemoved}`)
    console.log(`${user_detail._id} + ${course}`)
 //   setUserCurrentEnrollment([...userCurrentEnrollment,course])
    window.location.reload()
    
  }

  
  

  return<>
          <div className='addCourseBox'>
             <div className='addCourseBox-firstDiv'>
                <select className='addCourse-select-department' onChange={changeSelectOptionHandler}>
                      <option value="select-department">--Select Department--</option>
                      <option value="All">All</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                    </select>

                    <div className='addCourse-select-course'>
                      <select onChange={CourseWantToAdd}>
                          {option}
                        </select>
                    </div>
                    <button className='add-course-button' onClick={CourseAdded}>Add</button>
                    
                                   
             </div>

             <div className='addCourse-remove-course'>
                      <select onChange={CourseWantToRemove}>
                          <option value='Select Course'>Course To Remove</option>
                          {user_detail.Course_Taken_This_Semester.map((removeCourse) =>{
                            return<>
                                    <option value={removeCourse}>{removeCourse}</option>
                                  </>
                          })}
                        </select>
                        <button className='add-course-button' onClick={CourseRemoved}>Remove</button>
              </div>
              

                <h2 className='addCourse-h2'>Course You Are Enrolled in:</h2>

                <ol>
                    {user_detail.Course_Taken_This_Semester.map((courseEnrollend) => {
                      return<>
                              <li key={courseEnrollend._id} className='addInfo-li'>{courseEnrollend}</li>
                            </>
                    })}
                  </ol>

          </div>

           
          
        </>
}

const Student =()=>{
  const {user_detail} = useContext(AuthContext)
  const [selected, setSelected] = useState("");
  const [trial,setTrial] = useState([])
  const [subject,setSubject] = useState("All");
  const [user,setUser] = useState([]);
  const [isScrolled,setIsScrolled] = useState(false)
  

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
   
  };



  const All = ["EECS 3101","EECS 1020","MATH 1299","MATH 2000"];
  const EECS = ["EECS 3101","EECS 1020"];
  const MATH = ["MATH 1299","MATH 2000"];
  

  let type = null;
  let option = null;
  

  if (selected === "All") {
    type = All;
  } else if (selected === "Computer Science") {
    type = EECS;
  } else if (selected === "Mathematics") {
    type = MATH;
  }

  if (type) {
    option = type.map((el) => <option key={el}>{el}</option>);
  }

  useEffect(() => {
   const fetchAllUserDetail =async()=>{
      const res = await axios.get(`http://localhost:7070/get/all_users`)
      setTrial(res.data)
      
   } 
   fetchAllUserDetail()
  })

  const subjectToBeFilter=(e)=>{
    setSubject(e.target.value)
    
  }
  

  useEffect(()=>{
    const fetchUserBySubject =async()=>{
      const res = await axios.get(`http://localhost:7070/GetUser/Department/${subject}`)
      setUser(res.data)

    }
    fetchUserBySubject()
  },[subject])

  window.onscroll =() => {
    setIsScrolled(window.pageYOffset < 40 ? false:true)
    return () => (window.onscroll = null)
 }


   return<>
     <header className={isScrolled?'header-black':'header'}>
       <div className='header-div'>
       <h1 className={isScrolled?'for-header-black':''}>Connect</h1>
       </div>
      

      <ul className='header-middle-ul'>
        <li ><Link to='/' className={isScrolled?'header-black-link':'header-links'}>Home</Link></li>
        <li><Link to='/student' className={isScrolled?'header-black-link':'header-links'}>Students</Link></li>
        <li><Link to='/market' className={isScrolled?'header-black-link':'header-links'}>Market</Link></li>
        <li><Link to='/mychat' className={isScrolled?'header-black-link':'header-links'}>MyChat</Link></li>
      </ul>

      <ul className='header-right-ul'> 
        <Link to='/login' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Login</button></Link>
        <Link to='/registers' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Register</button></Link>

        <Link to='/addCourse' className='header-button-links'> <button className={user_detail?'header-button':'header-button-hidden'}>Add Info</button></Link>
      </ul>
   </header>

            <div className='student-select-department'>
              <h2>Find Student by Department: </h2>
              <select onChange={changeSelectOptionHandler}>
                  <option value="select-department">--Select Department--</option>
                  <option value="All">All</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
            </div>

            <div className='student-select-department'>
              <h2>Find Student by Course: </h2>
              <select onChange={subjectToBeFilter}>
                  {option}
                </select>
            </div>

            {user.map((t) =>{
              return<>
                      <AllStudentContent key={t._id} {...t}/>
                    </>
            })}

             

             
             
         </>
}

const AllStudentContent =({FullName,Department,Course_Taken_This_Semester})=>{
  

  return<>

              <div className='students-div'>
                <div className='student-name-button'>
                  <h2 className=''>{FullName} ({Department})</h2>
                  <Link to='/mychat'><button className='student-chat-button' >Chat With {FullName}</button></Link>
                  
                </div>
                
                  <div className=''>
                    <h2>Course {FullName} taking this semester:</h2>
                    <ul className='student-course-list'>
                        {Course_Taken_This_Semester.map((student_course) =>{
                          return<>
                          <li>{student_course}</li>
                          </>
                        })}
                    </ul>
                  </div>
              </div>
        </>
}

const Market =()=>{

  const [file,setFile] = useState(null)
  const [marketpost,setMarketPost] = useState([])
  const [subject,setSubject] = useState()
  const {user_detail} = useContext(AuthContext)
  const Title = useRef()
  const Description = useRef()
  const Price = useRef()
  const [isScrolled,setIsScrolled] = useState(false)

  const selectedSubject=(e)=>{
    setSubject(e.target.value)
  }


  const submitPost =async(e)=>{
    const newMarketPost ={
      Description: Description.current.value,
      Price: Price.current.value,
      Post_Heading: Title.current.value,
      PostedBy: user_detail.FullName,
      Department: subject
    }

    if(file){
      const data = new FormData();
      const fileName = file.name
      data.append("file",file)
      data.append("name",fileName)   
      newMarketPost.Item_Image = fileName
      console.log(fileName)
     
      try{ 
         await axios.post("http://localhost:7070/post/upload",data)  
      }catch(err){}
    }

    try{
      await axios.post("http://localhost:7070/market/marketPost",newMarketPost)    
      window.location.reload()       
   }
   catch(err){}


  }

  useEffect(() =>{
    const fetchMarketPost =async()=>{
      const res = await axios.get(`http://localhost:7070/market/getAllMarketPost`)
      setMarketPost(res.data)
    }
    fetchMarketPost()
  },[subject])

  const FileSelection=(e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  window.onscroll =() => {
    setIsScrolled(window.pageYOffset < 40 ? false:true)
    return () => (window.onscroll = null)
 }

  return<>

<header className={isScrolled?'header-black':'header'}>
       <div className='header-div'>
       <h1 className={isScrolled?'for-header-black':''}>Connect</h1>
       </div>
      

      <ul className='header-middle-ul'>
        <li ><Link to='/' className={isScrolled?'header-black-link':'header-links'}>Home</Link></li>
        <li><Link to='/student' className={isScrolled?'header-black-link':'header-links'}>Students</Link></li>
        <li><Link to='/market' className={isScrolled?'header-black-link':'header-links'}>Market</Link></li>
        <li><Link to='/mychat' className={isScrolled?'header-black-link':'header-links'}>MyChat</Link></li>
      </ul>

      <ul className='header-right-ul'> 
        <Link to='/login' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Login</button></Link>
        <Link to='/registers' className='header-button-links'> <button className={user_detail?'header-button-hidden':'header-button'}>Register</button></Link>

        <Link to='/addCourse' className='header-button-links'> <button className={user_detail?'header-button':'header-button-hidden'}>Add Info</button></Link>
      </ul>
   </header>

            <div className={user_detail?'written-post':'written-post-hidden'}>
              <h1>Add New Post</h1>
                  
              <div className='home-subject'>
                <h2>Subject: </h2>
                  <select onChange={selectedSubject}>
                    <option value="Select Subject">Select Subject</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>
              </div>

                <TextareaAutosize className='add-comment-textarea' cacheMeasurements placeholder='Post Title' ref={Title}/>
                <TextareaAutosize className='add-comment-textarea' cacheMeasurements placeholder='Description' ref={Description}/>
                <TextareaAutosize className='add-comment-textarea' cacheMeasurements placeholder='Price' ref={Price}/>
                <label htmlFor="file-upload" className="what_in_mind_button custom-file-upload">
                  <MdPhotoSizeSelectActual/> Photos
                  </label>
                  <input type="file" style={{display:"none"}} id="file-upload"  accept=".png,.jpg,.jpeg" onChange={FileSelection} className="what_in_mind_button"></input>
                <button className='post-question-button' onClick={submitPost}>Post</button>
            </div>


            <div className='student-select-department'>
              <h2>Find item by subject: </h2>
              <select>
                  <option value="select-department">--Select Department--</option>
                  <option value="All">All</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
            </div>


            {marketpost.map((posts) => {
              return<>
                      <MarketPostSyntax key={posts._id} {...posts}/>
                    </>
            })}



        </>
}

const MarketPostSyntax =({Department,Description,Item_Image,Post_Heading,Price,PostedBy})=>{

 

  return<>
            <div className='students-div'>
                <div className='market-div'>
                  <img src={Item_Image?"http://localhost:7070/images/"+Item_Image:""} className='market-img'></img>
                  
                  <div>
                    <h3 className='post-anonymous-name'>Posted by: {PostedBy}</h3>
                    <div className='post-h6'>  
                      <h5><MdAccessTime size={15}></MdAccessTime><span>2d</span></h5>
                    </div>
                    <h2 className='market-item-info'>Subject: {Department}</h2>      
                    <h2 className='market-item-info'>Title: {Post_Heading}</h2>
                    <p className='market-item-info-description'>{Description}</p>
                    <h2 className='market-item-info'>Price: ${Price}</h2>
                    <Link to='/mychat'><button className='market-item-info student-chat-button'>Chat With {PostedBy}</button></Link>
                    
                  </div>  
                             
                </div>
                
                
              </div>
        </>
}

const MyChat =()=>{
  return<>

            <header>
                <div className='header-div'>
                <h1>Connect</h1>
                </div>
                

                <ul className='header-middle-ul'>
                  <li><Link to='/' className='header-links'>Home</Link></li>
                  <li><Link to='/student' className='header-links'>Students</Link></li>
                  <li><Link to='/' className='header-links'>Market</Link></li>
                  <li><Link to='/' className='header-links'>MyChat</Link></li>
                </ul>

                <ul className='header-right-ul'> 
                  <Link to='/login' className='header-button-links'> <button className='header-button'>Login</button></Link>
                  <Link to='/registers' className='header-button-links'> <button className='header-button'>Register</button></Link>
                </ul>
            </header>

            <div className='mychat'>
              <div className='mychat-contacts'>
                <div  className='mychat-contacts-header'>
                  <h2 className='mychat-contacts-header-h2'>MyChat</h2>
                </div>
                
                
              </div>
              
              <div className='mychat-chat'>
                  <div className='mychat-chat-header'>
                      <h2>Sanyam Panchal</h2>
                  </div>

              </div>
            </div>
        </>
}

const Login =()=>{
  
  
  const email = useRef();
  const password = useRef();
  const {user_detail,isFetching,error,dispatch} = useContext(AuthContext);

  const handleClick =(e) =>{
    e.preventDefault();  
    loginCall({email:email.current.value ,password:password.current.value},dispatch)
  
  }

  const [user, setUser] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user_detail");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);


  return<>
          <div className="bigScreenLogin">
              <div>
              <h1 className='login-heading'>Connect</h1>
              <h3 className="login_page_h3">Connect with friends and the World around you on GoSocial.</h3>
              </div>
              
                <div className="mainLogin">
                  <form onSubmit={handleClick}>
                    <h2 className='login-box-heading'>Connect</h2>
                    <label>Email</label>
                    <input type="email" placeholder="Email"  className="email_input" required ref={email}/>
                    <label>Password</label>
                    <input type="password" placeholder="Password"  minLength="6"  className="email_input" required ref={password}/>
                    <button className="btn btn-primary login_button">{isFetching? "Loading" :"Login"}</button>
                    <button className="btn btn--outline forget_password_button">Forget Password?</button>
                    <button className="btn btn-success create_new_account"><Link to='/registers' className="link_create_account">Create New Account</Link></button>
                  </form>
                </div>
            </div>
        </>
}

const Singup =()=>{
   const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();


    const handleClick= async(e)=>{
      e.preventDefault();
      if(password.current.value !== passwordAgain.current.value){
        passwordAgain.current.setCustomValidity("Password don't match... Please try again...")
      }
      else{
        const user={
          username:username.current.value,
          email:email.current.value,
          password:password.current.value
        }
  
        try{
          await axios.post("http://localhost:7070/registers",user);
          history("/login")
        }
        catch(err){
          console.log(err)
        }
  
      }
    }
  
  return<>
            <div className="bigScreenLogin-signup">
  
              <div>
              <h1 className='login-heading'>GoSocial</h1>
              <h3 className="login_page_h3">Connect with friends and the World around you on GoSocial.</h3>
              </div>
              
                <div className="mainSignup">
                  <form onSubmit={handleClick}>
                    <h2 className='login-box-heading'>GoSocial</h2>
                    <label>UserName</label>
                    <input type="text" placeholder="UserName" minLength={6} ref={username} className="email_input-signup" required/>
                    <label>Email</label>
                    <input type="email" placeholder="Email" ref={email} className="email_input-signup" required/>
                    <label>Password</label>
                    <input type="password" placeholder="Password" ref={password} minLength={6} className="email_input-signup" required/>
                    <label>Password Again</label>
                    <input type="password" placeholder="Password Again" ref={passwordAgain} className="email_input-signup" /> 
                    <button className="btn btn-success login_button signup_button">Sign Up</button>
                    <button className="btn btn--outline already_account"> <Link to='/login' className="link_already_account">Already have an account</Link></button>
                  </form>
                </div>
            </div>
          </>
}

export default App;

