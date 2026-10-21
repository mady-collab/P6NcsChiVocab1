import React, { useState, useEffect, useMemo } from 'react';

const wordData = [
  // 第一課
  { id: 1, lesson: 1, word: '感激', jyutping: 'gam2-gik1', english: 'grateful / to appreciate', chinese: '衷心感謝', sentence: '得到大叔叔的幫忙，我的心裡非常______。' },
  { id: 2, lesson: 1, word: '付出', jyutping: 'fu6-ceot1', english: 'pay', chinese: '交出、耗費心力', sentence: '媽媽每天為我們辛苦______，我們要聽媽媽的話。' },
  { id: 3, lesson: 1, word: '茁壯', jyutping: 'zyut3-zong3', english: 'healthy and strong', chinese: '強壯、健壯', sentence: '小草吸收了陽光和雨水，慢慢______成長。' },
  { id: 4, lesson: 1, word: '抱怨', jyutping: 'pou5-jyun3', english: 'complain', chinese: '心中不滿而責備', sentence: '妹妹動不動就______功課太多，真讓人頭痛。' },
  { id: 5, lesson: 1, word: '愉悦', jyutping: 'jyu4-jyut6', english: 'joyful; cheerful', chinese: '快樂、高興', sentence: '放學後能跟朋友一起玩耍，心情真______！' },
  // 第二課
  { id: 6, lesson: 2, word: '痛苦', jyutping: 'tung3-fu2', english: 'pain', chinese: '身體或精神感到十分難受', sentence: '他不小心跌倒傷了腳，痛得發出______的叫聲。' },
  { id: 7, lesson: 2, word: '疾病', jyutping: 'zat6-beng6', english: 'disease', chinese: '生病、病患', sentence: '吃飯前要洗手，這樣才不會感染______。' },
  { id: 8, lesson: 2, word: '請求', jyutping: 'cing2-kau4', english: 'to request / to ask', chinese: '向人提出要求', sentence: '這道題目太難了，我向老師提出了______，請他指導。' },
  { id: 9, lesson: 2, word: '賺取', jyutping: 'zaan6-ceoi2', english: 'earn', chinese: '獲取(利潤或報酬)', sentence: '爸爸每天上班工作，為了______薪水照顧全家。' },
  // 第三課
  { id: 10, lesson: 3, word: '陡峭', jyutping: 'dau2-ciu3', english: 'steep', chinese: '山勢高而直', sentence: '這條山路非常______，大家走的時候要小心。' },
  { id: 11, lesson: 3, word: '攀', jyutping: 'paan1', english: 'to climb', chinese: '抓住東西向上爬', sentence: '這隻小貓咪身手靈巧，一下就______上了樹枝。' },
  { id: 12, lesson: 3, word: '抵達', jyutping: 'dai2-daat6', english: 'arrive', chinese: '到達', sentence: '我們搭乘港鐵，很快就______了迪士尼樂園。' },
  { id: 13, lesson: 3, word: '仰望', jyutping: 'joeng5-mong6', english: 'to look up', chinese: '抬頭向上看', sentence: '我抬起頭，______著天空上的美麗彩虹。' },
  { id: 14, lesson: 3, word: '獨特', jyutping: 'duk6-dak6', english: 'unique / special', chinese: '獨有、特別', sentence: '這頂帽子花紋很______，跟別人的完全不一樣。' },
  { id: 15, lesson: 3, word: '栩栩如生', jyutping: 'heoi2 heoi2 jyu4 saang1', english: 'lifelike / true to life', chinese: '形容生動逼真，像活的一樣', sentence: '這隻黏土做的小狗______，就像真的一樣可愛。' },
  // 第四課
  { id: 16, lesson: 4, word: '平坦', jyutping: 'ping4-taan2', english: 'flat / level', chinese: '沒有高低凹凸', sentence: '公園裡的草地很______，最適合跑跑跳跳。' },
  { id: 17, lesson: 4, word: '著名', jyutping: 'zyu3-ming4', english: 'famous', chinese: '有名、出名', sentence: '這家麵店非常______，每天都有很多人排隊。' },
  { id: 18, lesson: 4, word: '恬靜', jyutping: 'tim4-zing6', english: 'quiet and peaceful', chinese: '安靜、寧靜', sentence: '鄉下的夜晚十分______，聽不到車子的噪音。' },
  { id: 19, lesson: 4, word: '漸入眼簾', jyutping: 'zim6 jap6 ngaan5 lim4', english: 'gradually coming into view', chinese: '慢慢進入視線範圍', sentence: '纜車慢慢往上升，山下的風景______。' },
  // 第五課
  { id: 20, lesson: 5, word: '願望', jyutping: 'jyun6-mong6', english: 'wish / desire', chinese: '心裡的期盼', sentence: '我今年的生日______是考到好成績。' },
  { id: 21, lesson: 5, word: '英俊', jyutping: 'jing1-zeon3', english: 'handsome', chinese: '容貌俊秀、有精神', sentence: '哥哥穿上這件新衣服，看起來真______。' },
  { id: 22, lesson: 5, word: '身材', jyutping: 'san1-coi4', english: 'Body figure', chinese: '身體的高矮胖瘦', sentence: '那位籃球員高高大大，______非常高大。' },
  { id: 23, lesson: 5, word: '貪心', jyutping: 'taam1-sam1', english: 'greedy', chinese: '貪得無厭、不知足', sentence: '做人不可以太______，要懂得滿足。' },
  { id: 24, lesson: 5, word: '討論', jyutping: 'tou2 leon6', english: 'to discuss', chinese: '就某個問題交換意見', sentence: '分組時間到了，同學們圍在一起______題目。' },
];

