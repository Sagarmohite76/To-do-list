# TaskFlow - Modern Task Manager

TaskFlow is a fully functional, dynamic To-Do List application built with a modern responsive design and persistent local storage.

## 🚀 Key Features

- **Centralized Task Management**: All tasks are managed via a shared `taskManager.js` service.
- **Dynamic Dashboards**: Real-time stats and progress tracking on the main dashboard.
- **Project Categories**: Specialized views for Work (Kanban), Personal (Wellness/Goals), and Learning (Course tracking).
- **Intelligent Filtering**: Automatically sorts tasks into "Today", "Important", and "Upcoming" based on due dates and priorities.
- **Interactive Calendar**: Visualize your workload with a monthly calendar view.
- **Dark Mode Support**: Seamless theme switching with persistence across all pages.
- **Mobile Responsive**: Full functionality on desktops, tablets, and smartphones.

## 🛠️ Technical Stack

- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom Design System).
- **Logic**: Vanilla JavaScript with a centralized service-oriented architecture.
- **Persistence**: Browser `localStorage` (No database required to start).
- **Weather Integration**: OpenWeather API for real-time weather on the "Today" page.

## 📂 Project Structure

- `index.html`: Main Dashboard & All Tasks
- `today.html`: Daily Focus & Weather
- `important.html`: High Priority & Starred Tasks
- `upcoming.html`: Timeline & Calendar Planning
- `completed.html`: Achievement Gallery & Clear History
- `workprojects.html`, `personal.html`, `learning.html`: Project-specific Kanban and Dashboards
- `taskManager.js`: The "Brain" of the application (CRUD, Filtering, Persistence)
- `connect.js`: Navigation, Theme, and Global UI Logic

## 🚦 Getting Started

1. Open `index.html` in any modern web browser.
2. Add tasks using the "Quick Add" form or project-specific buttons.
3. Organize your life! Your data is saved automatically.

---
Built with ❤️ for productivity.