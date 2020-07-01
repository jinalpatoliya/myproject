import React, { Component, Fragment } from 'react'
import { getCategories } from '../actions/category'
import Layout from '../components/Layout/Layout';
import ShowSubcategory from '../components/ShowSubCategory/ShowSubcategory';

export default class Index extends Component {
  static async getInitialProps(){
    const category = await getCategories();    
    return{
      categories:category || []
    }
  }
  render() {
    return (
     <Layout>
       <ul className="listclassupper">
       {
        this.props.categories.map((category)=>{          
          return(
            <div className="listWrapper">
              <li className="categorylist" key={category.id}>{category.categoryName}</li>                        
              <ShowSubcategory categoryid={category.id} categoryname={category.categorySlug}/>
            </div>
          )
        })
       }
       </ul>
     </Layout>
    )
  }
}
