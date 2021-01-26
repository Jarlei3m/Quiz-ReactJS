import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    waiting, 
    loading, 
    questions, 
    index, 
    correct, 
    handleNextQuestion, 
    checkAnswer
  } = useGlobalContext();

  if (waiting){
    return <SetupForm />
  };

  if (loading){
    return <Loading />
  };

  const {question, correct_answer, incorrect_answers} = questions[index];
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if(tempIndex === 3) {
    answers.push(correct_answer) // push the correct answer in the end of the array
  } else {
    answers.push(answers[tempIndex]) // push the answer on the position 'tempIndex' to the end of the array
    answers[tempIndex] = correct_answer // get the position tempIndex of the array and put the correct answer on that position
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">correct answers: {correct} / {index}</p>
        <article className="container">
              <h2 dangerouslySetInnerHTML={{ __html: question}} />
              <div className="btn-container">
                {answers.map((answer, index) => {
                  return (
                    <button 
                      dangerouslySetInnerHTML={{ __html: answer }} 
                      key={index} 
                      className="answer-btn" 
                      onClick={() => checkAnswer(correct_answer === answer )}
                    />
                  )
                })}
              </div>
            </article>
        <button className="next-question" onClick={handleNextQuestion}>next question</button>
      </section>
    </main>
  )
}

export default App
