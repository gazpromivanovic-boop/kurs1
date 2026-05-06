(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('themeToggle');
  
  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
  
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  
  if (ham && mob) {
    ham.addEventListener('click', function() {
      mob.classList.toggle('open');
    });
    const links = mob.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        mob.classList.remove('open');
      });
    }
  }
});

window.toggleCard = function(id) {
  const card = document.getElementById(id);
  const body = document.getElementById(id + '-body');
  if (!card || !body) return;
  
  const isOpen = card.classList.contains('open');
  
  const allCards = document.querySelectorAll('.expand-card');
  for (let i = 0; i < allCards.length; i++) {
    const c = allCards[i];
    c.classList.remove('open');
    const b = document.getElementById(c.id + '-body');
    if (b) b.style.maxHeight = '0';
  }
  
  if (!isOpen) {
    card.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
};

window.loadVideo = function(el, videoId) {
  const wrap = el.parentElement;
  if (wrap) {
    wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  }
};

function toggleCard(cardId) {
  const card = document.getElementById(cardId);
  const body = document.getElementById(cardId + '-body');
  const isOpen = card.classList.contains('open');
  
  // Останавливаем все видео внутри закрывающейся карточки
  if (isOpen) {
    const videos = card.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  }
  
  card.classList.toggle('open');
  
  if (body.style.maxHeight) {
    body.style.maxHeight = null;
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

function initVideoManager() {
  const expandCards = document.querySelectorAll('.expand-card');
  expandCards.forEach(card => {
    const header = card.querySelector('.expand-header');
    const originalOnclick = header.getAttribute('onclick');
    
    header.setAttribute('data-original', originalOnclick);
    header.onclick = () => {
      // Останавливаем видео во всех открытых карточках
      document.querySelectorAll('.expand-card.open').forEach(openCard => {
        if (openCard.id !== card.id) {
          const videos = openCard.querySelectorAll('video');
          videos.forEach(video => {
            video.pause();
          });
        }
      });
      
      // Вызываем оригинальную функцию
      if (originalOnclick) {
        eval(originalOnclick);
      }
    };
  });
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', initVideoManager);