import React from 'react'
import Layout from '../../../components/Layout/Layout'
import { getCategoryById } from '../../../actions/category'
import EditCategoryFrom from './EditCategoryFrom'

const EditCategory = ({category}) =>{
    return (
        <Layout>
             <div className="col-md-10 mx-auto">                    
                    <h1 className="text-center">Edit Category Page</h1>                 
                    <EditCategoryFrom category={category}/>
                </div>
        </Layout>
    )
}
EditCategory.getInitialProps= async(req)=>{   
    const category = await getCategoryById(req.query.id)       
    return{
        category
    }
}
export default EditCategory;