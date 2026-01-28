function allTasks() {
    window.location.replace("index.html");
}

function Important() {
    window.location.replace("important.html");
}

function completed() {
    window.location.replace("completed.html");
}

function today() {
    window.location.replace("today.html");
}

function upcoming() {
    window.location.replace("upcoming.html")
}

function workProject() {
    window.location.replace("workprojects.html")
}

function personal() {
    window.location.replace("personal.html")
}

function learning() {
    window.location.replace("learning.html")
}

// Theme
const themeButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;


const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);


themeButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === "light") {
        let newTheme = "dark"
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

    } else {
        let newTheme = "light"
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

    }

});