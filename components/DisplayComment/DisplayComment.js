import React, { Component } from 'react'
import { getComment } from '../../actions/comment'

const DisplayComment = (props) => {     
        
        return (
            <div>
                {/* {console.log("Comments Comming For Display",props.id)} */}
                {
                    props.id.map((comment)=>{
                        return(
                            <div className="comment-block">
                                <div className="commentName">
                                    <b className="mycolor">{comment.name}</b>
                                    <span> said :</span>
                                    <span className="commentDate">{`(${comment.date})`}</span>
                                </div>
                                <div className="commentDescription">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
// DisplayComment.getInitialProps=(req)=>{
//     console.log("Request Value",req)
//     return{

//     }

// }
export default DisplayComment;