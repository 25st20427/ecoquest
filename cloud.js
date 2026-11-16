// The supplied HTML references cloud.js but no account service was supplied.
// Keep all existing local gameplay and make that boundary visible.
document.getElementById('cloudLogin').textContent = '기기 내 저장';
document.getElementById('cloudStatus').textContent = '이 브라우저에 자동 저장해요 · 다른 기기와 자동 공유되지 않아요';
document.querySelector('#ranking .notice').textContent = '내 기록과 가상 기록을 비교하는 로컬 랭킹이에요. 실제 이용자 간 온라인 랭킹은 연결되어 있지 않아요.';
const skip = document.createElement('a');
skip.className = 'skip-link';
skip.href = '#mainContent';
skip.textContent = '본문 바로가기';
document.body.prepend(skip);
document.querySelector('main').id = 'mainContent';
document.querySelector('main').tabIndex = -1;
