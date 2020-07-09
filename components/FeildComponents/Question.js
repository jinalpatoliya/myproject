import React, { Component } from 'react';
import TinyMCE from '../TinyMCE/TinyMCE';

class QuestionField extends Component {
    render() {
        const {content , handlechange ,label }=this.props
        return (
            <div className="form-group">
                <label>{label} :</label>
                <TinyMCE content={content} handleChange={handlechange} height={400}/>
            </div>
        );
    }
}
export default QuestionField;