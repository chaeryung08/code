// minimap.js: 미니맵 클릭 시 모달을 열고 닫는 동작을 구현합니다.
// 문서가 모두 로드된 뒤 실행되도록 defer로 불러오는 것을 권장합니다.

(function () { // 즉시실행함수로 전역 변수 오염을 막음
  // DOM 요소들 가져오기
  const minimap = document.getElementById('school-minimap'); // 왼쪽 상단의 작은 미니맵 컨테이너
  const smallIframe = document.getElementById('minimap-small'); // 작은 미니맵 iframe
  const modal = document.getElementById('minimap-modal'); // 모달 전체 래퍼
  const largeIframe = document.getElementById('minimap-large'); // 모달 안의 큰 iframe
  const closeButtons = modal.querySelectorAll('[data-action="close"]'); // 닫기 동작을 하는 버튼/배경 요소들

  // 미니맵 클릭 또는 키보드(Enter/Space)로 열기 처리
  function openModal() { // 모달을 여는 함수
    const src = smallIframe.getAttribute('src'); // 작은 iframe의 src를 가져옴
    if (!src) return; // src가 없으면 아무 동작 안 함
    largeIframe.setAttribute('src', src); // 큰 iframe에 src 설정 (여기서 실제 로드가 발생)
    modal.classList.remove('minimap-hidden'); // 모달을 보이게 함
    // 포커스 관리: 닫기 버튼에 포커스를 주어 키보드 접근성 개선
    const firstClose = modal.querySelector('.minimap-close');
    if (firstClose) firstClose.focus();
    // body 스크롤 잠금 (선택적)
    document.body.style.overflow = 'hidden';
  }

  // 모달 닫기 처리
  function closeModal() { // 모달을 닫는 함수
    modal.classList.add('minimap-hidden'); // 모달 숨김
    // 큰 iframe의 src를 비워서 재로딩 방지 및 리소스 해제(선택적)
    largeIframe.setAttribute('src', '');
    // 스크롤 잠금 해제
    document.body.style.overflow = '';
    // 미니맵에 다시 포커스
    minimap.focus();
  }

  // 미니맵 클릭 이벤트 연결
  if (minimap) { // 요소가 존재할 때만 이벤트 연결
    minimap.addEventListener('click', function (e) { // 클릭으로 열기
      e.preventDefault(); // 기본 동작 방지(안전)
      openModal(); // 모달 열기 호출
    });
    minimap.addEventListener('keydown', function (e) { // 키보드 접근성 처리(Enter, Space)
      if (e.key === 'Enter' || e.key === ' ') { // Enter 또는 Space 키일 때
        e.preventDefault();
        openModal();
      }
    });
  }

  // 닫기 요소들에 클릭 이벤트 연결 (배경/닫기 버튼)
  closeButtons.forEach(function (btn) { // 모든 닫기 액션에 대해
    btn.addEventListener('click', function (e) { // 클릭 시 모달 닫기
      e.preventDefault();
      closeModal();
    });
  });

  // 키보드로 ESC 누르면 모달 닫기
  document.addEventListener('keydown', function (e) { // 전역 키 이벤트
    if (!modal.classList.contains('minimap-hidden') && e.key === 'Escape') { // 모달 열려있고 ESC면
      closeModal();
    }
  });

  // 모달 배경 클릭으로 닫기: 이미 data-action="close"로 처리된 요소에 이벤트 연결되어 있음
  // (추가 보완 불필요한 경우 생략 가능)

})(); // 즉시실행함수 끝
