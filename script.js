// const button = document.getElementById('addButton');

// btnClick.addEventListener("click", () => {window.location.href = "addhabit.html"});

const addButton = document.getElementById('addButton');
const plus = document.createElement('img');
plus.src = 'src/images/plus.png';
addButton.parentNode.replaceChild(plus, addButton);

plus.addEventListener('click', function(event){window.location.href = "addhabit.html"});