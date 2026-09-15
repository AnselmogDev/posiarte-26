const eras = [
  {
    year: "1950–1980",
    label: "Regras fixas",
    title: "Sistemas baseados em regras",
    color: "var(--era1)",
    desc: "As primeiras IAs não aprendiam nada sozinhas: um programador escrevia manualmente milhares de regras do tipo 'se isso, então aquilo'. A máquina era rápida, mas só sabia responder ao que já tinha sido previsto.",
    facts: [
      "<b>1950</b> — Alan Turing propõe o \"Teste de Turing\" para avaliar se uma máquina pode parecer humana.",
      "<b>1956</b> — Conferência de Dartmouth cunha o termo \"Inteligência Artificial\".",
      "<b>Sistemas especialistas</b> — programas como o MYCIN (anos 70) diagnosticavam infecções usando centenas de regras médicas escritas à mão.",
      "<b>Limite:</b> qualquer situação fora das regras previstas simplesmente quebrava o sistema."
    ]
  },
  {
    year: "1990–2010",
    label: "Machine Learning",
    title: "Aprendizado de máquina",
    color: "var(--era2)",
    desc: "Em vez de programar regras, os cientistas passaram a alimentar os computadores com dados e deixá-los encontrar padrões sozinhos. A IA passa a 'aprender com exemplos' em vez de seguir instruções fixas.",
    facts: [
      "<b>Árvores de decisão, SVMs, redes bayesianas</b> viram ferramentas comuns em bancos, e-mail (filtro de spam) e buscadores.",
      "<b>1997</b> — Deep Blue (IBM) vence o campeão mundial de xadrez Garry Kasparov usando busca e avaliação, não aprendizado profundo.",
      "<b>2006</b> — Netflix lança um prêmio de US$1 milhão para quem melhorasse seu algoritmo de recomendação, popularizando ML aplicado.",
      "<b>Limite:</b> ainda dependia de humanos escolherem manualmente quais 'características' dos dados eram importantes."
    ]
  },
  {
    year: "2010s",
    label: "Deep Learning",
    title: "Deep Learning e redes neurais",
    color: "var(--era3)",
    desc: "Redes neurais artificiais com muitas camadas passam a aprender diretamente dos dados brutos — pixels, sons, texto — sem que humanos precisem indicar o que observar. A explosão de dados e o poder de processamento das GPUs tornaram isso possível.",
    facts: [
      "<b>2012</b> — AlexNet vence a competição ImageNet por larga margem, provando que redes neurais profundas superam métodos tradicionais em visão computacional.",
      "<b>2014</b> — Redes Generativas Adversárias (GANs) permitem que a IA crie imagens realistas do zero.",
      "<b>2016</b> — AlphaGo (DeepMind) derrota o campeão mundial de Go, jogo considerado bem mais complexo que xadrez.",
      "<b>2017</b> — Artigo \"Attention Is All You Need\" introduz a arquitetura Transformer, base de tudo que viria depois."
    ]
  },
  {
    year: "2020s",
    label: "IA Generativa",
    title: "Modelos generativos e de linguagem",
    color: "var(--era4)",
    desc: "Modelos gigantes, treinados com uma fração significativa de todo o texto e imagem disponível na internet, passam a gerar texto, código, imagens e voz com qualidade próxima à humana — e a conversar diretamente com as pessoas.",
    facts: [
      "<b>2022</b> — ChatGPT (OpenAI) chega a 100 milhões de usuários em dois meses, popularizando IA generativa em massa.",
      "<b>Modelos como Claude (Anthropic), Gemini (Google) e outros</b> passam a raciocinar em etapas, usar ferramentas e processar texto, imagem e áudio ao mesmo tempo.",
      "<b>IA passa a programar, desenhar, compor música e ajudar em pesquisa científica</b> — deixando de ser só um assistente de tarefas simples.",
      "<b>Debate atual:</b> uso ético, vieses nos dados de treino, impacto no mercado de trabalho e regulamentação."
    ]
  },
  {
    year: "2050",
    label: "Projeção",
    title: "IA em 2050 — o que é ciência, o que é especulação",
    color: "var(--era5)",
    desc: "Ninguém sabe o futuro com certeza — mas cientistas e pesquisadores discutem cenários plausíveis com base nas tendências atuais. Aqui a ideia é separar o que é extrapolação razoável do que ainda é ficção científica.",
    facts: [
      "<b>Plausível:</b> IA integrada a diagnósticos médicos, descoberta de novos medicamentos e design de materiais em escala muito maior que hoje.",
      "<b>Em debate:</b> \"IA Geral\" (AGI) — sistemas que igualariam a inteligência humana em qualquer tarefa. Especialistas discordam sobre se e quando isso aconteceria.",
      "<b>Incerto:</b> interfaces cérebro-computador integradas ao raciocínio cotidiano das pessoas.",
      "<b>Questão central para 2050:</b> como equilibrar avanço tecnológico com segurança, privacidade e controle humano sobre sistemas cada vez mais capazes."
    ]
  }
];

let current = 0;
const track = document.getElementById('track');
const trackFill = document.getElementById('trackFill');
const panel = document.getElementById('panel');


eras.forEach((era, i) => {
  const btn = document.createElement('button');
  btn.className = 'node';
  btn.style.setProperty('--dot-color', era.color);
  btn.innerHTML = `<span class="lbl">${era.label}</span><span class="dot"></span><span class="yr">${era.year.split('–')[0]}</span>`;
  btn.addEventListener('click', () => setEra(i));
  track.appendChild(btn);
});

const nodeEls = document.querySelectorAll('.node');

function setEra(i){
  current = i;
  const era = eras[i];

  nodeEls.forEach((n, idx) => n.classList.toggle('active', idx === i));
  trackFill.style.width = (i / (eras.length - 1) * 100) + '%';

  panel.style.setProperty('--dot-color', era.color);
  panel.style.opacity = 0;
  setTimeout(() => {
    document.getElementById('panelEra').textContent = 'ERA 0' + (i+1) + ' / 0' + eras.length;
    document.getElementById('panelTitle').textContent = era.title;
    document.getElementById('panelDesc').textContent = era.desc;
    document.getElementById('panelYears').textContent = era.year;
    const factsList = document.getElementById('panelFacts');
    factsList.innerHTML = '';
    era.facts.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = f;
      factsList.appendChild(li);
    });
    panel.style.opacity = 1;
  }, 150);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  setEra((current - 1 + eras.length) % eras.length);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  setEra((current + 1) % eras.length);
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight') setEra((current + 1) % eras.length);
  if(e.key === 'ArrowLeft') setEra((current - 1 + eras.length) % eras.length);
});

setEra(0);
