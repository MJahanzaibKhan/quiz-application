import { useState } from 'react';
import { Header } from '../../components/header'
import { QuestionSection } from '../../components/question-section'
import QuizQuestion from '../../utils/question.json'
import MultiSlider, { Progress } from 'react-multi-bar-slider';
import './style.css'

let defaultValue = [
  { color: "#D2D2D2", progress: 0 },
  { color: "#717171", progress: 0 },
  { color: "black", progress: 0 }
]
export const MainContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(0);
  let [progressBarValues, setProgressBarValues] = useState(defaultValue)

  let currentQuestion = QuizQuestion.slice(currentIndex, currentIndex + 1)[0];
  let headerTitle = `Question ${currentIndex + 1} of ${QuizQuestion.length}`
  let rating = currentQuestion.difficulty === 'hard' ? 3 : currentQuestion.difficulty === 'medium' ? 2 : 1;

  const nextQuestionHandler = () => {
    console.log('currentIndex', currentIndex)
    if (currentIndex + 1 < QuizQuestion.length) {
      setCurrentIndex(currentIndex + 1)
      bottomProgressBarHandler()
    }
  }

  const bottomProgressBarHandler = () => {
    let totalQuestions = QuizQuestion.length;

    let onSuccess = (result / totalQuestions) * 100;
    let currentPercentage = (result / (currentIndex + 1) * 100);
    let onFail = (((currentIndex + 1) - result) / totalQuestions) * 100;

    let progressBarArray = [
      { color: "#D2D2D2", progress: onSuccess },
      { color: "#717171", progress: currentPercentage },
      { color: "black", progress: onFail },
    ];

    setProgressBarValues(progressBarArray)
  }
  console.log("res", progressBarValues)
  return (
    <div className="App">
      <MultiSlider
        readOnly={true}
        height={20}
        backgroundColor="white"
      >
        <Progress color='#A9AAA9' height={'100%'} progress={(currentIndex + 1) * (100 / QuizQuestion.length)} />
      </MultiSlider>
      <Header title={headerTitle} category={decodeURIComponent(currentQuestion.category)} rating={rating} />
      <QuestionSection currentQuestion={currentQuestion} nextQuestionHandler={nextQuestionHandler} setResult={setResult} />

      <div className='multi-bar'>
        <div className='score'>
          <span>Score: {Math.round(progressBarValues[1].progress)}%</span>
          <span>Max Score: {Math.round(progressBarValues[0].progress)}%</span>
        </div>
        <div className='multi-statusbar'>
          <MultiSlider
            readOnly={true}
            height={20}
            backgroundColor="white"
          >
            {
              progressBarValues?.map((bar, index) => {
                return <Progress key={index} color={bar.color} height={'100%'} progress={bar.progress} />
              })
            }
          </MultiSlider>
        </div>
      </div>
    </div>
  );
}