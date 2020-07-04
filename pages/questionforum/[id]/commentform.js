import React, { Component } from 'react'
import validator from 'validator';
import { insertComment } from '../../../actions/comment';

export default class CommentForm extends Component {
    static getInitialProps = async ({query})=>{
        const id = query.id
        return{
            id
        }
    }
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            comment:'',
            ErrorMsg:'',
            SuccessMsg:'' 
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { name , email , comment } = this.state;
        const comments={
            name,
            email,
            comment,
            question_id:this.props.id
        }
        if(!validator.isEmpty(name) &&
            !validator.isEmpty(email) &&
            !validator.isEmpty(comment)){
                const data=await insertComment(comments);
                this.setState({
                    SuccessMsg: "Comment Entered Successfully.",
                    ErrorMsg: '',
                    name:'',
                    email:'',
                    comment:''
                })                
            }
        else{
            this.setState({
                ErrorMsg:"Please Enter All Details."
            })
        }
    }
    render() {
        return (
            <div className="commentForm">
                <form>
                        <p className="mycolor">Post your comment here.</p>
                        <textarea className="form-control" rows="5" name="comment" onClick={this.handleChange}></textarea>
                        <label className="mt-3">Name : </label>
                        <input className="form-control" type="text" name="name" onClick={this.handleChange} />
                        <label className="mt-3">Email : </label>
                        <input className="form-control" type="email" name="email" onClick={this.handleChange} />
                        <input type="submit" className="btn default-btn mt-3" name="submit" value="submit" onClick={this.handleSubmit}/>
                        {this.state.SuccessMsg && <div className="alert alert-success mt-3" role="alert"> {this.state.SuccessMsg} </div>}
                        {this.state.ErrorMsg && <div className="alert alert-danger mt-3" role="alert"> {this.state.ErrorMsg} </div>}
                        </form>
            </div>
        )
    }
}
