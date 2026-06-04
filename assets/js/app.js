const tools = [
  { id: 'notice', title: 'Notice Translator', desc: '공지사항 자동 번역', path: 'tools/notice-translator/index.html' },
  { id: 'record-ai', title: 'Record AI', desc: '수업·행사 기록 요약', path: 'tools/record-ai/index.html' },
  { id: 'class-replace', title: 'Class Replacement', desc: '대체 수업 관리', path: 'tools/class-replacement/index.html' },
  { id: 'statement', title: 'Statement Checker', desc: '증명서/사유서 검토', path: 'tools/statement-checker/index.html' }
];

const toolsContainer = document.getElementById('tools');
const previewPanel = document.getElementById('previewPanel');
const previewFrame = document.getElementById('previewFrame');
const panelTitle = document.getElementById('panelTitle');
const panelSub = document.getElementById('panelSub');
const closePanelBtn = document.getElementById('closePanel');
const openNewTabBtn = document.getElementById('openNewTab');

function createCard(tool){
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');

  const h3 = document.createElement('h3');
  h3.textContent = tool.title;

  const p = document.createElement('p');
  p.textContent = tool.desc;

  const btnWrap = document.createElement('div');
  btnWrap.className = 'buttons';

  const openBtn = document.createElement('button');
  openBtn.className = 'btn open-portal';
  openBtn.type = 'button';
  openBtn.textContent = '포털 열기 (미리보기)';
  openBtn.addEventListener('click', () => openPreview(tool));

  const tabBtn = document.createElement('button');
  tabBtn.className = 'btn open-tab';
  tabBtn.type = 'button';
  tabBtn.textContent = '새 탭에서 열기';
  tabBtn.addEventListener('click', () => window.open(tool.path, '_blank', 'noopener'));

  btnWrap.appendChild(openBtn);
  btnWrap.appendChild(tabBtn);

  card.appendChild(h3);
  card.appendChild(p);
  card.appendChild(btnWrap);

  return card;
}

function renderCards(){
  tools.forEach(tool => toolsContainer.appendChild(createCard(tool)));
}

function openPreview(tool){
  previewFrame.src = tool.path;
  panelTitle.textContent = tool.title;
  panelSub.textContent = `열기: ${tool.path}`;
  previewPanel.hidden = false;
  previewPanel.setAttribute('aria-hidden', 'false');
  openNewTabBtn.onclick = () => window.open(tool.path, '_blank', 'noopener');
  closePanelBtn.focus();
}

function closePreview(){
  previewFrame.src = '';
  previewPanel.hidden = true;
  previewPanel.setAttribute('aria-hidden', 'true');
}

closePanelBtn.addEventListener('click', closePreview);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewPanel.getAttribute('aria-hidden') === 'false') {
    closePreview();
  }
});

renderCards();
