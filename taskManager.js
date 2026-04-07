/**
 * TaskManager.js - Centralized task logic for TaskFlow
 */

const TaskManager = {
    // Data Management
    getTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Migration/Pre-seed if empty
        if (tasks.length === 0) {
            const defaultTasks = [
                { id: 1, title: "Add authentication system", description: "Implement JWT based login", priority: "high", category: "work", dueDate: new Date().toISOString(), status: false, isStarred: true },
                { id: 2, title: "Review pull requests", description: "Checked pending PRs for the backend", priority: "medium", category: "work", dueDate: new Date().toISOString(), status: false, isStarred: false },
                { id: 3, title: "Grocery shopping", description: "Buy milk, eggs, and bread", priority: "low", category: "personal", dueDate: new Date().toISOString(), status: true, isStarred: false },
                { id: 4, title: "Learn React Hooks", description: "Complete the tutorial on useEffect", priority: "medium", category: "learning", dueDate: null, status: false, isStarred: false }
            ];
            this.saveTasks(defaultTasks);
            return defaultTasks;
        }
        return tasks;
    },

    saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Dispatch custom event so other components can react
        window.dispatchEvent(new CustomEvent('tasksUpdated'));
    },

    addTask(taskData) {
        const tasks = this.getTasks();
        const newTask = {
            id: Date.now(),
            title: taskData.title || "Untitled Task",
            description: taskData.description || "",
            priority: taskData.priority || "medium",
            category: taskData.category || "none",
            dueDate: taskData.dueDate || null,
            status: false,
            isStarred: taskData.isStarred || false
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        return newTask;
    },

    toggleTask(id) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.status = !task.status;
            this.saveTasks(tasks);
        }
    },

    deleteTask(id) {
        const tasks = this.getTasks().filter(t => t.id !== id);
        this.saveTasks(tasks);
    },

    clearCompleted() {
        const tasks = this.getTasks().filter(t => !t.status);
        this.saveTasks(tasks);
    },

    toggleStar(id) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.isStarred = !task.isStarred;
            this.saveTasks(tasks);
        }
    },

    // Filtering Logic
    getFilteredTasks(filter) {
        const tasks = this.getTasks();
        const today = new Date().toISOString().split('T')[0];

        switch (filter) {
            case 'today':
                return tasks.filter(t => t.dueDate && t.dueDate.startsWith(today));
            case 'important':
                return tasks.filter(t => t.priority === 'high' || t.isStarred);
            case 'completed':
                return tasks.filter(t => t.status);
            case 'active':
                return tasks.filter(t => !t.status);
            case 'work':
                return tasks.filter(t => t.category === 'work');
            case 'personal':
                return tasks.filter(t => t.category === 'personal');
            case 'learning':
                return tasks.filter(t => t.category === 'learning');
            case 'starred':
                return tasks.filter(t => t.isStarred);
            default:
                return tasks;
        }
    },

    // UI Stats
    getStats() {
        const tasks = this.getTasks();
        const completed = tasks.filter(t => t.status).length;
        const total = tasks.length;
        const active = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, active, percent };
    },

    // Generic Render Helper
    renderTasksToContainer(container, filter, options = {}) {
        if (!container) return;
        const tasks = this.getFilteredTasks(filter);
        container.innerHTML = '';

        if (tasks.length === 0) {
            container.innerHTML = `<div class="task-empty-state" style="text-align: center; padding: 20px; opacity: 0.5;">
                ${options.emptyMessage || 'No tasks found.'}
            </div>`;
            return;
        }

        tasks.sort((a, b) => b.id - a.id).forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = options.itemClass || `task ${task.status ? 'completed' : ''}`;
            taskEl.dataset.id = task.id;
            
            // Custom templates can be passed in, or use a default
            taskEl.innerHTML = options.template ? options.template(task) : `
                <div class="checkbox-wrapper">
                    <div class="checkbox ${task.status ? 'checked' : ''}"></div>
                </div>
                <div class="task-content">
                    <div class="task-title" style="${task.status ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.title}</div>
                    <div class="task-meta">
                        <span class="task-tag">${task.category}</span>
                        <span>${task.status ? 'Completed' : (task.dueDate ? 'Due soon' : 'Active')}</span>
                    </div>
                </div>
                <div class="task-priority ${task.priority}"></div>
                <button class="delete-btn" style="background: none; border: none; cursor: pointer; opacity: 0.5; padding: 5px;">🗑️</button>
            `;

            // Event Listeners
            const cb = taskEl.querySelector('.checkbox') || taskEl.querySelector('.task-checkbox') || taskEl.querySelector('.habit-checkbox');
            if (cb) cb.addEventListener('click', () => this.toggleTask(task.id));

            const del = taskEl.querySelector('.delete-btn');
            if (del) del.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(task.id);
            });

            container.appendChild(taskEl);
        });
    }
};

// Global counts update for sidebar
function updateSidebarCounts() {
    const stats = TaskManager.getStats();
    const tasks = TaskManager.getTasks();
    const countElements = document.querySelectorAll('.nav-count');
    
    // This is simple mapping, more robust would use data attributes
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const span = item.querySelector('span:not(.nav-icon):not(.nav-count)');
        const countBadge = item.querySelector('.nav-count');
        if (!countBadge) return;

        if (span.textContent === 'All Tasks') countBadge.textContent = tasks.length;
        if (span.textContent === 'Important') countBadge.textContent = tasks.filter(t => t.priority === 'high' || t.isStarred).length;
        if (span.textContent === 'Completed') countBadge.textContent = tasks.filter(t => t.status).length;
        if (span.textContent === 'Today') countBadge.textContent = tasks.filter(t => t.dueDate && t.dueDate.startsWith(new Date().toISOString().split('T')[0])).length;
    });
}

// Listen for updates to refresh UI
window.addEventListener('tasksUpdated', () => {
    if (typeof renderTasks === 'function') renderTasks();
    if (typeof updateDashboardStats === 'function') updateDashboardStats();
    updateSidebarCounts();
});

document.addEventListener('DOMContentLoaded', updateSidebarCounts);
