import Layout from "../../components/Layout/Layout";
import { getSubcategoriesBySlug } from "../../actions/subcategory";
import { Fragment } from "react";
import Link from "next/link";

const ShowSubCategoryPage = ({subcategories,category}) => {
  return (
    <Layout>
       <container className="col-md-8 mx-auto"></container>
      <h1 className="text-center">Subcategories</h1>
     <ul className="listclassInner">
      {
        subcategories.map((subcategory,index)=>{
          return(
            <Fragment key={index}>
                <li className="subcategorylist">
                  <Link href="/[category]/[subcategory]"
                          as={`/${category}/${subcategory.subcategorySlug}`}>
                    <a>{subcategory.subcategoryName}</a>
                  </Link></li>
            </Fragment>
          )
        })
      }
      </ul>
    </Layout>
  );
};
ShowSubCategoryPage.getInitialProps = async ({ query }) => {
  const { category } = query;
  console.log("Query Category", category);
  const subcategories=await getSubcategoriesBySlug(category);
  console.log("subcategories",subcategories);
  // try {
  //   const subcategories=await getSubcategoriesBySlug(category);
  //   console.log("subcategories : :",subcategories);
  //   return {
  //     subcategories: subcategories      
  //   };
  // } catch (err) {    
  //   console.log("GetInitial Props Question Value From Id Error : ", err);    
  // }
  return {
    subcategories,category
  };
};
export default ShowSubCategoryPage;
