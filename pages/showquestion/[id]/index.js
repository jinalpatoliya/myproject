import Layout from "../../../components/Layout/Layout";
import { getQuestionBySubId } from "../../../actions/questions";
import DisplayQuestion from "../../../components/DisplayQuestion/DisplayQuestion";

const ShowQuestion = ({ questions }) => {
  return (
    <Layout>
      <container className="col-md-8">
        <ol>
          {questions.map((question, index) => {
            return <DisplayQuestion question={question} key={index} />;
          })}
        </ol>
      </container>
    </Layout>
  );
};

ShowQuestion.getInitialProps = async ({ query }) => {
  console.log("Query Value", query);
  const id = {
    subcategory_id: query.id,
  };
  const question = await getQuestionBySubId(id); 
  return {
    questions: question,
  };
};
export default ShowQuestion;
