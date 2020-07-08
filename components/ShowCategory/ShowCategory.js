import React, { Component, Fragment } from 'react'
import Link from 'next/link';
import { getcategoriesByMainCategoryId } from '../../actions/maincategorymapping';


export default class ShowCategory extends Component {
    constructor(){
        super();
        this.state={
            categories:[]
        }
    }
    async componentDidMount() {
        const categories = await getcategoriesByMainCategoryId(this.props.maincategoryid);  
        this.setState({
            categories:categories
        })
      }
    render() {    
        console.log("categories",this.state.categories)  
        return (
            <Fragment>
                <ul className="listclassInner">
                {
                    // this.state.subcategory.map((subcategory)=>{
                    //     return(
                    //     <li className="subcategorylist" key={subcategory.id}>                           
                    //        <Link href="/[category]/[subcategory]" as={`/${this.props.categoryname}/${subcategory.subcategorySlug}`}><a>{subcategory.subcategoryName}</a></Link></li>
                    //     )
                    // })
                }
                </ul>
            </Fragment>
        )
    }
}
