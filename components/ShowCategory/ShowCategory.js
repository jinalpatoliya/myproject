import React, { Component, Fragment } from 'react'
import Link from 'next/link';


export default class ShowCategory extends Component {   
    render() {    
        // console.log("categories",this.props.catgeoryList)  
        return (
            <Fragment>
                <ul className="listclassInner">
                {
                    this.props.catgeoryList.map((category,index)=>{
                        return(
                        <li className="subcategorylist" key={index}>                           
                           {/* <Link href="/[category]/[subcategory]" as={`/${this.props.mainCategoryName}/${category.categorySlug}`}><a>{category.categoryName}</a></Link></li> */}
                        <Link href="/[category]" as={`/${category.categorySlug}`}><a>{category.categoryName}</a></Link></li>
                        )
                    })
                }
                </ul>
            </Fragment>
        )
    }
}
