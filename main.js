const resultSearchForm = document.getElementById("resultSearchForm");
const edu_value_s = document.getElementById("edu_value_s");

// Get the select element
let selectElement = document.getElementById("year");

// Get the current year
let currentYear = new Date().getFullYear();

// Loop through years and create options
for (let year = currentYear; year >= 1990; year--) {
  let option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  selectElement.appendChild(option);
}

/**
 * Search result
 */

let pzl1 = getRandomNumber();
let pzl2 = getRandomNumber();
localStorage.setItem("edu_pzl", JSON.stringify({ a: pzl1, b: pzl2 }));

edu_value_s.innerHTML = `${pzl1} + ${pzl2}`;

resultSearchForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // get pzl data
  const pzlData = JSON.parse(localStorage.getItem("edu_pzl"));
  const studentData = JSON.parse(localStorage.getItem("students"));

  //check pzl

  if (pzlData.a + pzlData.b !== Number(data.value_s)) {
    return alert("Pzl Not match");
  }

  const searchData = studentData.find(
    (item) =>
      item.board == data.board &&
      item.examination == data.examination &&
      item.regNo == data.reg &&
      item.rollNo == data.roll &&
      item.year == data.year
  );

  if (searchData) {
    localStorage.setItem("searchData", JSON.stringify(searchData));

    window.location.href = "result.html";
  } else {
    alert("No data Found");
  }
};
