const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    alert("You got all of them right. I saw you cheating. Restarting won't change that. What's done is done. Go on a walk and think about what you've done.");
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "What's 9 + 10?",
    answers: [
      { text: '19', correct: false },
      { text: '21', correct: true }
    ]
  },
  {
    question: 'Whose line is it anyway?',
    answers: [
      { text: 'Ryan Stiles', correct: true },
      { text: 'Colin Mochrie', correct: true },
      { text: 'Wayne Brady', correct: true },
    ]
  },
  {
    question: 'Are pigeons government spies?',
    answers: [
      { text: "It's clearly stated in the Bird Law Constitution, section XIV, subdiv. IV, p. 4. Everybody knows that.", correct: true },
      { text: 'No and I am ignorant', correct: true },
      { text: 'nO thEyRe nOt', correct: false },
      { text: 'Do woodpeckers eat baby birds?', correct: true }
    ]
  },
  {
    question: 'WHERE WERE THE OTHER DRUGS GOING?!',
    answers: [
      { text: "I don't know, I never saw them!", correct: false },
      { text: 'Oh, right over here let me show you.', correct: true }
    ]
  },
  {
    question: 'Have a nice day.',
    answers: [
      { text: "You too.", correct: false },
      { text: 'Thanks', correct: false },
      { text: 'Bye', correct: false },
      { text: "Don't tell me what to do.", correct: true }

    ]
  }
];