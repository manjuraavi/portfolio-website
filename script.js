document.addEventListener('DOMContentLoaded', function() {
    // Toggle theme
    const toggleThemeBtn = document.querySelector('.toggle-theme');
    const body = document.body;
    
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleThemeBtn) {
            toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking a navigation link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check and add scroll listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();

    document.querySelectorAll(".accordion").forEach(button => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            panel.classList.toggle("active");
        });
    });
});
