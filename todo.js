function addTask() {
    var taskInput = document.getElementById('task-input');
    var deadlineInput = document.getElementById('deadline-input');
    var taskList = document.getElementById('task-list');
    var isImportantCheckbox = document.getElementById('is-important');

    if (taskInput.value.trim() !== '') {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function() {
            var taskItem = this.parentNode;
            taskItem.parentNode.removeChild(taskItem);
        };

        li.innerHTML = '<label>' +
            taskInput.value +
            ' - Deadline: ' + (deadlineInput.value || 'No Deadline') +
            '</label>' +
            '<button class="delete-btn" onclick="deleteTask(this.parentNode)">Delete</button>';

        categorizeTask(li, deadlineInput.value, isImportantCheckbox.checked);
        li.insertBefore(checkbox, li.firstChild);
        taskList.appendChild(li);

        taskInput.value = '';
        deadlineInput.value = '';
        isImportantCheckbox.checked = false;
    }
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}

function categorizeTask(taskElement, deadline, isImportant) {
    var currentDate = new Date();
    var taskDeadline = deadline ? new Date(deadline) : null;
    var oneWeekFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // One week from now

    var overdue = taskDeadline && taskDeadline < currentDate;
    var withinWeek = taskDeadline && taskDeadline <= oneWeekFromNow && taskDeadline >= currentDate; // Within a week

    if ((overdue || withinWeek) && isImportant) {
        taskElement.classList.add('urgent-important');
    } else if (overdue || withinWeek) {
        taskElement.classList.add('urgent-not-important');
    } else if (isImportant) {
        taskElement.classList.add('not-urgent-important');
    } else {
        taskElement.classList.add('not-urgent-not-important');
    }
}

function drawMatrix() {
    var matrixContainer = document.getElementById('matrix-container');
    matrixContainer.innerHTML = ''; // Clear previous content

    var importantUrgent = document.querySelectorAll('.urgent-important label');
    var importantNotUrgent = document.querySelectorAll('.not-urgent-important label');
    var notImportantUrgent = document.querySelectorAll('.urgent-not-important label');
    var notImportantNotUrgent = document.querySelectorAll('.not-urgent-not-important label');

    createMatrixSection(matrixContainer, 'Important and Urgent', importantUrgent);
    createMatrixSection(matrixContainer, 'Important but Not Urgent', importantNotUrgent);
    createMatrixSection(matrixContainer, 'Not Important but Urgent', notImportantUrgent);
    createMatrixSection(matrixContainer, 'Not Important and Not Urgent', notImportantNotUrgent);
}

function createMatrixSection(container, title, tasks) {
    var section = document.createElement('div');
    section.classList.add('matrix-section');

    var heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);

    var taskList = document.createElement('ul');
    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.textContent = task.textContent;
        taskList.appendChild(li);
    });

    section.appendChild(taskList);
    container.appendChild(section);
}
