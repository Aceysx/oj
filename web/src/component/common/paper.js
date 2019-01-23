import React from 'react'

const Paper = ({paper}) => {
  const getOptions = (quiz) => {
    const options = JSON.parse(quiz.options)
    return options.map(option => <li>{option}</li>)
  }

  const getQuizzesList = () => {
    const {quizzes} = paper
    return quizzes.map(quiz => {
      return <div><p>{quiz.description}</p>
        <ol>
          {getOptions(quiz)}
        </ol>
      </div>
    })
  }
  return <div>
    <h1>{paper.title}</h1>
    <h2>题目</h2>
    {getQuizzesList()}
  </div>
}

export default Paper
