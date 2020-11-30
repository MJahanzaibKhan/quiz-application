import { memo, useState } from 'react';
import { Button } from '../botton';
import './style.css'

export const QuestionSection = memo((props) => {

  const [selectOption, setSelectOption] = useState();
  const [questionStatus, setQuestionStatus] = useState('');
  const [overAllResult, setOverAllSResult] = useState(null);
  let options = [...props?.currentQuestion?.incorrect_answers, props?.currentQuestion?.correct_answer];

  const selectedOptionHandler = (option) => {
    if (option === props?.currentQuestion?.correct_answer) {
      props.setResult(prev => prev + 1)
      setOverAllSResult(overAllResult + 10);
      setQuestionStatus('Correct!')
    } else {
      setQuestionStatus('Sorry!')
    }
    setSelectOption(option)
  }

  const hasCorrect = (option) => {
    if (selectOption) {
      if (selectOption === option) {
        return false;
      } else if (option === props?.currentQuestion?.correct_answer) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }


  return (
    <div className='question-setion-container'>
      <p>{decodeURIComponent(props?.currentQuestion?.question)}</p>
      <div className='options-container'>
        {options.map((option, index) => {
          return (
            <Button _className={'attempt-btn'} btnTitle={(decodeURIComponent(option))} key={index}
              style={selectOption === option ? { background: 'black', color: 'white' } :
                { background: 'white', color: 'black' }}
              onClick={() => selectedOptionHandler(option)}
              selectOption={selectOption}
              isDisable={hasCorrect(option)} />
          )
        })}
      </div>
      {questionStatus && <div className='status-nextBtn'>
        <h2 className='question-status'>{questionStatus}</h2>
        <Button _className='next-btn' onClick={() => {
          props?.nextQuestionHandler()
          setSelectOption(false)
          setQuestionStatus('')
        }}
          btnTitle='Next Question' />
      </div>}
    </div>
  )
})