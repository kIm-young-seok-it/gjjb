// tools 목록: 필요 시 여기만 수정하면 됩니다.
const tools = [
  {
    title: "가정통신문 번역기",
    desc: "원문 틀 유지 → 영어 · 베트남어 · 러시아어 번역 (Streamlit)",
    url: "https://school-notice-translator-nscnskwkygrcekpfbsgdfy.streamlit.app/"
  },
  {
    title: "학생기록 AI",
    desc: "과목별 특징에 맞춘 세부능력 작성 보조 (참고용)",
    url: "https://school-record-ai.onrender.com/"
  },
  {
    title: "수업교체 프로그램",
    desc: "맞교환 · 보강 · 3자교환 교사 탐색 (GAS)",
    url: "https://script.google.com/macros/s/AKfycbxfX1fS1k0XMx3SAwdWbl2QWkAh9Pw9sy6e-eqjvpOWzXAMXFnlXyODuclPsFgK00yaEw/exec"
  },
  {
    title: "자소서 검증",
    desc: "오타 · 글자수 · AI작성 감지 (참고용)",
    url: "https://text-checker-1.onrender.com/"
  }
];

const cards = document.getElementById('cards');
const panel = document.getElementById('panel');
const panelFrame = document.getElementById('panelFrame');
const panelTitle = document.getElementById('panelTitle');
const closePanelBtn = document.getElementById('closePanel');
const openNewTabBtn = document.getElementById('openNewTab');

function makeCard(t){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `<h3>${t.title}</h3><p>${t.desc}</p>
  <div class="buttons">
    <button class="btn open-portal">Open in Portal</button>
    <button class="btn open-tab">Open in New Tab</button>
  </div>`;
  const [portalBtn, newTabBtn] = el.querySelectorAll('button');
  portalBtn.addEventListener('click', ()=> openInPanel(t));
  newTabBtn.addEventListener('click', ()=> window.open(t.url,'_blank'));
  return el;
}

function openInPanel(tool){
  panel.style.display = 'block';
  panelTitle.textContent = tool.title;
  panelFrame.src = tool.url;
  openNewTabBtn.onclick = ()=> window.open(tool.url,'_blank');

  setTimeout(()=> {
    try {
      const doc = panelFrame.contentDocument;
      if(!doc || doc.documentElement.innerHTML.trim().length === 0){
        panelTitle.textContent = tool.title + " — (임베드 불가: 새 탭 사용)";
      }
    } catch(e) {
      panelTitle.textContent = tool.title + " — (임베드 차단 가능: 새 탭 사용)";
    }
  },900);
}

closePanelBtn.addEventListener('click', ()=> {
  panelFrame.src = '';
  panel.style.display = 'none';
  panelTitle.textContent = '미리보기';
});

tools.forEach(t => cards.appendChild(makeCard(t)));
