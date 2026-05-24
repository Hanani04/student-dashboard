// ==========================================================================
// IMS566 CONTROLLER CODE - SCHOOL PORTAL LOGIC WITH INTUITIVE ICON TOGGLER
// ==========================================================================

function login() {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    const validUsername = "student123";
    const validPassword = "12345";

    if (usernameInput === "" || passwordInput === "") {
        errorMsg.textContent = "Please fill in all fields.";
        return;
    }

    if (usernameInput === validUsername && passwordInput === validPassword) {
        errorMsg.textContent = "";
        localStorage.setItem("isLoggedIn", "true"); 
        window.location.href = "dashboard.html"; 
    } else {
        errorMsg.textContent = "Incorrect ID or Password! Please try again.";
    }
}

function checkAuth() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html"; 
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn"); 
    window.location.href = "index.html";   
}

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const burgerIcon = document.getElementById("burgerIcon");
    if (navLinks && burgerIcon) {
        navLinks.classList.toggle("open");
        burgerIcon.classList.toggle("open");
    }
}

// THEME TOGGLER LOGIC
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const themeBtn = document.getElementById("themeBtn");
    
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        if (themeBtn) themeBtn.innerHTML = "🌙"; 
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        if (themeBtn) themeBtn.innerHTML = "☀️"; 
    }
}

function startExamCountdown() {
    const examDate = new Date("Oct 15, 2026 08:00:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = examDate - now;

        const dEl = document.getElementById("cd-days");
        const hEl = document.getElementById("cd-hours");
        const mEl = document.getElementById("cd-minutes");
        const sEl = document.getElementById("cd-seconds");

        if (!dEl) {
            clearInterval(timerInterval);
            return;
        }

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("exam-countdown").innerHTML = "EXAMINATION IS CURRENTLY UNDERWAY!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        dEl.innerText = days < 10 ? "0" + days : days;
        hEl.innerText = hours < 10 ? "0" + hours : hours;
        mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cd-days")) {
        startExamCountdown();
    }

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === "dark" ? "☀️" : "🌙";
    }
});

// ==========================================================================
// FUNGSI KHAS UNTUK HALAMAN PROFILE & DIREKTORI AHLI KELAS
// ==========================================================================
function toggleClassNameSection() {
    const classBox = document.getElementById("class-directory-section");
    if (!classBox) return;
    
    if (classBox.style.display === "none" || classBox.style.display === "") {
        classBox.style.display = "block";
        classBox.scrollIntoView({ behavior: 'smooth' });
    } else {
        classBox.style.display = "none";
    }
}
