import Layout from "../../../components/Layout/Layout"
import { getQuestionById } from "../../../actions/questions"
import CommentForm from "./commentform"
import DisplayComment from "../../../components/DisplayComment/DisplayComment"
import { getComment } from "../../../actions/comment"

const MyForum = ({question , comments}) => {
    return (
       <Layout>           
           <div className="container">
               <div className="col-md-8">
           <ol>
           {
               question.map((question)=>{
                   return(
                    <div className="myblock" key={question.id}>
                    <li>{question.question}</li>
                    <div className="options">
                        <div><p><span className="font-weight-bold mycolor mr-2">A . </span>{question.optionA}</p></div>
                        <div><p><span className="font-weight-bold mycolor mr-2">B . </span>{question.optionB}</p></div>
                        <div><p><span className="font-weight-bold mycolor mr-2">C . </span>{question.optionC}</p></div>
                        <div><p><span className="font-weight-bold mycolor mr-2">D . </span>{question.optionD}</p></div>
                    </div>                  
                    <p><span className={`mycolor `}>Answer : </span> Option {question.answer}</p>
                    <DisplayComment id={comments}/>
                    <CommentForm id={question.id}/>
                  </div>                  
                   )
               })
           }
           </ol>
           </div>
           </div>
       </Layout>
    )
}
MyForum.getInitialProps= async(req)=>{
    const id={
        id:req.query.id
    }
    const qid={
        question_id:req.query.id
    }
    const question = await getQuestionById(id);
    const comments = await getComment(qid)
    return{
        question:question,
        comments:comments
    }
}
export default MyForum;