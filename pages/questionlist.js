import React, { Component } from 'react'
import Layout from '../components/Layout/Layout';
import { getQuestion } from '../actions/questions';
import Link from 'next/link';

class QuestionList extends Component {
    static async getInitialProps (req){
        const questions = await getQuestion();
        console.log("Props Getting Questions : ",questions)
        return{
            questions:questions
        }
    }
    render() {
        console.log("Render Question Access : ",this.props.questions)
        return (
            <Layout>
                <h1 className="mycolor mb-4 text-center">Question List</h1>
                <table className="table table-bordered">
                {
                    this.props.questions.map((question)=>{
                        return(
                            <tr key={question.id}>
                                <td>{question.question}</td>
                                <td><Link href="/editquestion/[id]" as={`/editquestion/${question.id}`}><a>Edit</a></Link></td>
                            </tr>
                        )
                    })
                } 
                </table>
            </Layout>
        )
    }
}

export default QuestionList;
