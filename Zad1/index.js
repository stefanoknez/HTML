let studenti = []
let sortAscending = true;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loadTable').addEventListener('click', loadStudents);
    document.getElementById('quickFilter').addEventListener('input', filter);
    document.getElementById('insert').addEventListener('click', insert);
    document.getElementById('sort').addEventListener('click', sort);
})

function loadStudents(){
    fetch('students.json')
        .then(response => {
            if(!response.ok){
                throw new Error("greska" + response.statusText);  
            }
            return response.json();
        })
}

function displayStudents(studentsToShow){
    const tbody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    studentsToShow.forEach(student => {
        const row = tbody.insertRow();
        row.insertCell().textContent = student.name;
        row.insertCell().textContent=student.surname;
        row.insertCell().textContent=student.birthdate;
        row.insertCell().textContent=student.email;
        row.insertCell().textContent=student.average_grade;
        row.insertCell().textContent=student.course;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            row.remove();
        });
        row.insertCell().appendChild();
    });
}

