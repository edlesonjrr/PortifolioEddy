document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    try {
        const response = await fetch('posts/posts.json');
        const posts = await response.json();
        const post = posts.find(p => p.id === postId);

        if (!post) {
            throw new Error('Post não encontrado');
        }

        document.getElementById('post-title').textContent = `${post.title} | Blog Eddy Code`;
        document.getElementById('article-title').textContent = post.title;
        document.getElementById('article-date').innerHTML = `<i class="bi bi-calendar3"></i> ${formatDate(post.date)}`;

        if (post.category) {
            document.getElementById('article-category').innerHTML = `<i class="bi bi-tag"></i> ${post.category}`;
        }

        const mdResponse = await fetch(`posts/markdown/${post.file}`);
        const markdown = await mdResponse.text();
        const html = marked.parse(markdown);

        document.getElementById('article-content').innerHTML = html;

        // Lazy load de imagens no conteúdo
        lazyLoadContentImages();

        // Scroll reveal para o conteúdo
        revealContent();

    } catch (error) {
        document.getElementById('article-content').innerHTML = '<p style="color: #ff6b6b;">Erro ao carregar o artigo.</p>';
        console.error('Erro:', error);
    }
});

function lazyLoadContentImages() {
    const images = document.querySelectorAll('.post-content img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    img.style.transition = 'all 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);

                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.src) {
            img.dataset.src = img.src;
            img.src = '';
        }
        imageObserver.observe(img);
    });
}

function revealContent() {
    const elements = document.querySelectorAll('.post-content h2, .post-content h3, .post-content p, .post-content pre, .post-content blockquote');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}