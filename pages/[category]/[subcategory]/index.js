import { useRouter } from "next/router";
import { Component, Fragment } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import { getPerPageQuestion } from "../../../actions/questions";
import DisplayQuestion from "../../../components/DisplayQuestion/DisplayQuestion";
import QuestionPagination from "../../../components/QuestionPagination/QuestionPagination";

const ShowQuestion = ({ questions, category, subcategory, page }) => {
  return (
    <Layout>
      <container className="col-md-8">
        <ol>
          {questions.rows.map((question) => {
            return (
              <DisplayQuestion question={question} questions={questions} />
            );
          })}
        </ol>
        <ul className="pagination">
          <QuestionPagination
            totalPage={questions.count}
            category={category}
            subcategory={subcategory}
            activePage={page}
          />
        </ul>
      </container>
    </Layout>
  );
};

ShowQuestion.getInitialProps = async ({ query }) => {
  let page = 0;
  if (query.page) {
    page = parseInt(query.page) - 1;
  }
  const { subcategory, category } = query;

  try {
    const question = await getPerPageQuestion(category, subcategory, page);
    console.log("--------------------------------------------");
    console.log("GetInitial Props Question Value From Id : ", question);
    console.log("--------------------------------------------");
    return {
      questions: question,
      category: category,
      subcategory: subcategory,
      page: page,
    };
  } catch (err) {
    console.log("--------------------------------------------");
    console.log("GetInitial Props Question Value From Id Error : ", err);
    console.log("--------------------------------------------");
  }
  return {};
};
export default ShowQuestion;
