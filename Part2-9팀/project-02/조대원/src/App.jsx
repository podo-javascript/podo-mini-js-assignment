import { useState } from 'react';

const WORDS = 'apple';

function App() {
  const [text, setText] = useState('');
  const [overlap, setOverlap] = useState(0);

  // 글자별 빈도 계산
  const getFrequency = (str) => {
    const freq = {};
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
  };

  const calculateOverlap = (inputStr) => {
    const wordsFreq = getFrequency(WORDS);
    const inputFreq = getFrequency(inputStr);

    let total = 0;
    for (let char in inputFreq) {
      if (wordsFreq[char]) {
        total += Math.min(wordsFreq[char], inputFreq[char]);
      }
    }
    return total;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setOverlap(calculateOverlap(value));
  };

  return (
    <div className="app">
      <p>같은 글자수 :{overlap}</p>
      <p>
        입력값과 WORDS 가 동일한가? :
        {WORDS === text ? ' 🎉 Collect!' : ' 불일치'}
      </p>
      <p>대상 문자 : {WORDS}</p>
      <p>input Text : {text}</p>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
}

export default App;
