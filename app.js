var list = document.getElementById("list");
var inProgressList = document.getElementById("inProgressList");
var completeList = document.getElementById("completeList");

function showForm() {
    document.getElementById("addTodoButtonGroup").style.display = "none";
    document.getElementById("todoForm").style.display = "block";
}

function addtodo() {
    var projectNameInput = document.getElementById("projectName");
    var descriptionInput = document.getElementById("description");
    var deadlineInput = document.getElementById("deadline");
    var deadlineError = document.getElementById("deadlineError");

    // Clear previous error message
    deadlineError.textContent = "";

    if (projectNameInput.value.trim() === "" || descriptionInput.value.trim() === "" || deadlineInput.value.trim() === "") {
        alert("Please fill all fields.");
        return;
    }

    var deadlineDate = new Date(deadlineInput.value);
    var now = new Date();

    if (deadlineDate < now) {
        deadlineError.textContent = "Please select a future date and time.";
        return;
    }

    var todoList = document.createElement("li");
    todoList.className = "list-group-item d-flex justify-content-between align-items-center";
    todoList.draggable = true;
    todoList.ondragstart = drag;
    todoList.id = 'todo_' + Math.random().toString(36).substr(2, 9);

    var todoContent = `
        <div>
            <h5>${projectNameInput.value}</h5>
            <p>${descriptionInput.value}</p>
            <small>Due: ${deadlineDate.toLocaleString()}</small>
        </div>
    `;
    todoList.innerHTML = todoContent;
    list.appendChild(todoList);

    var deletBtn = document.createElement("button");
    deletBtn.className = "btn btn-danger btn-sm ml-2";
    var icon = document.createElement('i');
    icon.className = "fas fa-trash";
    deletBtn.appendChild(icon);
    todoList.appendChild(deletBtn);
    deletBtn.setAttribute('onclick', 'deletefunction(this)');

    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm ml-2";
    var editIcon = document.createElement('i');
    editIcon.className = "fas fa-edit";
    editBtn.appendChild(editIcon);
    todoList.appendChild(editBtn);
    editBtn.setAttribute('onclick', 'editfunction(this)');

    // Add status indicator dynamically
    var statusIndicator = document.createElement("div");
    statusIndicator.className = "status pending";
    statusIndicator.textContent = "Pending";
    todoList.appendChild(statusIndicator);

    // Clear the form and hide it
    projectNameInput.value = "";
    descriptionInput.value = "";
    deadlineInput.value = "";
    document.getElementById("todoForm").style.display = "none";
    document.getElementById("addTodoButtonGroup").style.display = "block";
}

function deletefunction(e) {
    e.parentNode.remove();
    updateStatus();
}

function editfunction(e) {
    var projectName = prompt("Edit project name", e.parentNode.querySelector('h5').innerText);
    var description = prompt("Edit description", e.parentNode.querySelector('p').innerText);
    var deadline = prompt("Edit deadline", e.parentNode.querySelector('small').innerText.replace('Due: ', ''));

    if (projectName && description && deadline) {
        e.parentNode.querySelector('h5').innerText = projectName;
        e.parentNode.querySelector('p').innerText = description;
        e.parentNode.querySelector('small').innerText = `Due: ${new Date(deadline).toLocaleString()}`;
    }
}

function deleteall() {
    list.innerHTML = "";
    inProgressList.innerHTML = "";
    completeList.innerHTML = "";
    updateStatus();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement);
    draggedElement.classList.remove('dragging');

    // Update status indicator after drop
    updateStatus();
}

function updateStatus() {
    var pendingCount = list.childElementCount;
    var inProgressCount = inProgressList.childElementCount;
    var completeCount = completeList.childElementCount;

    document.getElementById("status").textContent = `Status: Pending (${pendingCount})`;
    document.getElementById("statusInProgress").textContent = `Status: In Progress (${inProgressCount})`;
    document.getElementById("statusComplete").textContent = `Status: Complete (${completeCount})`;

    // Update status indicators dynamically based on lists
    Array.from(list.children).forEach(item => {
        item.querySelector('.status').textContent = "Pending";
    });
    Array.from(inProgressList.children).forEach(item => {
        item.querySelector('.status').textContent = "In Progress";
    });
    Array.from(completeList.children).forEach(item => {
        item.querySelector('.status').textContent = "Complete";
    });
}
