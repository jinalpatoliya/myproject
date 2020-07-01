import Layout from "../components/Layout/Layout";
import { getQuestion } from "../actions/questions";
import { Component, Fragment } from "react";

class ShowQuestion extends Component {  
  static async getInitialProps(){
   const question = await getQuestion();  
  //  console.log("GetInitial Props Question Value : ",question)
   return{
     questions:question
   }
  }
  constructor(props){
    super(props);
    this.state={
      show:false
    }
  }
render(){
  return(
    <Layout>
      <container className="col-md-8">
      <h1>Question List</h1>
     <ol >
      {
        this.props.questions.map((question)=>{
          return(
            <div className="myblock" key={question.question_id}>
              <li>{question.question}</li>
                  <div className="options">
                   <div><p><span className="font-weight-bold mycolor mr-2">A . </span>{question.optionA}</p></div>
                   <div><p><span className="font-weight-bold mycolor mr-2">B . </span>{question.optionB}</p></div>
                   <div><p><span className="font-weight-bold mycolor mr-2">C . </span>{question.optionC}</p></div>
                   <div><p><span className="font-weight-bold mycolor mr-2">D . </span>{question.optionD}</p></div>
                  </div>
                  {this.state.show ? <p><span className="mycolor">Answer : </span> Option {question.answer}</p>:null}
                  <div className="answer">
                    <i className="fa fa-book mr-2" aria-hidden="true"></i>
                    <a className="mycolor text-capitalize" onClick={()=>{this.setState({show:!this.state.show})}}>view answer</a>                   
                  </div>
            </div>
          )
        })
      }
      </ol>
      </container>
    </Layout>
  );
}

}
export default ShowQuestion;
