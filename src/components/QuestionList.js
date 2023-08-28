
import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"; 

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [])

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
    .then(() => {
      setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
      );
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>

      <ul>{questions.map((question) => (
        <QuestionItem key={question.id} question={question} onDelete={handleDeleteQuestion} />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
