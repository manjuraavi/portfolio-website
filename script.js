// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

    particlesJS("particles-js", {
        particles: {
          number: {
            value: 80, // Increase or decrease the number of particles
            density: {
              enable: true,
              value_area: 800, // Adjust area density
            },
          },
          color: {
            value: ["#8E44AD", "#3498DB", "#E74C3C", "#2ECC71"], // Fun, vibrant AI-inspired colors
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000",
            },
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: true,
              speed: 3,
              size_min: 0.3,
              sync: false,
            },
          },
          line_linked: {
            enable: true, // Connect the dots like a neural network
            distance: 150, // Adjust distance between connections
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2, // Control movement speed
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab", // Makes it feel interactive
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.6,
              },
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      });

    // Loading screen animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1500);

    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // Add particles background
    createParticles();

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Once revealed, stop observing
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        updateProgressBar();
        checkSkillsCategoryAnimation();
    });

    // Add custom property to each skill element
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        skill.style.setProperty('--i', index);
    });

    // Custom cursor (simplified, no trail)
    createCustomCursor();
    
    // Setup theme toggle
    setupThemeToggle();
    
});

// Create a simple custom cursor instead of a trail
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--accent-color)';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursor);
    
    // Add cursor outline for hover effects
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.position = 'fixed';
    cursorOutline.style.width = '30px';
    cursorOutline.style.height = '30px';
    cursorOutline.style.borderRadius = '50%';
    cursorOutline.style.border = '1px solid var(--accent-color)';
    cursorOutline.style.pointerEvents = 'none';
    cursorOutline.style.zIndex = '9998';
    cursorOutline.style.transform = 'translate(-50%, -50%)';
    cursorOutline.style.transition = 'transform 0.15s ease, width 0.3s ease, height 0.3s ease';
    document.body.appendChild(cursorOutline);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .project-card, .skill, input, textarea, select');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Add click animation
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Option to disable custom cursor
    const disableCursor = document.createElement('button');
    disableCursor.className = 'disable-cursor';
    disableCursor.innerHTML = '🖱️';
    disableCursor.title = 'Toggle custom cursor';
    disableCursor.style.position = 'fixed';
    disableCursor.style.top = '20px';
    disableCursor.style.right = '70px';
    disableCursor.style.zIndex = '1000';
    disableCursor.style.background = 'var(--secondary-color)';
    disableCursor.style.border = 'none';
    disableCursor.style.borderRadius = '50%';
    disableCursor.style.width = '40px';
    disableCursor.style.height = '40px';
    disableCursor.style.cursor = 'pointer';
    disableCursor.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    disableCursor.style.fontSize = '20px';
    disableCursor.style.display = 'flex';
    disableCursor.style.alignItems = 'center';
    disableCursor.style.justifyContent = 'center';
    document.body.appendChild(disableCursor);
    
    disableCursor.addEventListener('click', () => {
        if (cursor.style.display === 'none') {
            cursor.style.display = 'block';
            cursorOutline.style.display = 'block';
            document.body.style.cursor = 'none';
            disableCursor.innerHTML = '🖱️';
        } else {
            cursor.style.display = 'none';
            cursorOutline.style.display = 'none';
            document.body.style.cursor = 'auto';
            disableCursor.innerHTML = '✋';
        }
    });
}

// Create particle background effect
function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    
    const particleCount = 50; // More particles for a richer effect
    const colors = [
        'rgba(128, 103, 173, 0.6)', // Primary Color (Purple)
        'rgba(226, 209, 249, 0.6)', // Secondary Color (Lavender)
        'rgba(255, 214, 224, 0.6)', // Accent Color (Pink)
        'rgba(100, 100, 255, 0.5)', // Soft Blue
        'rgba(255, 180, 120, 0.5)'  // Warm Peach
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = (Math.random() * 6 + 3) + 'px';  
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.pointerEvents = 'none';

        // Faster and varied movement
        particle.style.animation = `floatParticle ${Math.random() * 6 + 6}s ease-in-out infinite`;
        particle.style.animationDelay = `-${Math.random() * 5}s`;

        particles.appendChild(particle);
    }
    
    // Add improved animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatParticle {
            0% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.9); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }
    `;
    document.head.appendChild(style);
}


// Update the progress bar based on scroll position
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

// Add animation to skill categories when scrolling
function checkSkillsCategoryAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.85) {
            category.style.opacity = 1;
            category.style.transform = 'translateY(0)';
            category.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        }
    });
}

// Add interactive typing effect to name
window.addEventListener('load', function() {
    // Typing animation for name
    const name = document.querySelector('.name');
    const fullName = name.textContent;
    name.textContent = '';
    
    let i = 0;
    const typeEffect = setInterval(function() {
        if (i < fullName.length) {
            name.textContent += fullName.charAt(i);
            i++;
        } else {
            clearInterval(typeEffect);
        }
    }, 100);
    
    // Add hover effect to skill pills
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('card-clicked');
            setTimeout(() => {
                this.classList.remove('card-clicked');
            }, 300);
        });
    });
    
    // Animate scroll to sections when clicking nav links (if you add navigation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Theme toggle functionality (add a theme toggle button to your HTML)
// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Toggle dark/light mode';
    
    // Button Styling
    themeToggle.style.position = 'fixed';
    themeToggle.style.top = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--secondary-color)';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '40px';
    themeToggle.style.height = '40px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    themeToggle.style.fontSize = '20px';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.transition = 'all 0.3s ease';

    document.body.appendChild(themeToggle);

    // Apply saved theme on page load
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌓';
        }

        // Add transition effect to body
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Flash effect
        const flash = document.createElement('div');
        flash.className = 'theme-flash';
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9999';
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0.5';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                    flash.remove();
                }, 300);
            }, 100);
        }, 0);
    });
}

// Initialize Theme Toggle on Page Load
window.addEventListener('DOMContentLoaded', setupThemeToggle);


  

