function on() {
    document.getElementById("add-goal-overlay").style.display = "block";
}

function off() {
    document.getElementById("add-goal-overlay").style.display = "none";
}

function addGoal() {
    const goalInput = document.getElementById("goal-input").value;
    const goalList = document.getElementById("goal-list");
    const goalItem = document.createElement("li");
    goalItem.textContent = goalInput;

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


