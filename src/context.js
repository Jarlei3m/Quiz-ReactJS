import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = ''
const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  })

  const fetchQuestions = async(url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch(err => console.log(err))
    
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false)
      }
    } else {
      setWaiting(true);
      setError(true)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz, [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleNextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        handleOpenModal();
        return 0
      }

      return index
    })
  };

  const checkAnswer = (value) => {
    if(value) {
      setCorrect((oldState) => oldState + 1)
    }
    handleNextQuestion();
  };

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setWaiting(true);
    setCorrect(0);
    setModalOpen(false)
  }

  return (
    <AppContext.Provider value={
      {
        loading,
        waiting,
        questions,
        index,
        error,
        correct,
        modalOpen,
        handleNextQuestion,
        checkAnswer,
        handleCloseModal,
        quiz,
        handleChange,
        handleSubmit
      }
    }>
      {children}
    </AppContext.Provider>
  )
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
};

export { AppContext, AppProvider }
