//modal

const fireBtn = document.querySelector('.fire-action-btn');
    const modal = document.getElementById('recruiter-modal');
    const closeModal = document.querySelector('.recruiter-modal-close');
    fireBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
    });
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

//finish-modal    

// Menu mobile responsivo
const menuBtn = document.querySelector('.menu-mobile-btn');
const menuMobile = document.getElementById('menuMobile');
const menuClose = document.querySelector('.menu-mobile-close');

if (menuBtn && menuMobile && menuClose) {
    menuBtn.addEventListener('click', () => {
        menuMobile.classList.add('open');
    });
    menuClose.addEventListener('click', () => {
        menuMobile.classList.remove('open');
    });
    // Fechar ao clicar em um link
    menuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.classList.remove('open');
        });
    });
}    