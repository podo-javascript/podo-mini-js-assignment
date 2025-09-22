import { useState } from 'react';

const WORDS = 'apple';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  function handleInput(e) {
    const inputValue = e.target.value;
    setInput(inputValue);

    // 입력값과 WORDS 완전 일치 로직
    WORDS === inputValue ? setIsCorrect(true) : setIsCorrect(false);

    // 기준이 되는 단어 분해 후 빈도 계산
    // 이미 단어가 있으면 +1, 없다면 1로 카운트 up
    const standardCounter = {};
    [...WORDS].forEach((word) => {
      if (standardCounter[word]) {
        standardCounter[word] += 1;
      } else {
        standardCounter[word] = 1;
      }
    });

    // 입력값 분해 후 빈도 계산
    // 이미 단어가 있으면 +1, 없다면 1로 카운트 up
    const inputCounter = {};
    [...inputValue].forEach((word) => {
      if (inputCounter[word]) {
        inputCounter[word] += 1;
      } else {
        inputCounter[word] = 1;
      }
    });

    // 기준 단어 vs 입력 값 빈도 계산
    let sameCount = 0;
    for (let word in standardCounter) {
      sameCount += Math.min(standardCounter[word], inputCounter[word] || 0); //inputCounter[word]가 빈 값이면 undefined 리턴하기 때문에 0을 기본값으로 할당
    }
    setCount(sameCount);
  }

  return (
    <div className="app">
      <p>같은 글자수 : {count}</p>
      <p>입력값과 WORDS 가 동일한가? :</p>
      <p>대상 문자 : {WORDS}</p>
      <p>input Text : {input}</p>
      <input onChange={handleInput} />
      {isCorrect ? <p>🎉 Correct!</p> : <p>불일치</p>}
    </div>
  );
}

export default App;
