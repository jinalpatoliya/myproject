import React, { Component, Fragment } from 'react'
import {  getsubcategoriesById } from '../../actions/subcategory'
import Link from 'next/link';

export default class ShowSubcategory extends Component {
    constructor(){
        super();
        this.state={
            subcategory:[]
        }
    }
    async componentDidMount() {
        const subcategory = await getsubcategoriesById(this.props.categoryid);  
        this.setState({
            subcategory:subcategory
        })
      }
    render() {      
        return (
            <Fragment>
                <ul className="listclassInner">
                {
                    this.state.subcategory.map((subcategory)=>{
                        return(
                        <li className="subcategorylist" key={subcategory.id}>                           
                           <Link href="/[category]/[subcategory]" as={`/${this.props.categoryname}/${subcategory.subcategorySlug}`}><a>{subcategory.subcategoryName}</a></Link></li>
                        )
                    })
                }
                </ul>
            </Fragment>
        )
    }
}