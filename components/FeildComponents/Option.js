import React, { Component } from 'react';
import TinyMCE from '../TinyMCE/TinyMCE';

class Options extends Component {
    render() {
        const { label , content , handlechange}=this.props;
        return (
            <div className="form-group">
                <label>{label} :</label>
                <TinyMCE content={content} handleChange={handlechange} />
            </div>
        );
    }
}

export default Options;