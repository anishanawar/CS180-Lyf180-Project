function onGoal() {
    document.getElementById("add-goal-overlay").style.display = "block";
}

function offGoal() {
    document.getElementById("add-goal-overlay").style.display = "none";
}

function addGoal() {
    const goalInput = document.getElementById("goal-input").value;
    const goalList = document.getElementById("goal-list");
    const goalItem = document.createElement("li");
    goalItem.textContent = goalInput;
    if (goalInput === "") {
        alert("Please enter a goal."); 
        return; 
    }
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "src/images/trashIcon.png";
    deleteIcon.alt = "delete";
    deleteButton.style.width = "10px";
    deleteButton.style.height = "10px";
    deleteButton.style.border = "none";
    deleteButton.style.background = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.position = "relative";
    deleteButton.style.left = "10px";
    deleteButton.style.top = "5px";
    deleteButton.appendChild(deleteIcon);

    deleteButton.onclick = () => {
        goalList.removeChild(goalItem);
    };

    goalItem.appendChild(deleteButton);
    goalList.appendChild(goalItem);
    document.getElementById("goal-input").value = "";
}

function clearGoals() {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";
}

function onHabit() {
    document.getElementById("add-habit-overlay").style.display = "block";
}

function offHabit() {
    document.getElementById("add-habit-overlay").style.display = "none";
}

function addHabit() {
    const habitInput = document.getElementById("habit-input").value;
    const habitList = document.getElementById("habit-list");
    const habitItem = document.createElement("li");
    habitItem.textContent = habitInput;
    if (habitInput === "") {
        alert("Please enter a habit."); 
        return; 
    }
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "src/images/trashIcon.png";
    deleteIcon.alt = "delete";
    deleteButton.style.width = "10px";
    deleteButton.style.height = "10px";
    deleteButton.style.border = "none";
    deleteButton.style.background = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.position = "relative";
    deleteButton.style.left = "10px";
    deleteButton.style.top = "5px";
    deleteButton.appendChild(deleteIcon);

    deleteButton.onclick = () => {
        habitList.removeChild(habitItem);
    };

    habitItem.appendChild(deleteButton);
    habitList.appendChild(habitItem);
    document.getElementById("habit-input").value = "";
}

function clearHabits() {
    const habitList = document.getElementById("habit-list");
    habitList.innerHTML = "";
}



