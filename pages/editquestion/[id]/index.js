import React from 'react'
import Layout from '../../../components/Layout/Layout'
import { getQuestionById } from '../../../actions/questions'
import EditQuestionForm from './EditQuestionForm'

const EditQuestion = ({question}) =>{
    return (
        <Layout>
             <div className="col-md-10 mx-auto">                    
                    <h1 className="text-center">Edit Question Page</h1>                 
                    <EditQuestionForm question={question}/>
                </div>
        </Layout>
    )
}
EditQuestion.getInitialProps= async(req)=>{   
    const question=await getQuestionById(req.query.id)    
    return{
        question:question
    }
}
export default EditQuestion;