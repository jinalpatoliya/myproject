import { useRouter } from "next/router";
import { Component, Fragment } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import {  getQuestionBySubId,  getPerPageQuestion,} from "../../../actions/questions";
import DisplayQuestion from "../../../components/DisplayQuestion/DisplayQuestion";
import { getSubcategoryId } from "../../../actions/subcategory";

import MyPagination from "./MyPagination";

const ShowQuestion = ({ questions, category, subcategory , page , npage ,count}) => {
   if(npage>count){
     npage=count
   }
   if(page<=0){
     page=1
   }
  return (
    <Layout>
      <container className="col-md-8">
        {/* <h1>Question List : {id}</h1> */}
        <ol>
          {questions.rows.map((question) => {
            return (
              <DisplayQuestion question={question} questions={questions} />
            );
          })}
        </ol>
        <ul className="pagination">
        <li><Link href={`/[category]/[subcategory]?page=${page}`} as={`/${category}/${subcategory}?page=${page}`}><a>Previous</a></Link></li>
        <MyPagination
          number={questions.count}
          category={category}
          subcategory={subcategory}
        />
         <li><Link href={`/[category]/[subcategory]?page=${npage}`} as={`/${category}/${subcategory}?page=${npage}`}><a>Next</a></Link></li>
        </ul>
      </container>
    </Layout>
  );
};

ShowQuestion.getInitialProps = async ({ query, pathname, asPath }) => {
  console.log("---------------------");
  console.log("Query Value", query);
  console.log(pathname);
  console.log(asPath);
  console.log("---------------------");
  const slug = {
    subcategorySlug: query.subcategory,
  };
  let page = 0;
  if (query.page) {
    page = parseInt(query.page) - 1;
  }

  const fetchsubid = await getSubcategoryId(slug);
  console.log("Getting Subcategory Id : ", fetchsubid.id);
  const id = {
    subcategory_id: fetchsubid.id,
    pageNum: page,
  };
  // const question = await getQuestionBySubId( fetchsubid.id);
  const question = await getPerPageQuestion(id);
  console.log("GetInitial Props Question Value From Id : ", question);
  return {
    questions: question,
    category: query.category,
    subcategory: query.subcategory,
    page:page,
    npage:page+2,
    count:question.count
  };
};
export default ShowQuestion;
