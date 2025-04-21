document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });
  
  function initializeApp() {
    setupInfoBox();
    setupImageZoom();
    setupNavigation();
  }
  
  
  function setupInfoBox() {
    const infoButton = document.getElementById('info-button');
    const infoBox = document.getElementById('info-box');
    
    if (infoButton && infoBox) {
      infoButton.addEventListener('click', function() {
        if (infoBox.style.display === 'none' || infoBox.style.display === '') {
          infoBox.style.display = 'block';
        } else {
          infoBox.style.display = 'none';
        }
      });
    }
  }
  
 
  function setupImageZoom() {
    const images = document.querySelectorAll('.diagram-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeButton = document.querySelector('.close-button');
    
    if (!modal || !modalImg || !closeButton) return;
    
    
    images.forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        modalCaption.textContent = this.alt;
      });
    });
    
    
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });
  }
  
  
  function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-nav]');
    const pages = document.querySelectorAll('[data-page]');
    
    if (navLinks.length === 0 || pages.length === 0) return;
    
    
    pages.forEach(page => {
      if (page.dataset.page !== 'home') {
        page.style.display = 'none';
      }
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.dataset.nav;
        
        
        pages.forEach(page => {
          page.style.display = 'none';
        });
        
        
        const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetElement) {
          targetElement.style.display = 'block';
          window.scrollTo(0, 0);
        }
      });
    });
  }
  
  
  function simulateLogin() {
    const usernameInput = document.getElementById('username');
    if (!usernameInput || !usernameInput.value.trim()) {
      alert('Por favor, digite um nome de usuário.');
      return;
    }
    
    const username = usernameInput.value.trim();
    
    
    sessionStorage.setItem('username', username);
    
    
    const userDisplayElements = document.querySelectorAll('.user-display');
    userDisplayElements.forEach(element => {
      element.textContent = username;
    });
    
 
    alert(`Bem-vindo, ${username}! Login simulado com sucesso.`);
    
   
    const homePage = document.querySelector('[data-page="home"]');
    const pages = document.querySelectorAll('[data-page]');
    
    pages.forEach(page => {
      page.style.display = 'none';
    });
    
    if (homePage) {
      homePage.style.display = 'block';
    }
  }