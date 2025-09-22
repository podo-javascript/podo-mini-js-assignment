import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [overlap, setOverlap] = useState(0);
  const [words, setWords] = useState('');

  // 글자별 빈도 계산
  const getFrequency = (str) => {
    const freq = {};
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
  };

  const calculateOverlap = (inputStr, targetStr) => {
    const targetFreq = getFrequency(targetStr);
    const inputFreq = getFrequency(inputStr);

    let total = 0;
    for (let char in inputFreq) {
      if (targetFreq[char]) {
        total += Math.min(targetFreq[char], inputFreq[char]);
      }
    }
    return total;
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setOverlap(calculateOverlap(value, words));
  };

  const handleWordChange = (e) => {
    const value = e.target.value;
    setWords(value);
    setOverlap(calculateOverlap(text, value));
  };

  return (
    <div className="app">
      <p>같은 글자수 :{overlap}</p>
      <p>
        입력값과 WORDS 가 동일한가? :
        {words === text ? ' 🎉 Collect!' : ' 불일치'}
      </p>
      <p>대상 문자 : {words}</p>
      <p>input Text : {text}</p>
      <p>
        입력 1 : <input type="text" value={text} onChange={handleTextChange} />
      </p>
      <p>
        입력 2 : <input type="text" value={words} onChange={handleWordChange} />
      </p>
    </div>
  );
}

export default App;
