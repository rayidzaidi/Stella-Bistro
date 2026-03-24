// import removed

const WHATSAPP_NUMBER = "923052120695";

function waLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

const reserveMsg = `Hi Stella Bistro! I’d like to reserve a table.\n\nName:\nDate:\nTime:\nGuests:\n\n(From website)`;
const orderMsg = `Hi Stella Bistro! I’d like to place an order.\n\nItems:\nAddress:\nPhone:\n\n(From website)`;
const contactMsg = `Hi Stella Bistro! I have a question.\n\n(From website)`;

function wireWhatsApp() {
    const ids = ["waReserveTop", "waReserveHero", "waOrderHero", "waMenu", "waContact", "waReserveSticky"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id.includes("Order")) {
            el.href = waLink(orderMsg);
        } else if (id.includes("Contact")) {
            el.href = waLink(contactMsg);
        } else {
            el.href = waLink(reserveMsg);
        }
        el.target = "_blank";
    });

    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        eventForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const msg =
                `Hi Stella Bistro! I’d like to inquire about an event/catering.\n\n` +
                `Name: ${fd.get("name")}\n` +
                `Phone: ${fd.get("phone")}\n` +
                `Type: ${fd.get("type")}\n` +
                `Date: ${fd.get("date") || "-"}\n` +
                `Guests: ${fd.get("guests") || "-"}\n` +
                `Time: ${fd.get("time") || "-"}\n\n` +
                `Notes: ${fd.get("notes") || "-"}\n\n(From website)`;

            window.open(waLink(msg), "_blank");
        });
    }
}

function renderItemCard(item) {
    return `
        <div class="menu-item-card">
            <img src="${item.image}" alt="${item.name}" class="menu-item-img" loading="lazy" onerror="this.onerror=null;this.src='assets/placeholders/placeholder.webp';">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h4 class="menu-item-title">${item.name}</h4>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <!-- Adding a title via JS logic if it is truncated natively, or just standard tooltip for accessibility -->
                <p class="menu-item-desc truncated" title="${item.desc}">${item.desc}</p>
                ${item.featured ? '<span class="badge-popular">Popular</span>' : ''}
            </div>
        </div>
    `;
}

function renderFeaturedCategories() {
    const container = document.getElementById('featuredCategories');
    if (!container) return;

    // Pick first 8 categories for homepage
    const displayCats = categories.slice(0, 8);
    let html = '';

    displayCats.forEach(cat => {
        html += `
            <a href="menu.html#${cat.slug}" class="cat-card">
                <span>${cat.name}</span>
            </a>
        `;
    });
    container.innerHTML = html;
}

function renderMenuHighlights() {
    const container = document.getElementById('menuHighlights');
    if (!container) return;

    // Pick up to 8 featured items
    const highlights = menuData.filter(item => item.featured).slice(0, 8);
    let html = '';

    highlights.forEach(item => {
        html += renderItemCard(item);
    });
    container.innerHTML = html;
}

function renderFullMenu() {
    const container = document.getElementById('fullMenuContainer');
    if (!container) return;

    // We render by category
    let html = '';
    categories.forEach(cat => {
        const items = menuData.filter(i => i.category === cat.name);
        if (items.length === 0) return;

        html += `
            <div class="category-section" id="${cat.slug}">
                <h3 class="category-title">${cat.name}</h3>
                <div class="full-menu-grid">
        `;

        items.forEach(item => {
            html += renderItemCard(item);
        });

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function initMenuScrollSpy() {
    const chipsWrapper = document.getElementById("fullMenuChips");
    if (!chipsWrapper) return;
    let html = `
        <a href="#top" class="chip active" id="chip-all">All</a>
    `;
    categories.forEach(cat => {
        html += `<a href="#${cat.slug}" class="chip" data-target="${cat.slug}">${cat.name}</a>`;
    });
    chipsWrapper.innerHTML = html;

    const chips = chipsWrapper.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            // Remove active from all
            chips.forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

function initHeroParallax() {
    const heroWrapper = document.getElementById('heroParallax');
    if (!heroWrapper) return;

    // Disabled on narrow screens (e.g. mobile phones) to prevent jittering on scroll
    if (window.innerWidth <= 980) return;

    // We only need to move the global parallax image and optionally the intro text (if desired)
    const layers = [
        document.getElementById('globalBg'),
        document.getElementById('heroIntro')
    ].filter(Boolean);

    heroWrapper.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to the center of the hero section
        // Values will be normalized between -1 and 1
        const rect = heroWrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (mouseX - centerX) / centerX; // -1 to 1
        const percentY = (mouseY - centerY) / centerY; // -1 to 1

        // Multiplier limits how far the items move. Max shift in pixels.
        const baseShift = 30;

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
            if (speed === 0) return;

            // X/Y movement
            const moveX = percentX * baseShift * speed;
            const moveY = percentY * baseShift * speed;

            if (layer.id === 'globalBg') {
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            } else if (layer.id === 'heroIntro') {
                layer.style.transform = `translate3d(${moveX * -0.6}px, ${moveY * -0.6}px, 0)`;
            }
        });
    });

    heroWrapper.addEventListener('mouseleave', () => {
        // Reset transforms smoothly on mouse leave
        layers.forEach(layer => {
            layer.style.transform = `translate3d(0, 0, 0)`;
        });
    });
}

