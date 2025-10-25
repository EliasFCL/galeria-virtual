// --- Mostrar y ocultar galerías ---
const categoriesSection = document.querySelector('.categories');
const categories = document.querySelectorAll('.category');
const galleries = document.querySelectorAll('.gallery-section');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close');
const resetZoomBtn = document.getElementById('resetZoom');

categories.forEach(category => {
    category.addEventListener('click', () => {
        const target = category.getAttribute('data-gallery');
        categoriesSection.style.display = 'none';
        document.getElementById(target).style.display = 'block';
    });
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        galleries.forEach(g => g.style.display = 'none');
        categoriesSection.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- Ampliar imagen ---
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        modalImg.style.transform = `scale(${currentScale}) translate(0px, 0px)`;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar al hacer clic fuera
window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

// --- Zoom y movimiento ---
let currentScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

modalImg.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    if (e.deltaY < 0) currentScale += zoomIntensity;
    else currentScale = Math.max(1, currentScale - zoomIntensity);
    modalImg.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
});

// --- Arrastrar imagen cuando hay zoom ---
modalImg.addEventListener('mousedown', e => {
    if (currentScale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImg.style.cursor = 'grabbing';
    }
});

window.addEventListener('mousemove', e => {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        modalImg.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    modalImg.style.cursor = 'grab';
});

// --- Botón Reestablecer Zoom ---
resetZoomBtn.addEventListener('click', () => {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    modalImg.style.transform = `scale(1) translate(0px, 0px)`;
});