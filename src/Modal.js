import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {modalOpen, handleCloseModal, correct, questions} = useGlobalContext();
  return (
    <div className={`modal-container ${modalOpen && 'isOpen'}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered {((correct/questions.length)*100).toFixed(0)}% of questions correctly</p>
        <button className="close-btn" onClick={handleCloseModal}>play again</button>
      </div>
    </div>
  )
}

export default Modal
