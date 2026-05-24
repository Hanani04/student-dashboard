// ==========================================================================
// IMS566 CONTROLLER CODE - HIGH SCHOOL DASHBOARD PLATFORM LOGIC (ENGLISH)
// ==========================================================================

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

function toggleProfileSection() {
    const profileBox = document.getElementById("interactive-profile-section");
    if (profileBox) {
        if (profileBox.style.display === "none" || profileBox.style.display === "") {
            profileBox.style.display = "block";
        } else {
            profileBox.style.display = "none";
        }
    }
}

function startExamCountdown() {
    const targetDate = new Date("October 15, 2026 08:00:00").getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            const display = document.getElementById("exam-countdown");
            if (display) display.innerHTML = "<b>Examination is Now Active!</b>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const dBox = document.getElementById("cd-days");
        const hBox = document.getElementById("cd-hours");
        const mBox = document.getElementById("cd-minutes");
        const sBox = document.getElementById("cd-seconds");

        if (dBox) dBox.textContent = String(days).padStart(2, '0');
        if (hBox) hBox.textContent = String(hours).padStart(2, '0');
        if (mBox) mBox.textContent = String(minutes).padStart(2, '0');
        if (sBox) sBox.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Global DOM Content Loaded Handler for Multi-charts mapping
document.addEventListener("DOMContentLoaded", function () {
    // Sync Selected App Theme Settings
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.innerHTML = (currentTheme === "dark") ? "☀️" : "🌙";
    }

    // Trigger Countdown Timer
    if (document.getElementById("cd-days")) {
        startExamCountdown();
    }

    // High Fidelity Attendance Progress Line Chart initialization
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
                    x: { display: true, ticks: { font: { size: 10 } } },
                    y: { display: true, beginAtZero: false, min: 80, max: 100, ticks: { font: { size: 10 } } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // Task Progress Bar Chart Setup
    const taskProgressCtx = document.getElementById('taskProgressChart');
    if (taskProgressCtx) {
        new Chart(taskProgressCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [
                    {
                        label: 'Complete',
                        data: [5, 7, 4, 8, 6, 5, 6],
                        backgroundColor: '#0284c7',
                        borderRadius: 6,
                    },
                    {
                        label: 'Pending',
                        data: [2, 1, 3, 2, 1, 2, 1],
                        backgroundColor: '#fb923c',
                        borderRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true, max: 12 }
                },
                plugins: {
                    legend: { position: 'top', align: 'start' }
                }
            }
        });
    }
});
