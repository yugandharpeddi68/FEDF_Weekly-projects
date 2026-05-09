let students = [];
let oldVDOM = [];

// -----------------------------
// INITIAL DATA
// -----------------------------
for (let i = 1; i <= 50; i++) {
    students.push({
        id: i,
        name: "Student " + i,
        present: false
    });
}

// -----------------------------
// RENDER TABLE
// -----------------------------
function render(data) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    data.forEach((s, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.present ? "Present" : "Absent"}</td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

// -----------------------------
// HIGHLIGHT ROW
// -----------------------------
function highlightRow(index) {
    const table = document.getElementById("tableBody");
    const row = table.rows[index];

    if (row) {
        row.classList.add("updated");
        setTimeout(() => {
            row.classList.remove("updated");
        }, 1000);
    }
}

// -----------------------------
// CLEAR INPUTS
// -----------------------------
function clearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("status").value = "true";
}

// -----------------------------
// ADD STUDENT
// -----------------------------
function addStudent() {
    const id = Number(document.getElementById("id").value);
    const name = document.getElementById("name").value.trim();
    const present = document.getElementById("status").value === "true";

    if (!id || !name) {
        alert("Please enter valid Student ID and Name!");
        return;
    }

    const exists = students.some(s => s.id === id);
    if (exists) {
        alert("Student ID already exists!");
        return;
    }

    students.push({ id, name, present });
    render(students);
    oldVDOM = createVDOM(students);
    clearInputs();
}

// -----------------------------
// UPDATE STUDENT
// -----------------------------
function updateStudent() {
    const id = Number(document.getElementById("id").value);
    const name = document.getElementById("name").value.trim();
    const present = document.getElementById("status").value === "true";

    if (!id || !name) {
        alert("Please enter valid Student ID and Name!");
        return;
    }

    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        students[index] = { id, name, present };
        render(students);
        highlightRow(index);
        oldVDOM = createVDOM(students);
        clearInputs();
    } else {
        alert("Student not found!");
    }
}

// -----------------------------
// DELETE STUDENT
// -----------------------------
function deleteStudent(index) {
    students.splice(index, 1);
    render(students);
    oldVDOM = createVDOM(students);
}

// -----------------------------
// DOM UPDATE
// -----------------------------
function updateDOM() {
    console.time("DOM Update");

    const table = document.getElementById("tableBody");

    students.forEach((s, index) => {
        s.present = Math.random() > 0.5;
        const row = table.rows[index];

        if (row) {
            row.cells[2].textContent = s.present ? "Present" : "Absent";
            highlightRow(index);
        }
    });

    oldVDOM = createVDOM(students);
    console.timeEnd("DOM Update");
}

// -----------------------------
// VIRTUAL DOM
// -----------------------------
function createVDOM(data) {
    return data.map(s => ({
        id: s.id,
        status: s.present ? "Present" : "Absent"
    }));
}

function diff(oldVDOM, newVDOM) {
    let changes = [];

    newVDOM.forEach((newNode, index) => {
        const oldNode = oldVDOM[index];
        if (!oldNode || oldNode.status !== newNode.status) {
            changes.push({ index, status: newNode.status });
        }
    });

    return changes;
}

function
patchDOM(changes) {
    const table = document.getElementById("tableBody");

    changes.forEach(change => {
        const row = table.rows[change.index];
        if (row) {
            row.cells[2].textContent = change.status;
            highlightRow(change.index);
        }
    });
}

// -----------------------------
// VDOM UPDATE
// -----------------------------
function updateVDOM() {
    console.time("VDOM Update");

    const previousVDOM = createVDOM(students);

    students.forEach(s => {
        s.present = Math.random() > 0.5;
    });

    const newVDOM = createVDOM(students);
    const changes = diff(previousVDOM, newVDOM);

    patchDOM(changes);
    oldVDOM = newVDOM;

    console.timeEnd("VDOM Update");
}

// -----------------------------
// LOAD TABLE
// -----------------------------
window.onload = () => {
    render(students);
    oldVDOM = createVDOM(students);
};
