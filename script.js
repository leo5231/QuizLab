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