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
    goalList.appendChild(goalItem);
    document.getElementById("goal-input").value = "";
}

function clearGoals() {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";
}