function initScrollSequence() {
    const globalCurtain = document.getElementById('globalCurtain');
    const heroContent = document.getElementById('heroContent');
    const heroIntro = document.getElementById('heroIntro');

    if (!globalCurtain || !heroContent || !heroIntro) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        if (scrollY <= vh) {
            // Calculate progress from 0 (top) to 1 (scrolled 100vh)
            const progress = scrollY / vh;
            const translateY = (1 - progress) * 100;

            // Curtain overlay and text slide up perfectly bound together
            globalCurtain.style.transform = `translateY(${translateY}%)`;
            heroContent.style.transform = `translateY(${translateY}%)`;

            // Intro text fades out slightly faster and moves up slightly
            const introOpacity = Math.max(0, 1 - (progress * 1.5));
            // Keep the parallax translation combined with the vertical translation
            heroIntro.style.opacity = introOpacity;
        } else {
            // Clamp at 100vh
            globalCurtain.style.transform = `translateY(0%)`;
            heroContent.style.transform = `translateY(0%)`;
            heroIntro.style.opacity = 0;
        }
    });

    // Quick arrow click to scroll down 100vh into the curtain
    const prompt = document.querySelector('.scroll-prompt');
    if (prompt) {
        prompt.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

function initScrollDirection() {
    const nav = document.querySelector('.nav');
    const menuTools = document.querySelector('.menu-top-tools');
    
    if (!nav) return;

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            nav.classList.remove('nav-hidden');
            if (menuTools) {
                menuTools.style.top = '69px';
            }
            lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY > lastScrollY && currentScrollY > 75) {
            // Scrolling DOWN
            nav.classList.add('nav-hidden');
            if (menuTools) {
                menuTools.style.transition = 'top 0.3s ease';
                menuTools.style.top = '0px';
            }
        } else if (currentScrollY < lastScrollY) {
            // Scrolling UP
            nav.classList.remove('nav-hidden');
            if (menuTools) {
                menuTools.style.top = '69px';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

function init() {
    initScrollDirection();
    wireWhatsApp();
    renderFeaturedCategories();
    renderMenuHighlights();
    initHeroParallax();
    initScrollSequence();

    if (document.getElementById('fullMenuContainer')) {
        renderFullMenu();
        initMenuScrollSpy();
    }



    // Wait for fade-in animations globally
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.fade-in-up').forEach((el) => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Full Menu specific logic: search
    const searchInput = document.getElementById('fullMenuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const container = document.getElementById('fullMenuContainer');

            if (!term) {
                renderFullMenu();
                return;
            }

            const filtered = menuData.filter(item =>
                item.name.toLowerCase().includes(term) ||
                item.desc.toLowerCase().includes(term) ||
                item.category.toLowerCase().includes(term)
            );

            if (filtered.length === 0) {
                container.innerHTML = '<div class="card" style="text-align:center; padding: 40px; border-radius:var(--radius);"><h4 style="color:var(--text); font-family:Cinzel;">No results found</h4><p style="color:var(--muted)">Try another search term.</p></div>';
                return;
            }

            let html = '<div class="full-menu-grid">';
            filtered.forEach(item => {
                html += renderItemCard(item);
            });
            html += '</div>';
            container.innerHTML = html;
        });
    }
}

// Automatically init if loaded as module in browser
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        // Restore smooth scroll behavior only after the initial top-jump is complete
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
        }, 300);
    });
}
