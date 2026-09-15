const quizQuestions = [
  {
    q: "Em que ano ocorreu a Conferência de Dartmouth, que cunhou o termo \"Inteligência Artificial\"?",
    options: ["1946", "1956", "1969", "1980"],
    correct: "1956"
  },
  {
    q: "Quem propôs o \"Teste de Turing\" para avaliar se uma máquina pode parecer humana?",
    options: ["Alan Turing", "John McCarthy", "Geoffrey Hinton", "Alan Kay"],
    correct: "Alan Turing"
  },
  {
    q: "O que caracterizava os sistemas de IA baseados em regras (1950–1980)?",
    options: [
      "Aprendiam sozinhos a partir de dados",
      "Seguiam regras 'se isso, então aquilo' escritas por humanos",
      "Usavam redes neurais profundas",
      "Geravam imagens realistas"
    ],
    correct: "Seguiam regras 'se isso, então aquilo' escritas por humanos"
  },
  {
    q: "Qual evento de 1997 marcou a vitória de uma IA sobre o campeão mundial de xadrez?",
    options: ["AlphaGo vence Lee Sedol", "Deep Blue vence Garry Kasparov", "Watson vence no Jeopardy", "AlexNet vence o ImageNet"],
    correct: "Deep Blue vence Garry Kasparov"
  },
  {
    q: "O que a vitória da AlexNet no ImageNet, em 2012, ajudou a provar?",
    options: [
      "Que sistemas de regras eram melhores que redes neurais",
      "Que redes neurais profundas superam métodos tradicionais em visão computacional",
      "Que a IA já superava humanos em qualquer tarefa",
      "Que GANs eram capazes de gerar texto"
    ],
    correct: "Que redes neurais profundas superam métodos tradicionais em visão computacional"
  },
  {
    q: "Qual arquitetura, apresentada em 2017 no artigo \"Attention Is All You Need\", é a base dos modelos de IA generativa atuais?",
    options: ["GAN", "Árvore de decisão", "Transformer", "Sistema especialista"],
    correct: "Transformer"
  },
  {
    q: "Em 2022, qual IA generativa alcançou 100 milhões de usuários em apenas dois meses?",
    options: ["AlphaGo", "ChatGPT", "Deep Blue", "MYCIN"],
    correct: "ChatGPT"
  },
  {
    q: "Para que servem as GANs (Redes Generativas Adversárias)?",
    options: [
      "Para jogar xadrez",
      "Para diagnosticar doenças por regras fixas",
      "Para gerar imagens realistas a partir do zero",
      "Para filtrar spam em e-mails"
    ],
    correct: "Para gerar imagens realistas a partir do zero"
  },
  {
    q: "Em qual período o Machine Learning se popularizou, substituindo a era das regras fixas?",
    options: ["1950–1980", "1990–2010", "2010s", "2020s"],
    correct: "1990–2010"
  },
  {
    q: "O que significa a sigla AGI, discutida nas projeções para 2050?",
    options: [
      "Aprendizado Geral por Imitação",
      "Inteligência Artificial Geral",
      "Algoritmo Genético Inteligente",
      "Análise Gráfica Interativa"
    ],
    correct: "Inteligência Artificial Geral"
  },
  {
    q: "Qual foi um exemplo de sistema especialista dos anos 70, usado para diagnósticos médicos?",
    options: ["MYCIN", "ChatGPT", "AlphaGo", "AlexNet"],
    correct: "MYCIN"
  },
  {
    q: "O que a vitória do AlphaGo sobre o campeão mundial de Go, em 2016, demonstrou?",
    options: [
      "Que Go é mais simples que xadrez",
      "Que a IA já tinha alcançado a Inteligência Artificial Geral",
      "Que a IA conseguia lidar com um jogo consideravelmente mais complexo que o xadrez",
      "Que sistemas baseados em regras ainda eram superiores"
    ],
    correct: "Que a IA conseguia lidar com um jogo consideravelmente mais complexo que o xadrez"
  }
];

function shuffle(array){
  const arr = array.slice();
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let quizOrder = [];  
let quizIndex = 0;
let quizScore = 0;

const openQuizBtn = document.getElementById('openQuizBtn');
const backToTimelineBtn = document.getElementById('backToTimelineBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const quizSection = document.getElementById('quizSection');
const trackWrap = document.querySelector('.track-wrap');
const timelinePanel = document.getElementById('panel');

const quizQuestionScreen = document.getElementById('quizQuestionScreen');
const quizScoreScreen = document.getElementById('quizScoreScreen');
const quizCounter = document.getElementById('quizCounter');
const quizQuestionEl = document.getElementById('quizQuestion');
const quizOptionsEl = document.getElementById('quizOptions');
const quizProgressFill = document.getElementById('quizProgressFill');
const quizScoreTitle = document.getElementById('quizScoreTitle');
const quizScoreMsg = document.getElementById('quizScoreMsg');

function startQuiz(){
  quizOrder = shuffle(quizQuestions);      
  quizIndex = 0;
  quizScore = 0;
  quizScoreScreen.classList.add('hidden');
  quizQuestionScreen.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  const current = quizOrder[quizIndex];
  quizCounter.textContent = `PERGUNTA ${quizIndex + 1} / ${quizOrder.length}`;
  quizProgressFill.style.width = (quizIndex / quizOrder.length * 100) + '%';
  quizQuestionEl.textContent = current.q;

 
  const shuffledOptions = shuffle(current.options);

  quizOptionsEl.innerHTML = '';
  shuffledOptions.forEach(optionText => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = optionText;
    btn.addEventListener('click', () => selectAnswer(btn, optionText, current.correct));
    quizOptionsEl.appendChild(btn);
  });
}

function selectAnswer(btn, chosen, correct){
  const allButtons = quizOptionsEl.querySelectorAll('.quiz-option');
  allButtons.forEach(b => {
    b.disabled = true;
    if(b.textContent === correct) b.classList.add('correct');
  });
  if(chosen !== correct){
    btn.classList.add('wrong');
  } else {
    quizScore++;
  }

  setTimeout(() => {
    quizIndex++;
    if(quizIndex < quizOrder.length){
      renderQuestion();
    } else {
      showScore();
    }
  }, 900);
}

function showScore(){
  quizProgressFill.style.width = '100%';
  quizQuestionScreen.classList.add('hidden');
  quizScoreScreen.classList.remove('hidden');
  quizScoreTitle.textContent = `Você acertou ${quizScore} de ${quizOrder.length}`;

  const pct = quizScore / quizOrder.length;
  let msg = '';
  if(pct === 1) msg = 'Perfeito! Você dominou a evolução da IA. 🎉';
  else if(pct >= 0.7) msg = 'Muito bom! Você entendeu bem os principais marcos.';
  else if(pct >= 0.4) msg = 'Bom começo — vale revisar algumas eras da linha do tempo.';
  else msg = 'Dá uma nova olhada na linha do tempo e tente de novo!';
  quizScoreMsg.textContent = msg;
}

openQuizBtn.addEventListener('click', () => {
  trackWrap.classList.add('hidden');
  timelinePanel.classList.add('hidden');
  openQuizBtn.classList.add('hidden');
  quizSection.classList.remove('hidden');
  startQuiz();
});

backToTimelineBtn.addEventListener('click', () => {
  quizSection.classList.add('hidden');
  trackWrap.classList.remove('hidden');
  timelinePanel.classList.remove('hidden');
  openQuizBtn.classList.remove('hidden');
});

restartQuizBtn.addEventListener('click', startQuiz);
