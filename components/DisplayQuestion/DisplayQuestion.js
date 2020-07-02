import React, { useState } from "react";

const DisplayQuestion = ({ question }) => {
  const [answer, setAnswer] = useState("");
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [vanswer, setVanswer] = useState("View answer");

  const onAnswerClick = (question) => {
    setAnswer(question.answer);
    setToggleAnswer(!toggleAnswer);
    toggleAnswer ? setVanswer("View Answer") : setVanswer("Hide Answer");
  };

  return (
    <div className="myblock" key={question.question_id}>
      <li
        className="font-weight-bold mycolor mr-2"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></li>
      <div className="options">
        <div>
          <p className="font-weight-bold mycolor mr-2">
            A .
            <div
              className="ml-2 textColor"
              dangerouslySetInnerHTML={{ __html: question.optionA }}
            ></div>
          </p>
        </div>
        <div>
          <p className="font-weight-bold mycolor mr-2">
            B .
            <div
              className="ml-2 textColor"
              dangerouslySetInnerHTML={{ __html: question.optionB }}
            ></div>
          </p>
        </div>
        <div>
          <p className="font-weight-bold mycolor mr-2">
            C .
            <div
              className="ml-2 textColor"
              dangerouslySetInnerHTML={{ __html: question.optionC }}
            ></div>
          </p>
        </div>
        <div>
          <p className="font-weight-bold mycolor mr-2">
            D .
            <div
              className="ml-2 textColor"
              dangerouslySetInnerHTML={{ __html: question.optionD }}
            ></div>
          </p>
        </div>
      </div>
      {toggleAnswer && (
        <p>
          <span className={`mycolor `}>Answer : </span> Option {answer}
        </p>
      )}
      <div className="wrapperblock">
        <div className="answer">
          <i className="fa fa-book mr-2" aria-hidden="true"></i>
          <b
            className="mycolor text-capitalize"
            onClick={() => onAnswerClick(question)}
          >
            {vanswer}
          </b>
        </div>

        {/* <div className="discuss">
          <i class="fas fa-users"></i>
          {/* <a className="mycolor text-capitalize" onClick={()=><MyForum question={question.question_id}/>}>discuss in forum</a> 
          <Link href="/questionforum/[id]" as={`/questionforum/${question.id}`}>
            <a className="mycolor text-capitalize">discuss in forum</a>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DisplayQuestion;
