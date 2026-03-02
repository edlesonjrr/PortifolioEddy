let allCerts = [];
let currentCategory = 'all';
let observer = null;

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('certs-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('cert-modal');
    const modalClose = document.querySelector('.modal-close');

    try {
        const response = await fetch('certificados/certificados.json');
        allCerts = await response.json();

        allCerts.sort((a, b) => new Date(b.date) - new Date(a.date));

        updateStats();
        renderCerts(allCerts);
        initScrollReveal();

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                filterCerts(currentCategory);
            });
        });

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

    } catch (error) {
        container.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Erro ao carregar certificados.</p>';
        console.error('Erro:', error);
    }
});

function updateStats() {
    const totalCerts = allCerts.length;
    const totalHours = allCerts.reduce((sum, cert) => sum + (cert.hours || 0), 0);
    const categories = [...new Set(allCerts.map(cert => cert.category))].length;

    animateNumber('total-certs', totalCerts);
    animateNumber('total-hours', totalHours, 'h');
    animateNumber('total-categories', categories);
}

function animateNumber(id, target, suffix = '') {
    const element = document.getElementById(id);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
}

function filterCerts(category) {
    const filtered = category === 'all'
        ? allCerts
        : allCerts.filter(cert => cert.category === category);

    renderCerts(filtered);
}

function renderCerts(certs) {
    const container = document.getElementById('certs-container');
    container.innerHTML = '';

    certs.forEach((cert, index) => {
        const card = createCertCard(cert, index);
        container.appendChild(card);
    });

    initScrollReveal();
}

function createCertCard(cert, index) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.setAttribute('data-reveal', 'true');
    card.onclick = () => openModal(cert);

    card.innerHTML = `
    <div class="cert-image" data-bg="${cert.image}">
      <div class="skeleton-loader"></div>
      <span class="cert-badge">${cert.category}</span>
    </div>
    <div class="cert-content">
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-institution"><i class="bi bi-building"></i> ${cert.institution}</p>
      <div class="cert-meta">
        <span class="cert-date"><i class="bi bi-calendar3"></i> ${formatDate(cert.date)}</span>
        ${cert.hours ? `<span class="cert-hours"><i class="bi bi-clock"></i> ${cert.hours}h</span>` : ''}
      </div>
    </div>
  `;

    return card;
}

function openModal(cert) {
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('modal-image');

    modalImage.src = cert.image;
    document.getElementById('modal-title').textContent = cert.title;
    document.getElementById('modal-institution').innerHTML = `<i class="bi bi-building"></i> ${cert.institution}`;
    document.getElementById('modal-date').innerHTML = `<i class="bi bi-calendar3"></i> Concluído em ${formatDate(cert.date)}`;
    document.getElementById('modal-hours').innerHTML = cert.hours
        ? `<i class="bi bi-clock"></i> Carga horária: ${cert.hours} horas`
        : '';

    const verifyBtn = document.getElementById('modal-verify');
    if (cert.verifyUrl) {
        verifyBtn.href = cert.verifyUrl;
        verifyBtn.style.display = 'inline-flex';
    } else {
        verifyBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initScrollReveal() {
    if (observer) {
        observer.disconnect();
    }

    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    const imageContainer = entry.target.querySelector('.cert-image');
                    const bgUrl = imageContainer.getAttribute('data-bg');

                    const img = new Image();
                    img.onload = () => {
                        imageContainer.style.backgroundImage = `url('${bgUrl}')`;
                        imageContainer.querySelector('.skeleton-loader').style.opacity = '0';
                        setTimeout(() => {
                            imageContainer.querySelector('.skeleton-loader').style.display = 'none';
                        }, 300);
                    };
                    img.src = bgUrl;

                    observer.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, options);

    document.querySelectorAll('.cert-card[data-reveal]').forEach(card => {
        observer.observe(card);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});