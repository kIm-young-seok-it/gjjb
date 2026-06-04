// tools 리스트: 각 도구의 경로는 레포지토리 내 상대 경로로 수정하세요.
const tools = [
  {
    id: 'notice',
    title: 'Notice Translator',
    desc: '공지사항 자동 번역 및 포맷 변환 도구',
    path: 'tools/notice-translator/index.html'
  },
  {
    id: 'record-ai',
    title: 'Record AI',
    desc: '수업·행사 기록 자동 요약 및 태깅',
    path: 'tools/record-ai/index.html'
  },
  {
    id: 'class-replace',
    title: 'Class Replacement',
    desc: '대체 수업 관리 및 대체요청 처리',
    path: 'tools/class-replacement/index.html'
  },
  {
    id: 'statement',
    title: 'Statement Checker',
    desc: '증명서/사유서 자동 검토 및 템플릿 생성',
    path: 'tools/statement-checker/index.html'
  }
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
  tools.forEach(tool => {
    toolsContainer.appendChild(createCard(tool));
  });
}

// 미리보기 열기
function openPreview(tool){
  previewFrame.src = tool.path;
  panelTitle.textContent = tool.title;
  panelSub.textContent = `열기: ${tool.path}`;
  previewPanel.hidden = false;
  previewPanel.setAttribute('aria-hidden', 'false');
  // 버튼 "새 탭"의 동작을 해당 도구로 변경
  openNewTabBtn.onclick = () => window.open(tool.path, '_blank', 'noopener');
  // 포커스 관리
  closePanelBtn.focus();
}

// 미리보기 닫기
function closePreview(){
  previewFrame.src = '';
  previewPanel.hidden = true;
  previewPanel.setAttribute('aria-hidden', 'true');
}

// 이벤트 바인딩
closePanelBtn.addEventListener('click', closePreview);

// 단축키: ESC로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewPanel.getAttribute('aria-hidden') === 'false') {
    closePreview();
  }
});

// init
renderCards();
