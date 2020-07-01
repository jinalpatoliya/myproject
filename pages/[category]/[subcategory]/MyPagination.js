import React, { Component, Fragment } from "react";
import  Link  from "next/link";
import next from "next";

export default class MyPagination extends Component {    
    constructor(){
        super();
        this.state={
            selected:false    ,
            name:''
        }
    }          
    activateTab = (e) => {  
        e.preventDefault();              
        this.setState({selected  : !this.state.selected,
                        name:"active"    
        });
    } 
  displayPages = (number) => {
    let isActive = this.state.selected === true ? this.state.name : '';
    const ele = [];
    console.log("Number => " + number);   
    for (let i = 0; i < number; i++) {
      console.log("--------------------");
      console.log(i);
      console.log("--------------------");         
      ele.push(
        <li><Link href={`/[category]/[subcategory]?page=${i+1}`} as={`/${this.props.category}/${this.props.subcategory}?page=${i+1}`}>
                <a onClick={this.activateTab} className={isActive}>{i+1}</a>
            </Link>
        </li>);           }    
    return ele;
  };
 
  render() {
    console.log("Count MyPAgination", this.props.number);
    return <Fragment>
        {this.displayPages(this.props.number)}
        </Fragment>
  }
}
