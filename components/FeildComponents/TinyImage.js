import React, { Component } from 'react';
import TinyMCE from '../TinyMCE/TinyMCE';

class TinyImage extends Component {
    constructor(){
        super();
        this.state={
            imageName:''
        }
    }
    handlechange = ( e) =>{
        this.setState({
            imageName:e.target.value
        })
    }
    render() {
        const {content , handlechange ,label }=this.props;   
        
        const handleValue = this.state.imageName;         
        console.log("Image Name Value : ",typeof handleValue,handleValue)
        return (
            <div className="form-group"> 
                <label>{label} :</label>
                <TinyMCE content={content} id="image" cols="30" rows="10" handleChange={handleValue} />
                <input name="imageName" type="file" id="upload" className="hidden" onChange={handlechange} ></input>               
            </div>
        );
    }
}

export default TinyImage;