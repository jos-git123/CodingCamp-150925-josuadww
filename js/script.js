document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const filterInput = document.getElementById('filter-input');
    const todoList = document.getElementById('todo-list');
    let todos = [];

    function renderTodos(filter = '') {
        todoList.innerHTML = '';
        todos
            .filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()))
            .forEach((todo, idx) => {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center bg-white border rounded-lg p-2 mb-2 shadow';
                li.innerHTML = `
                    <div>
                        <span class="font-semibold">${todo.text}</span>
                        <span class="text-gray-500 ml-2 text-sm">${todo.date}</span>
                    </div>
                    <button data-index="${idx}" class="delete-btn bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1">Delete</button>
                `;
                todoList.appendChild(li);
            });
    }

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = todoInput.value.trim();
        const date = dateInput.value;
        if (!text || !date) {
            alert('Please enter both a todo and a date.');
            return;
        }
        todos.push({ text, date });
        todoInput.value = '';
        dateInput.value = '';
        renderTodos(filterInput.value);
    });

    filterInput.addEventListener('input', function () {
        renderTodos(filterInput.value);
    });

    todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const idx = e.target.getAttribute('data-index');
            todos.splice(idx, 1);
            renderTodos(filterInput.value);
        }
    });

    renderTodos();
});