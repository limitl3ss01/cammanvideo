        // Główna funkcja inicjalizująca
        function initializeWebsite() {
        // Preloader
            const preloader = document.querySelector('.preloader');
            if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
            }

        // Custom cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
            }

        // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
            }

            // Menu mobilne
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

            if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });

                // Zamykanie menu po kliknięciu w link
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    });
                });
            }

            // Płynne przewijanie dla wszystkich linków z hrefami zaczynającymi się od #
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Globalna deklaracja obiektu forms
            const forms = {
                contact: document.getElementById('contact-form'),
                training: document.getElementById('training-form'),
                newsletter: document.getElementById('newsletter-form')
            };

            // Inicjalizacja formularzy
            initializeForms();

            // Theme Toggle
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    document.body.classList.toggle('dark-mode');
                    const icon = themeToggle.querySelector('i');
                    if (document.body.classList.contains('dark-mode')) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                });
            }

            // Progress Bar
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                window.addEventListener('scroll', () => {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                });
            }

            // FAB Button
            const fabButton = document.querySelector('.fab-button');
            if (fabButton) {
                fabButton.addEventListener('click', () => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            // FAQ Toggles
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    faqItem.classList.toggle('active');
                    
                    document.querySelectorAll('.faq-item.active').forEach(item => {
                        if (item !== faqItem) {
                            item.classList.remove('active');
                        }
                    });
                });
            });

            // Lazy Loading
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            if (lazyImages.length > 0) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    });
                });

                lazyImages.forEach(img => imageObserver.observe(img));
            }

            // Microinteractions
            document.querySelectorAll('.btn, .service-card, .portfolio-item').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-5px)';
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translateY(0)';
                });
            });

            // Implementacja infinite scroll dla portfolio
            let isLoading = false;
            const portfolioGrid = document.querySelector('.portfolio-grid');
            
            if (portfolioGrid) {
                window.addEventListener('scroll', () => {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && !isLoading) {
                        isLoading = true;
                        // Tutaj możesz dodać logikę ładowania kolejnych elementów portfolio
                        setTimeout(() => {
                            isLoading = false;
                        }, 1000);
                    }
                });
            }

            // Wskaźnik postępu ładowania
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'loading-progress';
            document.body.appendChild(progressIndicator);

            let loadedResources = 0;
            const totalResources = document.images.length + document.scripts.length + document.styleSheets.length;

            function updateProgress() {
                loadedResources++;
                const progress = (loadedResources / totalResources) * 100;
                progressIndicator.style.width = `${progress}%`;
                
                if (loadedResources >= totalResources) {
                    setTimeout(() => {
                        progressIndicator.style.opacity = '0';
                        setTimeout(() => {
                            progressIndicator.remove();
                        }, 300);
                    }, 500);
                }
            }

            // Monitorowanie ładowania zasobów
            Array.from(document.images).forEach(img => {
                if (img.complete) {
                    updateProgress();
                } else {
                    img.addEventListener('load', updateProgress);
                    img.addEventListener('error', updateProgress);
                }
            });

            Array.from(document.scripts).forEach(script => {
                if (script.complete) {
                    updateProgress();
                } else {
                    script.addEventListener('load', updateProgress);
                    script.addEventListener('error', updateProgress);
                }
            });

            Array.from(document.styleSheets).forEach(stylesheet => {
                updateProgress();
            });

            // Walidacja formularzy
            const formElements = document.querySelectorAll('form');
            formElements.forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!validateForm(form)) {
                        e.preventDefault();
                    }
                });

                // Walidacja w czasie rzeczywistym
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.addEventListener('input', () => {
                        validateInput(input);
                    });
                });
            });
        }

        // Globalne zmienne
        let forms = {
            contact: null,
            training: null,
            newsletter: null
        };

        // Funkcje analityczne
        function trackEvent(category, action, label = null, value = null) {
            if (typeof gtag !== 'undefined') {
                const eventParams = {
                    event_category: category,
                    event_label: label,
                    value: value
                };
                gtag('event', action, eventParams);
            }
        }

        function trackPageView(pagePath) {
            if (typeof gtag !== 'undefined') {
                gtag('config', 'G-XXXXXXXXXX', {
                    page_path: pagePath
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Inicjalizacja formularzy
            forms = {
                contact: document.getElementById('contact-form'),
                training: document.getElementById('training-form'),
                newsletter: document.getElementById('newsletter-form')
            };
            
            // Inicjalizacja wszystkich funkcjonalności
            initializeForms();
            initializeWebsite();
            initializeAnalytics();
        });

        // GSAP Animations (jeśli GSAP jest dostępny)
        if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        gsap.from('.hero h1', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero p', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.8
        });

        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.1
        });

        // Scroll animations
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services',
                    start: 'top center'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
                stagger: 0.2
        });

        gsap.from('.portfolio-item', {
            scrollTrigger: {
                trigger: '.portfolio',
                start: 'top center'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2
        });
        }

        // Skill bars animation
        gsap.from('.skill-progress', {
            scrollTrigger: {
                trigger: '.skill-bars',
                start: 'top center'
            },
            width: 0,
            duration: 1.5,
            ease: 'power2.out'
        });

        // Funkcja do ładowania embedów social media
        function loadSocialEmbeds() {
            // Instagram
            if (window.instgrm && window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
            } else {
                // Jeśli skrypt Instagrama jeszcze się nie załadował, spróbuj ponownie za chwilę
                setTimeout(loadSocialEmbeds, 1000);
            }

            // TikTok
            if (window.tiktok && window.tiktok.reload) {
                window.tiktok.reload();
            }
        }

        // Obsługa filtrowania portfolio
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Przeładuj embedy po filtrowaniu
                setTimeout(loadSocialEmbeds, 100);
            });
        });

        // Obserwator przewijania dla sekcji portfolio
        const portfolioSection = document.querySelector('#portfolio');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadSocialEmbeds();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(portfolioSection);

        // Załaduj embedy przy starcie strony
        window.addEventListener('load', () => {
            setTimeout(loadSocialEmbeds, 1000);
        });

        // Dodatkowe sprawdzenie co 2 sekundy przez pierwsze 10 sekund
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            loadSocialEmbeds();
            checkCount++;
            if (checkCount >= 5) {
                clearInterval(checkInterval);
            }
        }, 2000);
    

            // Generowanie pływających ikon
            const icons = ['fab fa-instagram', 'fab fa-tiktok', 'fab fa-facebook', 'fab fa-youtube'];
            const floatingContainer = document.querySelector('.floating-socials');
            
            for (let i = 0; i < 20; i++) {
                const icon = document.createElement('i');
                icon.className = `floating-icon ${icons[i % icons.length]}`;
                icon.style.left = `${Math.random() * 100}%`;
                icon.style.top = `${Math.random() * 100}%`;
                icon.style.animationDelay = `${Math.random() * 10}s`;
                floatingContainer.appendChild(icon);
            }
        

        // Animowane tło
        const canvas = document.getElementById('particles-bg');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = {
            x: null,
            y: null,
            radius: 150
        };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Śledzenie pozycji myszy
        document.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Klasa cząsteczek
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = `rgba(255, 51, 102, ${Math.random() * 0.3})`;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx/10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy/10;
                    }
                }
            }
        }

        // Inicjalizacja cząsteczek
        function init() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        // Animacja
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Rysowanie linii między cząsteczkami
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 51, 102, ${0.1 * (1 - distance/100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        // Aktualizacja przy zmianie rozmiaru okna
        window.addEventListener('resize', function() {
            resizeCanvas();
            init();
        });
    

        // Tooltips
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = element.dataset.tooltip;
                document.body.appendChild(tooltip);

                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });

            element.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });

        // Parallax Effect
        document.querySelectorAll('.parallax-section').forEach(section => {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                section.style.transform = `translateY(${rate}px)`;
            });
        });

        // Counters Animation
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        }

        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter-number').forEach(counter => {
            counterObserver.observe(counter);
        });


        // Rejestracja Service Workera
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker zarejestrowany:', registration);
                    })
                    .catch(error => {
                        console.log('Błąd rejestracji ServiceWorkera:', error);
                    });
            });
        }

        function initializeAnalytics() {
            // Śledzenie kliknięć w przyciski
            document.querySelectorAll('button, .btn').forEach(button => {
                button.addEventListener('click', () => {
                    trackEvent('Button', 'Click', button.textContent);
                });
            });

            // Śledzenie przewijania
            let scrollDepthMarkers = [25, 50, 75, 100];
            let markerTriggered = new Set();

            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
                
                scrollDepthMarkers.forEach(marker => {
                    if (scrollPercent >= marker && !markerTriggered.has(marker)) {
                        trackEvent('Scroll', 'Depth', `${marker}%`);
                        markerTriggered.add(marker);
                    }
                });
            });

            // Śledzenie czasu spędzonego na stronie
            let timeSpent = 0;
            const timeInterval = setInterval(() => {
                timeSpent += 30;
                if (timeSpent % 60 === 0) {
                    trackEvent('Engagement', 'Time Spent', null, timeSpent);
                }
            }, 30000);

            // Śledzenie formularzy
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    trackEvent('Form', 'Submit', form.getAttribute('id') || 'unknown-form');
                });
            });

            // Śledzenie kliknięć w linki zewnętrzne
            document.querySelectorAll('a').forEach(link => {
                if (link.hostname !== window.location.hostname && link.href.startsWith('http')) {
                    link.addEventListener('click', () => {
                        trackEvent('Outbound Link', 'Click', link.href);
                    });
                }
            });

            // Śledzenie interakcji z filmami
            document.querySelectorAll('video').forEach(video => {
                video.addEventListener('play', () => {
                    trackEvent('Video', 'Play', video.getAttribute('src'));
                });
                
                video.addEventListener('pause', () => {
                    trackEvent('Video', 'Pause', video.getAttribute('src'));
                });
                
                video.addEventListener('ended', () => {
                    trackEvent('Video', 'Complete', video.getAttribute('src'));
                });
            });

            // Śledzenie błędów JavaScript
            window.addEventListener('error', (e) => {
                trackEvent('Error', 'JavaScript', `${e.message} (${e.filename}:${e.lineno})`);
            });

            // Śledzenie wydajności strony
            if (window.performance) {
                window.addEventListener('load', () => {
                    const timing = performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    trackEvent('Performance', 'Page Load Time', null, loadTime);
                });
            }
        }
    

        // Inicjalizacja formularzy
        function initializeForms() {
            if (forms.contact) {
                forms.contact.addEventListener('submit', handleContactFormSubmit);
            }
            
            if (forms.training) {
                forms.training.addEventListener('submit', handleTrainingFormSubmit);
            }
            
            if (forms.newsletter) {
                forms.newsletter.addEventListener('submit', handleNewsletterFormSubmit);
            }
        }

        // Obsługa formularza kontaktowego
        function handleContactFormSubmit(e) {
            e.preventDefault();
            // Logika obsługi formularza kontaktowego
            showAlert('success', 'Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
            trackEvent('Form', 'Submit', 'contact');
            e.target.reset();
        }

        // Obsługa formularza szkoleniowego
        function handleTrainingFormSubmit(e) {
            e.preventDefault();
            // Logika obsługi formularza szkoleniowego
            showAlert('success', 'Dziękujemy za zgłoszenie! Skontaktujemy się w sprawie szczegółów szkolenia.');
            trackEvent('Form', 'Submit', 'training');
            e.target.reset();
        }

        // Obsługa formularza newslettera
        function handleNewsletterFormSubmit(e) {
            e.preventDefault();
            // Logika obsługi formularza newslettera
            showAlert('success', 'Dziękujemy za zapisanie się do newslettera!');
            trackEvent('Form', 'Submit', 'newsletter');
            e.target.reset();
        }

        // Funkcje walidacji formularzy
        function validateForm(form) {
            let isValid = true;
            form.querySelectorAll('input, textarea, select').forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            return isValid;
        }

        function validateInput(input) {
            const value = input.value.trim();
            const errorMessage = input.parentElement.querySelector('.error-message') || 
                                document.createElement('div');
            
            errorMessage.className = 'error-message';
            
            let isValid = true;
            
            // Sprawdzanie wymaganych pól
            if (input.hasAttribute('required') && !value) {
                errorMessage.textContent = 'To pole jest wymagane';
                isValid = false;
            }
            
            // Walidacja email
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage.textContent = 'Wprowadź poprawny adres email';
                    isValid = false;
                }
            }
            
            // Walidacja telefonu
            if (input.type === 'tel' && value) {
                const phoneRegex = /^\+?[\d\s-]{9,}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage.textContent = 'Wprowadź poprawny numer telefonu';
                    isValid = false;
                }
            }
            
            // Dodawanie lub usuwanie komunikatu o błędzie
            if (!isValid) {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                if (!input.parentElement.contains(errorMessage)) {
                    input.parentElement.appendChild(errorMessage);
                }
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (input.parentElement.contains(errorMessage)) {
                    errorMessage.remove();
                }
            }
            
            return isValid;
        }

        // Funkcja wyświetlania alertów
        function showAlert(type, message) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            
            // Dodaj alert na górze strony
            document.body.insertBefore(alertDiv, document.body.firstChild);
            
            // Usuń alert po 3 sekundach
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }
    