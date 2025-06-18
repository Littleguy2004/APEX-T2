document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearErrors();
    
    let isValid = true;
    
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 2) {
        showError('fullNameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    const phone = document.getElementById('phone').value.trim();
    if (phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    const subject = document.getElementById('subject').value;
    if (!subject) {
        showError('subjectError', 'Please select a subject');
        isValid = false;
    }
    
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        alert('Form submitted successfully! 🎉');
        this.reset();
    } else {
        alert('Please fix the errors in the form before submitting.');
    }
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
    alert('Error: ' + message);
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = 'success';
    setTimeout(() => {
        element.textContent = '';
        element.className = '';
    }, 3000);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
    
    const status = document.getElementById('formStatus');
    status.textContent = '';
    status.className = '';
}

let todos = [];
let todoId = 1;

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: todoId++,
            text: text,
            completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
        alert('Task added successfully!');
    } else {
        alert('Please enter a task before adding.');
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
        alert('Task deleted successfully!');
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="btn btn-small btn-complete" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn btn-small btn-delete" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

let images = [];
let imageId = 1;

function addImage() {
    const urlInput = document.getElementById('imageUrl');
    const captionInput = document.getElementById('imageCaption');
    
    const url = urlInput.value.trim();
    const caption = captionInput.value.trim() || 'Untitled';
    
    if (url) {
        const image = {
            id: imageId++,
            url: url,
            caption: caption
        };
        
        images.push(image);
        urlInput.value = '';
        captionInput.value = '';
        renderGallery();
        alert('Image added successfully!');
    } else {
        alert('Please enter an image URL before adding.');
    }
}

function removeImage(id) {
    if (confirm('Are you sure you want to remove this image?')) {
        images = images.filter(img => img.id !== id);
        renderGallery();
        alert('Image removed successfully!');
    }
}

function renderGallery() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    
    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        div.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='">
            <div class="gallery-overlay">
                <div style="text-align: center;">
                    <div style="margin-bottom: 10px;">${image.caption}</div>
                    <button class="btn btn-small btn-delete" onclick="removeImage(${image.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        gallery.appendChild(div);
    });
}

document.getElementById('imageUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addImage();
    }
});

window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('todoInput').value = 'Complete HTML form validation';
        addTodo();
        document.getElementById('todoInput').value = 'Implement responsive design';
        addTodo();
        document.getElementById('todoInput').value = 'Add JavaScript functionality';
        addTodo();
    }, 500);
    
    setTimeout(() => {
        document.getElementById('imageUrl').value = 'https://picsum.photos/300/200?random=1';
        document.getElementById('imageCaption').value = 'Beautiful Landscape';
        addImage();
        
        document.getElementById('imageUrl').value = 'https://picsum.photos/300/200?random=2';
        document.getElementById('imageCaption').value = 'City Architecture';
        addImage();
        
        document.getElementById('imageUrl').value = 'https://picsum.photos/300/200?random=3';
        document.getElementById('imageCaption').value = 'Nature Photography';
        addImage();
    }, 1000);
});