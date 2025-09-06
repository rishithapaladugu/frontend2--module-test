let employeeName = document.getElementById("name");
let employeeProfession = document.getElementById("profession");
let employeeAge = document.getElementById("age");
let message = document.getElementById("message")
let addButton = document.getElementById("submit");
let employeeList = document.getElementById("employee-list")
let employeeCount = document.getElementById("employee-count");

let employees = [];
let idCounter = 1;

function addEmployee(event) {
    event.preventDefault();
    let name = employeeName.value.trim();
    let profession = employeeProfession.value.trim();
    let age = employeeAge.value.trim();
    message.className = "";

    if (!name || !profession || !age) {
        message.textContent = "Error: Please make sure all fields are filled before adding an employee!";
        message.classList.add("error");
        return;
    }

    if (Number(age) <= 0) {
        message.textContent = "Error: Age must be greater than 0!";
        message.classList.add("error");
        return;
    }

    let newEmployee = {
        id: idCounter++,
        name: name,
        profession: profession,
        age: Number(age)
    };

    employees.push(newEmployee);
    message.textContent = "Success: Employee Added!";
    message.classList.add("success");

    renderEmployees();

    // Clear input fields
    employeeName.value = "";
    employeeProfession.value = "";
    employeeAge.value = "";

    // Clear message after 3 seconds
    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 3000);
}

function renderEmployees() {

    console.log(employees);
    employeeList.innerHTML = ""; // Keep this line

    if (employees.length === 0) {
        employeeCount.textContent = "You have 0 Employees";
        return;
    }
    employeeCount.textContent = `You have ${employees.length} Employees`;

    employees.forEach((item) => {
        let employeeDetails = document.createElement("div");
        employeeDetails.className = "employee-details";
        let div = document.createElement("div");
        div.className = "each-employee";
        div.innerHTML =
            `<p>${item.id}.</p> <p>Name: ${item.name}</p> <p>Profession: ${item.profession}</p> <p>Age: ${item.age}</p>`;
        let button = document.createElement("button");
        button.className = "delete-button";
        button.textContent = "Delete";
        button.onclick = () => deleteEmployee(item.id);
        employeeDetails.appendChild(div);
        employeeDetails.appendChild(button);
        employeeList.appendChild(employeeDetails);
    });
}

function deleteEmployee(id) {
    const employeeToDelete = employees.find(item => item.id === id);
    if (confirm(`Are you sure you want to delete ${employeeToDelete.name} (${employeeToDelete.profession})?`)) {
        employees = employees.filter((item) => item.id !== id);
        message.className = "";
        message.textContent = "Success: Employee Deleted!";
        message.classList.add("success");
        renderEmployees();

        // Clear message after 3 seconds
        setTimeout(() => {
            message.textContent = "";
            message.className = "";
        }, 3000);
    }
}
addButton.addEventListener("click", addEmployee);
