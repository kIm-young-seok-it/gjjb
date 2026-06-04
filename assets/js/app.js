// 간단한 도구 카드 렌더러 (실제 도구 링크/iframe 주소는 여기에 연결)
const tools = [
  { id: 'notice', title: 'Notice Translator', desc: '공지 번역 도구', url: 'tools/notice-translator/index.html' },
  { id: 'record', title: 'Record AI', desc: '출결/기록 자동화', url: 'tools/record-ai/index.html' },
  { id: 'replace', title: 'Class Replacement', desc: '대체수업 관리', url: 'tools/class-replacement/index.html' },
  { id: 'statement', title: 'Statement Checker', desc: '진술서 검토 도구', url: 'tools/statement-checker/index.html' },
];

function createCard(tool){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<h3>${tool.title}</h3><p>${tool.desc}</p>`;
  const btn = document.createElement('button');
  btn.textContent = 'Open Preview';
  btn.className = 'btn ghost';
  btn.onclick = () => openPreview(tool);
  div.appendChild(btn);
  return div;
}

function openPreview(tool){
  const panel = document.getElementById('previewPanel');
  const iframe = document.getElementById('previewFrame');
  document.getElementById('panelTitle').textContent = tool.title;
  iframe.src = tool.url;
  panel.hidden = false; panel.setAttribute('aria-hidden','false');
}

function closePreview(){
  const panel = document.getElementById('previewPanel');
  const iframe = document.getElementById('previewFrame');
  iframe.src = '';
  panel.hidden = true; panel.setAttribute('aria-hidden','true');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('tools');
  tools.forEach(t => grid.appendChild(createCard(t)));

  document.getElementById('closePanel').addEventListener('click', closePreview);
  document.getElementById('openNewTab').addEventListener('click', ()=>{
    const iframe = document.getElementById('previewFrame');
    if(iframe.src) window.open(iframe.src,'_blank','noopener');
  });
});
