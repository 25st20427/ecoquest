// Do not install a production cache in local development or the editor preview.
if ('serviceWorker' in navigator && location.hostname === '25st20427.github.io') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      document.getElementById('storageLabel').textContent = '기록은 자동 저장돼요 · 오프라인 준비는 다음 접속 때 다시 시도해요';
    });
  });
}
