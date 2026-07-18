/**
 * Navigation Drawer Logic
 */
const menuToggle = document.getElementById('menu-toggle');
const closeDrawer = document.getElementById('close-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const navDrawer = document.getElementById('nav-drawer');

function toggleDrawer() {
    if (!navDrawer) return;
    const isOpen = navDrawer.classList.contains('is-open');
    if (!isOpen) {
        navDrawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    } else {
        navDrawer.classList.remove('is-open');
        document.body.style.overflow = 'auto';
    }
}

if (menuToggle) menuToggle.addEventListener('click', toggleDrawer);
if (closeDrawer) closeDrawer.addEventListener('click', toggleDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', toggleDrawer);

// Close drawer when clicking a link
if (navDrawer) {
    const drawerLinks = navDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            navDrawer.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        });
    });
}

/**
 * Product Gallery Thumbnail Logic
 */
const mainImg = document.getElementById('main-product-img');
const thumbs = document.querySelectorAll('.thumb');

function swapMainImg(btn, index) {
    if (!mainImg) return;
    thumbs.forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');

    const newSrc = btn.querySelector('img').src;

    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = '1';
    }, 300);
}

/**
 * Material Color Selection — cambia foto principal + las 4 miniaturas
 */
const colorButtons = document.querySelectorAll('.swatch');
const thumbImgs = [
    document.getElementById('thumb-img-0'),
    document.getElementById('thumb-img-1'),
    document.getElementById('thumb-img-2'),
    document.getElementById('thumb-img-3'),
];

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');

        const images = JSON.parse(btn.dataset.images || '[]');
        if (images.length < 4) return;

        // Actualiza las 4 miniaturas
        thumbImgs.forEach((img, i) => {
            if (img) img.src = images[i];
        });

        // La miniatura 1 pasa a ser también la imagen principal
        if (mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = images[0];
                mainImg.style.opacity = '1';
            }, 300);
        }

        // Reinicia el estado activo al primer thumbnail
        thumbs.forEach(t => t.classList.remove('is-active'));
        if (thumbs[0]) thumbs[0].classList.add('is-active');
    });
});

/**
 * Lightbox Logic
 */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.getElementById('close-lightbox');
const galleryImgs = document.querySelectorAll('#gallery img');

function openLightbox(index) {
    if (!lightbox) return;
    const clickedImg = galleryImgs[index];
    if (clickedImg && lightboxImg) {
        lightboxImg.src = clickedImg.src;
        lightboxImg.alt = clickedImg.alt;
    }
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = 'auto';
    });
}

/**
 * Global Key Listeners
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (lightbox) lightbox.classList.remove('is-open');
        if (navDrawer) navDrawer.classList.remove('is-open');
        document.body.style.overflow = 'auto';
    }
});

/**
 * Expandir/colapsar texto de beneficios (solo mobile)
 */
function toggleGalleryDesc() {
    const desc = document.getElementById('gallery-desc');
    const toggle = document.getElementById('gallery-toggle');
    if (!desc || !toggle) return;
    const expanded = desc.classList.toggle('is-expanded');
    toggle.textContent = expanded ? 'Leer menos' : 'Leer más';
}

/**
 * Scroll Reveal Intersection Observer
 */
const revealElements = document.querySelectorAll('.reveal-hidden');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
