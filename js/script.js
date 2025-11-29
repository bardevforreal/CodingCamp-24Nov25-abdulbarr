let todos = [];
let filter = 'all';
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function addTodo() {
    const input = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');

    const text = input.value.trim();
    const dateValue = dateInput.value;

    if (!text || !dateValue) return;

    todos.push({
        text,
        done: false,
        date: formatDate(dateValue)
    });

    saveTodos();

    input.value = '';
    dateInput.value = '';
    render();
}
function toggle(i) {
    todos[i].done = !todos[i].done;
    render();
    saveTodos();
}
function setFilter(f) {
    filter = f;
    render();
    saveTodos();
}
function clearTodos() {
    todos = [];
    render();
    saveTodos();
}
function render() {
    const container = document.getElementById('todo-list');
    container.innerHTML = '';

    let filtered = todos;

    if (filter === 'pending') filtered = todos.filter(t => !t.done);
    if (filter === 'done') filtered = todos.filter(t => t.done);

    filtered.forEach((t, i) => {
        const div = document.createElement('div');
        div.className = 'todo' + (t.done ? ' done' : '');

        div.innerHTML = `
        <div class="left">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggle(${i})" />
            <span>${t.text}</span>
        </div>
        <div class="date">${t.date}</div>
      `;

        container.appendChild(div);
    });
}
const themes = {
    'dark-purple': {
        bg: '#1a092b', container: '#2b0f44', input: '#3a1559', btn: '#6a2fa0', text: '#ffffff'
    },
    'dark': {
        bg: '#0d0d0d', container: '#1f1f1f', input: '#333333', btn: '#555555', text: '#ffffff'
    },
    'light': {
        bg: '#f0f0f0', container: '#ffffff', input: '#e0e0e0', btn: '#a8a8a8', text: '#000000'
    },
    'dark-blue': {
        bg: '#0a1b2a', container: '#102b40', input: '#163a59', btn: '#1e4d73', text: '#ffffff'
    },
    'blue-ocean': {
        bg: '#0e3d59', container: '#145374', input: '#1d6a96', btn: '#2389c8', text: '#ffffff'
    }
};
function changeTheme() {
    const selected = document.getElementById('theme-select').value;
    const t = themes[selected];

    for (const key in t) {
        document.documentElement.style.setProperty(`--${key}`, t[key]);
    }

    localStorage.setItem("theme", selected);
}
function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved && themes[saved]) {
        document.getElementById('theme-select').value = saved;

        const t = themes[saved];
        for (const key in t) {
            document.documentElement.style.setProperty(`--${key}`, t[key]);
        }
    }
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        todos = JSON.parse(data);
        render();
    }
}
loadTheme();  
loadTodos();   
