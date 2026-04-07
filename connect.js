// Navigation functions
function allTasks() { window.location.href = "index.html"; }
function Important() { window.location.href = "important.html"; }
function completed() { window.location.href = "completed.html"; }
function today() { window.location.href = "today.html"; }
function upcoming() { window.location.href = "upcoming.html"; }
function workProject() { window.location.href = "workprojects.html"; }
function personal() { window.location.href = "personal.html"; }
function learning() { window.location.href = "learning.html"; }

// Theme management
const themeButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeButton) {
    themeButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === "light" ? "dark" : "light";
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Sidebar Active State Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item, .project-item');

    navItems.forEach(item => {
        const onClick = item.getAttribute('onclick');
        if (onClick) {
            const funcName = onClick.split('(')[0];
            const pageMap = {
                'allTasks': 'index.html',
                'Important': 'important.html',
                'completed': 'completed.html',
                'today': 'today.html',
                'upcoming': 'upcoming.html',
                'workProject': 'workprojects.html',
                'personal': 'personal.html',
                'learning': 'learning.html'
            };
            if (pageMap[funcName] === currentPath) {
                document.querySelectorAll('.nav-item, .project-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            }
        }
    });

    // Sidebar counts refresh if TaskManager exists
    if (typeof updateSidebarCounts === 'function') {
        updateSidebarCounts();
    }
});