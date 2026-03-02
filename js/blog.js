let allPosts = [];
let currentCategory = 'all';
let observer = null;

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('posts-container');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('no-results');

    try {
        const response = await fetch('posts/posts.json');
        allPosts = await response.json();

        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderPosts(allPosts);
        initScrollReveal();

        searchInput.addEventListener('input', debounce((e) => {
            filterPosts(e.target.value, currentCategory);
        }, 300));

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                filterPosts(searchInput.value, currentCategory);
            });
        });

    } catch (error) {
        container.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Erro ao carregar posts.</p>';
        console.error('Erro:', error);
    }
});

function filterPosts(searchTerm, category) {
    const container = document.getElementById('posts-container');
    const noResults = document.getElementById('no-results');

    let filtered = allPosts;

    if (category !== 'all') {
        filtered = filtered.filter(post => post.category === category);
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term) ||
            post.category.toLowerCase().includes(term)
        );
    }

    if (filtered.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        container.style.display = 'grid';
        noResults.style.display = 'none';
        renderPosts(filtered);
    }
}

function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach((post, index) => {
        const card = createPostCard(post, index);
        container.appendChild(card);
    });

    initScrollReveal();
}

function createPostCard(post, index) {
    const card = document.createElement('a');
    card.href = `post.html?id=${post.id}`;
    card.className = 'post-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.setAttribute('data-reveal', 'true');

    card.innerHTML = `
    <div class="post-card-image" data-bg="${post.image}">
      <div class="skeleton-loader"></div>
    </div>
    <div class="post-card-content">
      <h2 class="post-card-title">${post.title}</h2>
      <p class="post-card-excerpt">${post.excerpt}</p>
      <div class="post-card-meta">
        <span class="post-card-date"><i class="bi bi-calendar3"></i> ${formatDate(post.date)}</span>
        ${post.category ? `<span class="post-card-category">${post.category}</span>` : ''}
      </div>
    </div>
  `;

    return card;
}

function initScrollReveal() {
    if (observer) {
        observer.disconnect();
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    const imageContainer = entry.target.querySelector('.post-card-image');
                    const bgUrl = imageContainer.getAttribute('data-bg');

                    const img = new Image();
                    img.onload = () => {
                        imageContainer.style.backgroundImage = `url('${bgUrl}')`;
                        imageContainer.querySelector('.skeleton-loader').style.display = 'none';
                    };
                    img.src = bgUrl;

                    observer.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, options);

    document.querySelectorAll('.post-card[data-reveal]').forEach(card => {
        observer.observe(card);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}