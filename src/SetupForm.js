import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz, handleChange, handleSubmit, error} = useGlobalContext();

  const {amount, category, difficulty} = quiz;
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input type="number" name="amount" id="amount" className="form-input" min={1} max={50} value={amount} onChange={handleChange} />
          </div>

          {/* category */}
          <div className="form-control">
            <label htmlFor="amount">category</label>
            <select name="category" id="category" className="form-input" value={category} onChange={handleChange}>
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>

          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select name="difficulty" id="difficulty" className="form-input" value={difficulty} onChange={handleChange}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          {error && (<p className="error">
              can't generate questions, please try differente options
            </p>) }

          <button className="submit-btn" type="submit" onSubmit={handleSubmit}>start</button>
        </form>

      </section>
    </main>
  )
}

export default SetupForm
