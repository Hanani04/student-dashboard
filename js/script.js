// ==========================================================================
// IMS566 MASTER INDUK CONTROLLER - INTEGRATED CORE LOGIC (ALL VIEWS)
// ==========================================================================

// 1. AUTHENTICATION CONTROLLER (LOGIN/LOGOUT)
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
        errorMsg.textContent = "Invalid Credentials! Please try again.";
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

// 2. INTERFACE UTILITIES (THEME & MENU TOGGLE)
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const burgerIcon = document.getElementById("burgerIcon");
    if (navLinks && burgerIcon) {
        navLinks.classList.toggle("open");
        burgerIcon.classList.toggle("open");
    }
}

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

// 3. TINDIH (OVERWRITE): LOGIK PAPAR/SOROK KELAS AHMAD IQMAL
function toggleClassmates() {
    const classmatesBox = document.getElementById("classmates-section");
    if (!classmatesBox) return;
    
    if (classmatesBox.style.display === "none" || classmatesBox.style.display === "") {
        classmatesBox.style.display = "block";
        classmatesBox.scrollIntoView({ behavior: 'smooth' }); // Auto scroll ke senarai ahli
    } else {
        classmatesBox.style.display = "none";
    }
}

// 4. CHART & APP INITIALIZATION ON DOM LOAD
document.addEventListener("DOMContentLoaded", function () {
    // Sync Theme Storage
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.innerHTML = (currentTheme === "dark") ? "☀️" : "🌙";
    }

    // Attendance Line Chart (Dashboard)
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        new Chart(attendanceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['01 Aug', '02 Aug', '03 Aug', '04 Aug', '07 Aug', '08 Aug', '09 Aug', '10 Aug', '11 Aug', '14 Aug', '15 Aug', '16 Aug'],
                datasets: [{
                    label: 'Attendance Rate',
                    data: [88, 92, 91, 95, 96, 92, 94, 91, 93, 95, 96, 97],
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.08)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: true },
                    y: { beginAtZero: false, min: 80, max: 100 }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // Tasks Progress Stacked Bar Chart (Tasks View)
    const taskProgressCtx = document.getElementById('taskProgressChart');
    if (taskProgressCtx) {
        new Chart(taskProgressCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [
                    { label: 'Complete', data: [5, 7, 4, 8, 6, 5, 6], backgroundColor: '#0284c7', borderRadius: 6 },
                    { label: 'Pending', data: [2, 1, 3, 2, 1, 2, 1], backgroundColor: '#fb923c', borderRadius: 6 }
                ]
            },
            options: {
                responsive: true,
                scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
            }
        });
    }
});
