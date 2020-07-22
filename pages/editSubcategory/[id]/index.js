import React from 'react'
import Layout from '../../../components/Layout/Layout'
import EditSubcategoryFrom from './EditSubcategoryFrom'
import { getCategories } from '../../../actions/category'
import { getsubcategoryById } from '../../../actions/subcategory'

const EditSubcategory = ({subcategory,categoryidfi}) =>{
    return (
        <Layout>
             <div className="col-md-10 mx-auto">                    
                    <h1 className="text-center">Edit Subcategory Page</h1>                 
                    <EditSubcategoryFrom subcategory={subcategory} categoryidfi={categoryidfi}/>
                </div>
        </Layout>
    )
}
EditSubcategory.getInitialProps= async(req)=>{   
    const subcategory = await getsubcategoryById(req.query.id)      
    const categories = await getCategories();        
    return{
        subcategory,
        categoryidfi: categories || [],
    }
}
export default EditSubcategory;