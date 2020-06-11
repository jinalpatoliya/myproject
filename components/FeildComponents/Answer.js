import React, { Component } from 'react';

class Answer extends Component {
    render() {
        const { label, handlechange, content } = this.props;
        return (
            <div className="form-group">
                <label>{label} :</label>
                <select name={content} onChange={handlechange} className="form-control">
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                </select>
            </div>
        );
    }
}

export default Answer;