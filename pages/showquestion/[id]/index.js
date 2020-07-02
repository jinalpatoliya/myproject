import { useRouter } from "next/router";
import { Component, Fragment } from "react";
import Layout from "../../../components/Layout/Layout";
import { getQuestionBySubId } from "../../../actions/questions";
import Link from "next/link";
import DisplayQuestion from "../../../components/DisplayQuestion/DisplayQuestion";

const ShowQuestion = ({ questions }) => {
  // const router  = useRouter();
  // const { id } = router.query
  // const data = questions.filter((que)=>que.subcategory_id==id)
  // console.log("Question Fetching Finall Id : ",data)
  return (
    <Layout>
      <container className="col-md-8">
        {/* <h1>Question List : {id}</h1> */}
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
  // console.log("GetInitial Props Question Value From Id : ",question)
  return {
    questions: question,
  };
};
export default ShowQuestion;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import Router, { withRouter } from 'next/router'
// import { getPerPageQuestion } from '../../../actions/questions';

//     const Home = (props) => {
//         const [isLoading, setLoading] = useState(false); //State for the loading indicator
//         const startLoading = () => setLoading(true);
//         const stopLoading = () => setLoading(false);

//     		/*
//     			Posts fetching happens after page navigation,
//     			so we need to switch Loading state on Router events.
//     		*/
//         useEffect(() => { //After the component is mounted set router event handlers
//             Router.events.on('routeChangeStart', startLoading);
//             Router.events.on('routeChangeComplete', stopLoading);

//             return () => {
//                 Router.events.off('routeChangeStart', startLoading);
//                 Router.events.off('routeChangeComplete', stopLoading);
//             }
//         }, [])

//     		//When new page selected in paggination, we take current path and query parrams.
//     		// Then add or modify page parram and then navigate to the new route.
//         const pagginationHandler = (page) => {
//             const currentPath = props.router.pathname;
//             const currentQuery = props.router.query;
//             currentQuery.page = page.selected + 1;

//             props.router.push({
//                 pathname: currentPath,
//                 query: currentQuery,
//             });

//         };

//     		//Conditional rendering of the posts list or loading indicator
//         let content = null;
//         if (isLoading)
//             content = <div>Loading...</div>;
//         else {
//     				//Generating posts list
//             content = (
//                 <ul>
//                     {props.posts.map(post => {
//                         return <li key={post.id}>{post.title}</li>;
//                     })}
//                 </ul>
//             );
//         }

//         return (
//             <div className="container">
//                 <h1>Posts List with Pagination in Next.js</h1>
//                 <div className="posts">
//                     {content}
//                 </div>

//                 <ReactPaginate
//                     previousLabel={'previous'}
//                     nextLabel={'next'}
//                     breakLabel={'...'}
//                     breakClassName={'break-me'}
//                     activeClassName={'active'}
//                     containerClassName={'pagination'}
//                     subContainerClassName={'pages pagination'}

//                     initialPage={props.currentPage - 1}
//                     pageCount={props.pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={pagginationHandler}
//                 />
//             </div>
//         );
//     };

//     //Fetching posts in get Intial Props to make the app seo friendly
//     Home.getInitialProps = async ({ query }) => {
//         const page = query.page || 1; //if page empty we request the first page
//         const posts = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`);
//         console.log("Data Coming",posts)
//         const question = await getPerPageQuestion();
//         console.log("GetInitial Props Question Value : ",question)
//         return {
//             totalCount: posts.data._meta.totalCount,
//             pageCount: posts.data._meta.pageCount,
//             currentPage: posts.data._meta.currentPage,
//             perPage: posts.data._meta.perPage,
//             posts: posts.data.result,
//         };
//     }

//     export default withRouter(Home);
