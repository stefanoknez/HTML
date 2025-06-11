let subjects = [];
let ascending = true;

document.addEventListener("DOMContentLoaded", () => {
  fetch("subjects.json")
    .then(res => res.json())
    .then(data => {
      subjects = data;
      renderTable(subjects);
    });

  document.getElementById("selectAll").addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".row-checkbox");
    checkboxes.forEach(cb => cb.checked = this.checked);
  });

  document.getElementById("deleteBtn").addEventListener("click", () => {
    subjects = subjects.filter((_, idx) => {
      const cb = document.getElementById("checkbox-" + idx);
      return !(cb && cb.checked);
    });
    renderTable(subjects);
  });
});

function getTotalPoints(homeworks) {
  return homeworks.reduce((sum, hw) => sum + hw.points, 0);
}

function renderTable(data) {
  const tbody = document.querySelector("#subjectsTable tbody");
  tbody.innerHTML = "";

  data.forEach((subject, index) => {
    const total = getTotalPoints(subject.homeworks);
    const tr = document.createElement("tr");
    tr.className = total < 100 ? "low-points" : "";
    tr.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" id="checkbox-${index}"></td>
      <td>${subject.name}</td>
      <td>${subject.description}</td>
      <td>${subject.numberOfCredits}</td>
      <td>${total}</td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleSort() {
  subjects.sort((a, b) => {
    return ascending
      ? a.numberOfCredits - b.numberOfCredits
      : b.numberOfCredits - a.numberOfCredits;
  });
  ascending = !ascending;
  renderTable(subjects);
}

function filterSubjects() {
  const query = document.getElementById("filterInput").value.toLowerCase();
  const filtered = subjects.filter(subject =>
    subject.homeworks.some(hw =>
      hw.name.toLowerCase().includes(query)
    )
  );
  renderTable(filtered);
}