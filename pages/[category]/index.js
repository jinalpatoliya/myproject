import Layout from "../../components/Layout/Layout";
import { getSubcategoriesBySlug } from "../../actions/subcategory";

const ShowSubCategoryPage = ({}) => {
  return (
    <Layout>
      <container className="col-md-8"></container>
    </Layout>
  );
};
ShowSubCategoryPage.getInitialProps = async ({ query }) => {
  const { category } = query;
  console.log("Query Category", category);
  // const subcategories=await getSubcategoriesBySlug(category);
  // console.log("subcategories",subcategories);
  try {
    const subcategories=await getSubcategoriesBySlug(category);
    console.log("subcategories : :",subcategories);
    return {
      subcategories: subcategories      
    };
  } catch (err) {    
    console.log("GetInitial Props Question Value From Id Error : ", err);    
  }
  return {};
};
export default ShowSubCategoryPage;
