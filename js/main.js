/**
 * Booo! GAMES Website - Main JavaScript
 * Handles dynamic interactions and animations
 */

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    lucide.createIcons();

    // Set current year in footer
    setCurrentYear();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize FAQ (no longer needed for accordion, but kept for animations)
    initFAQ();

    // Initialize scroll to top button
    initScrollToTop();

    // Initialize active navigation highlighting
    initActiveNav();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Load Twitter widget
    loadTwitterWidget();

    // Add parallax effect to hero section
    initParallax();

    // Initialize counter animation
    initCounterAnimation();

    // Load TwiPla events
    loadTwiPlaEvents();

    // Initialize game cards animation
    initGameCards();

    // Initialize testimonials animation
    initTestimonials();
});

// ========================================
// Set Current Year
// ========================================
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            // Open menu with animation
            menu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            setTimeout(() => menu.classList.add('fade-in-up'), 10);
        } else {
            // Close menu
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    if (btn) {
        btn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!menu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('hidden') &&
            !menu.contains(e.target) &&
            !btn.contains(e.target)) {
            toggleMenu();
        }
    });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Re-initialize icons after animation
                lucide.createIcons();
            }
        });
    }, observerOptions);

    // Observe section headers
    const sectionFadeElements = document.querySelectorAll('.section-fade-in');
    sectionFadeElements.forEach(el => observer.observe(el));

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(el => observer.observe(el));

    // Observe schedule cards
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(el => observer.observe(el));

    // Observe FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(el => observer.observe(el));
}

// ========================================
// FAQ Animation (FAQ items are now always visible)
// ========================================
function initFAQ() {
    // FAQ items are now always visible, no accordion needed
    // This function is kept for potential future FAQ animations
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');

    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Re-initialize icons
    lucide.createIcons();
}

// ========================================
// Active Navigation Highlighting
// ========================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial highlight
    highlightNav();
}

// ========================================
// Smooth Scrolling (Fallback for older browsers)
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ========================================
// Twitter Widget Loader
// ========================================
function loadTwitterWidget() {
    // Check if script already exists
    if (document.querySelector('script[src*="platform.twitter.com"]')) {
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';

    script.onload = () => {
        const loadingMsg = document.getElementById('twitter-loading');
        if (loadingMsg) {
            setTimeout(() => {
                loadingMsg.style.display = 'none';
            }, 1000);
        }
    };

    script.onerror = () => {
        const loadingMsg = document.getElementById('twitter-loading');
        if (loadingMsg) {
            loadingMsg.innerHTML = 'Twitterの読み込みに失敗しました。<br/>ページを再読み込みしてください。';
            loadingMsg.classList.add('text-red-500');
        }
    };

    document.body.appendChild(script);
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
function initParallax() {
    const hero = document.querySelector('.relative.bg-white.overflow-hidden');
    const blobs = document.querySelectorAll('.animate-blob');

    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.clientHeight;

                // Only apply parallax within hero section
                if (scrolled < heroHeight) {
                    blobs.forEach((blob, index) => {
                        const speed = 0.3 + (index * 0.1);
                        const yPos = -(scrolled * speed);
                        blob.style.transform = `translateY(${yPos}px)`;
                    });
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Add Easter Egg (Fun interaction)
// ========================================
let clickCount = 0;
const logo = document.querySelector('nav a[href="#"]');

if (logo) {
    logo.addEventListener('click', (e) => {
        clickCount++;

        if (clickCount === 5) {
            e.preventDefault();

            // Create confetti effect
            const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308'];

            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
                }, i * 30);
            }

            // Show message
            const message = document.createElement('div');
            message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-2xl z-50 text-center border-4 border-red-500';
            message.innerHTML = `
                <h2 class="text-3xl font-black text-red-500 mb-4">🎉 おめでとうございます！</h2>
                <p class="text-lg text-gray-700">隠し機能を発見しました！<br/>Booo! GAMESで一緒に遊びましょう！</p>
                <button onclick="this.parentElement.remove()" class="mt-6 bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600">閉じる</button>
            `;
            document.body.appendChild(message);

            // Reset counter
            setTimeout(() => {
                clickCount = 0;
            }, 5000);
        }

        // Reset counter after 2 seconds of no clicks
        setTimeout(() => {
            if (clickCount < 5) clickCount = 0;
        }, 2000);
    });
}

// Confetti creation function
function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.transition = 'all 2s ease-out';

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.style.top = window.innerHeight + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        confetti.remove();
    }, 2000);
}

