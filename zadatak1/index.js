document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('loadTable').addEventListener('click',loadStudents);
    document.getElementById('quickFilter').addEventListener('input',filter);
    document.getElementById('insert').addEventListener('click',insert);
    document.getElementById('sort').addEventListener('click',sort);
});

let studenti=[];
let sortAscending=true;
function loadStudents() {
    fetch('students.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('greska '+response.statusText);
            }
            return response.json();
        })
        .then(data => {
            studenti=data;
            displayStudents(studenti);
        })
        .catch(error => console.error('greska s podacima ',error));
}

function displayStudents(studentsToShow) {
    const tbody=document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML='';

    studentsToShow.forEach(student => {
        const row=tbody.insertRow();
        row.insertCell().textContent=student.name;
        row.insertCell().textContent=student.surname;
        row.insertCell().textContent=student.birthdate;
        row.insertCell().textContent=student.email;
        row.insertCell().textContent=student.average_grade;
        row.insertCell().textContent=student.course;
        const deleteButton=document.createElement('button');
        deleteButton.textContent='Delete';
        deleteButton.addEventListener('click',function() {
            row.remove();
         //   return;
        })
        row.insertCell().appendChild(deleteButton);
    })
}

function filter() {
    const unos=document.getElementById('quickFilter').value.toUpperCase();
    const filteredStudents=studenti.filter(student => 
        Object.values(student).some(a => 
            String(a).toUpperCase().includes(unos)
        )
    );
    displayStudents(filteredStudents);
}

https://we.tl/t-yga2owauMS

function insert() {
    const tbody=document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const row=tbody.insertRow();
    const name=document.getElementById('newName').value;
    const surname=document.getElementById('newSurname').value;
    const birthdate=document.getElementById('newBirthdate').value;
    const email=document.getElementById('newEmail').value;
    const grade=parseFloat(document.getElementById('newGrade').value);
    const course=document.getElementById('newCourse').value;

    const newStudent={
        name,
        surname,
        birthdate,
        email,
        average_grade:grade,
        course
    };
    
    studenti.push(newStudent);
    displayStudents(studenti);
    document.getElementById('newName').value='';
    document.getElementById('newSurname').value='';
    document.getElementById('newBirthdate').value='';
    document.getElementById('newEmail').value='';
    document.getElementById('newGrade').value='';
    document.getElementById('newCourse').value='';
}

function sort() {
    studenti.sort((a,b) => {
        return sortAscending ? a.average_grade-b.average_grade : b.average_grade-a.average_grade;
    })
    displayStudents(studenti);
    sortAscending=!sortAscending;
}