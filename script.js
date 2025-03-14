document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    function highlightNav() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // Check if the section is in the viewport
            if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionBottom - 50) {
                currentSection = section.getAttribute("id");
            }
        });

        // Add the 'active' class to the corresponding navigation link
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    }

    // Run the function on scroll and page load
    window.addEventListener("scroll", highlightNav);
    highlightNav(); // Call it once on page load

    

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
    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.add('active');
    });
    

    document.querySelector('.close-menu').addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
    
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
    
    document.querySelectorAll(".accordion").forEach(button => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            panel.classList.toggle("active");
        });
    });
});
