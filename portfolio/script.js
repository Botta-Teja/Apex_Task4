document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle'); 
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});
const typingTextElement = document.querySelector('.typing-text');
const words = ["Web Developer", "Front-end Developer", "UI/UX Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; 
let deletingSpeed = 50; 
let delayBetweenWords = 1500; 

function typeWriter() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentTypingSpeed = typingSpeed;
    if (isDeleting) {
        currentTypingSpeed = deletingSpeed;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        currentTypingSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex === words.length) {
            wordIndex = 0; 
        }
    }
    setTimeout(typeWriter, currentTypingSpeed);
}
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
        formStatus.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i> Message sent successfully!
            </div>
        `;
        contactForm.reset();
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            formStatus.innerHTML = '';
        }, 3000);
    }, 2000);
});