const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-HK'; // 設定為粵語香港
    utterance.rate = 0.85; // 稍微放慢語速，適合小學生
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Browser does not support text to speech');
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const FlashcardView = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lessonWords = useMemo(() => wordData.filter(w => w.lesson === currentLesson), [currentLesson]);
  const currentWord = lessonWords[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % lessonWords.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + lessonWords.length) % lessonWords.length);
  };

  const changeLesson = (lessonNum) => {
    setCurrentLesson(lessonNum);
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      {/* 課節選擇 */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => changeLesson(num)}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${
              currentLesson === num 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-blue-600 hover:bg-blue-100 shadow-sm border border-blue-200'
            }`}
          >
            第 {num} 課
          </button>
        ))}
      </div>

      {/* 卡片本體 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full min-h-[350px] flex flex-col justify-center relative border-4 border-blue-50">
        <button 
          onClick={() => playAudio(currentWord.word)}
          className="absolute top-6 right-6 text-blue-400 hover:text-blue-600 transition-transform hover:scale-110 p-2 bg-blue-50 rounded-full"
          title="聆聽發音"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M10 19l-7-7m0 0l7-7m-7 7h18" className="hidden" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
          </svg>
        </button>

        <div className="text-center space-y-6">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-wider mb-2">{currentWord.word}</h2>
            <p className="text-xl md:text-2xl text-orange-500 font-mono bg-orange-50 inline-block px-4 py-1 rounded-lg">{currentWord.jyutping}</p>
          </div>
          
          <div className="w-full h-px bg-gray-200 my-4"></div>
          
          <div className="space-y-3">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">中文解釋</span>
              <p className="text-xl text-gray-700 font-medium">{currentWord.chinese}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">英文解釋 (English)</span>
              <p className="text-lg text-blue-600 font-medium">{currentWord.english}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 導航按鈕 */}
      <div className="flex justify-between items-center w-full mt-8 px-4">
        <button 
          onClick={handlePrev}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-bold shadow-md hover:bg-gray-50 transition-colors"
        >
          <span>&larr;</span> 上一個
        </button>
        <span className="text-gray-500 font-medium">
          {currentIndex + 1} / {lessonWords.length}
        </span>
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-bold shadow-md hover:bg-gray-50 transition-colors"
        >
          下一個 <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

const QuizView = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // 初始化題目
  useEffect(() => {
    const shuffledWords = shuffleArray(wordData);
    setQuestions(shuffledWords);
    generateOptions(shuffledWords[0]);
  }, []);

  const generateOptions = (correctWord) => {
    // 從其他單字中隨機挑選3個
    const otherWords = wordData.filter(w => w.id !== correctWord.id);
    const shuffledOthers = shuffleArray(otherWords);
    const distractors = shuffledOthers.slice(0, 3).map(w => w.word);
    
    // 加入正確答案並洗牌
    const allOptions = shuffleArray([...distractors, correctWord.word]);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleSelect = (option) => {
    if (selectedOption !== null) return; // 已作答不能再點
    setSelectedOption(option);
    
    const correct = option === questions[currentQIndex].word;
    setIsCorrect(correct);
    
    if (correct) {
      playAudio(option); // 答對時讀出該詞語
    } else {
      // 答錯可以發出提示音效等，這裡為了簡化暫時省略
    }
  };

  const nextQuestion = () => {
    const nextIdx = (currentQIndex + 1) % questions.length;
    setCurrentQIndex(nextIdx);
    generateOptions(questions[nextIdx]);
  };

  if (questions.length === 0) return <div>載入中...</div>;

  const currentQ = questions[currentQIndex];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full border-t-8 border-green-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">選詞填充</h2>
          <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
            第 {currentQIndex + 1} / {questions.length} 題
          </span>
        </div>
        
        {/* 題目句子 */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 min-h-[120px] flex items-center justify-center border border-gray-100 text-center shadow-inner">
          <p className="text-2xl text-gray-700 leading-relaxed font-medium">
            {currentQ.sentence.split('______').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className={`inline-block border-b-4 mx-2 min-w-[80px] text-center font-bold pb-1 transition-colors ${
                    selectedOption 
                      ? (isCorrect ? 'text-green-600 border-green-600' : 'text-red-500 border-red-500') 
                      : 'border-gray-400 text-transparent'
                  }`}>
                    {selectedOption ? selectedOption : '    '}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* 選項按鈕 */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((opt, idx) => {
            let btnClass = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200";
            if (selectedOption !== null) {
              if (opt === currentQ.word) {
                btnClass = "bg-green-500 border-green-500 text-white shadow-lg scale-105"; // 正確答案高亮
              } else if (opt === selectedOption && !isCorrect) {
                btnClass = "bg-red-500 border-red-500 text-white opacity-80"; // 選錯的答案
              } else {
                btnClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50 cursor-not-allowed"; // 其他選項變灰
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                disabled={selectedOption !== null}
                className={`py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* 結果與下一題 */}
        {selectedOption !== null && (
          <div className="mt-8 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '🎉 答對了！太棒了！' : `❌ 哎呀，答錯了。正確答案是「${currentQ.word}」`}
            </div>
            <button 
              onClick={nextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md transition-colors"
            >
              下一題
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('cards');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 font-sans pb-12">
      {/* 標題區塊 */}
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">香港潮商學校</h1>
            <h2 className="text-xl md:text-2xl font-bold text-gray-600">六年級中文科．第二次呈分試重點詞語</h2>
          </div>
          
          {/* 導航分頁 */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'cards' 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              📖 詞彙卡
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-green-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              ✏️ 選詞填充
            </button>
          </div>
        </div>
      </header>

      {/* 內容區塊 */}
      <main>
        {activeTab === 'cards' ? <FlashcardView /> : <QuizView />}
      </main>
    </div>
  );
};

export default App;