// ========================================
// Counter Animation for Stats
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Load Events from JSON
// ========================================
function loadTwiPlaEvents() {
    const eventsContainer = document.getElementById('upcoming-events');
    if (!eventsContainer) return;

    // Load events from schedule.json file
    fetch('schedule.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('スケジュールファイルの読み込みに失敗しました');
            }
            return response.json();
        })
        .then(data => {
            if (!data.events || data.events.length === 0) {
                eventsContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-500">現在、開催予定のイベントはありません。</p>
                    </div>
                `;
                return;
            }

            const eventsHTML = data.events.map((event, index) => {
                // ステータスに応じた色を設定
                const statusColorMap = {
                    '募集中': 'bg-green-100 text-green-700',
                    '募集予定': 'bg-blue-100 text-blue-700',
                    '満席': 'bg-red-100 text-red-700',
                    '開催済み': 'bg-gray-100 text-gray-700'
                };
                const statusBg = statusColorMap[event.status] || 'bg-gray-100 text-gray-700';

                // TwiPlaリンクがある場合とない場合で表示を変更
                const actionButton = event.twiplaUrl
                    ? `<a href="${event.twiplaUrl}" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all transform hover:-translate-y-0.5">
                        詳細を見る
                    </a>`
                    : `<div class="block w-full text-center bg-gray-300 text-gray-600 py-3 rounded-xl font-bold cursor-not-allowed">
                        近日公開予定
                    </div>`;

                return `
                    <div class="event-card bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-2xl transition-all duration-300 opacity-0 transform translate-y-4" style="animation-delay: ${index * 0.1}s">
                        <div class="flex items-start justify-between mb-4">
                            <h4 class="text-xl font-bold text-gray-900">${event.title}</h4>
                            <span class="${statusBg} px-3 py-1 rounded-full text-xs font-bold">${event.status}</span>
                        </div>
                        <div class="space-y-3 mb-4">
                            <div class="flex items-center text-gray-600">
                                <i data-lucide="calendar" class="w-4 h-4 mr-2 text-blue-500"></i>
                                <span class="text-sm">${event.date}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i data-lucide="clock" class="w-4 h-4 mr-2 text-blue-500"></i>
                                <span class="text-sm">${event.time}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i data-lucide="map-pin" class="w-4 h-4 mr-2 text-blue-500"></i>
                                <span class="text-sm">${event.venue}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i data-lucide="users" class="w-4 h-4 mr-2 text-blue-500"></i>
                                <span class="text-sm">定員: ${event.capacity}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i data-lucide="wallet" class="w-4 h-4 mr-2 text-blue-500"></i>
                                <span class="text-sm">参加費: ${event.fee}</span>
                            </div>
                        </div>
                        ${event.description ? `<p class="text-sm text-gray-600 mb-4 leading-relaxed">${event.description}</p>` : ''}
                        ${actionButton}
                    </div>
                `;
            }).join('');

            eventsContainer.innerHTML = eventsHTML;

            // Re-initialize icons
            lucide.createIcons();

            // Animate cards
            setTimeout(() => {
                const eventCards = document.querySelectorAll('.event-card');
                eventCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 100);
        })
        .catch(error => {
            console.error('スケジュールの読み込みエラー:', error);
            eventsContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-red-500 font-bold mb-2">スケジュールの読み込みに失敗しました。</p>
                    <p class="text-gray-500 text-sm">ページを再読み込みしてください。</p>
                </div>
            `;
        });
}

// ========================================
// Game Cards Animation
// ========================================
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lucide.createIcons();
            }
        });
    }, { threshold: 0.1 });

    gameCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });
}

// ========================================
// Testimonials Animation
// ========================================
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// Console Message (for developers)
// ========================================
console.log('%c🎲 Booo! GAMES 🎲', 'color: #ef4444; font-size: 24px; font-weight: bold;');
console.log('%c松戸ボードゲームサークルのウェブサイトへようこそ！', 'color: #3b82f6; font-size: 14px;');
console.log('%cこのサイトに興味を持っていただきありがとうございます。', 'color: #10b981; font-size: 12px;');
console.log('%c開発者の方へ: 一緒にボードゲームを楽しみませんか？', 'color: #eab308; font-size: 12px;');
