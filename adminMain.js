// get documents

const createNewStudentForm = document.getElementById("createNewStudentForm");
const studentResultUpdateForm = document.getElementById(
  "studentResultUpdateForm"
);
const studentDataList = document.getElementById("student_data_list");
const studentResultForm = document.getElementById("studentResultForm");
const msg = document.querySelector(".msg");
const btnClose = document.querySelectorAll(".btn-close");

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
 * Show All data
 */

const getAllStudents = () => {
  // get all data from ls
  const data = JSON.parse(localStorage.getItem("students"));

  let listStudentData = "";

  if (data) {
    data.reverse().map((item, index) => {
      listStudentData += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.rollNo}</td>
        <td>${item.regNo}</td>
        <td>${item.board}</td>
        <td>${timeAgo(item.createdAt)}</td>
        <td>
            ${
              item.result
                ? `
                ${
                  getFinalGradeAndGpa({
                    bangla: item.result.bangla,
                    english: item.result.english,
                    math: item.result.math,
                    science: item.result.socialScience,
                    social: item.result.science,
                    reli: item.result.religion,
                  }).grade
                }
                `
                : '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudentResult" onclick="addStudentResultModal(\'' +
                  item.id +
                  "')\">Add Result</button>"
            }
            
            
        </td>
        <td>
          <button class="btn btn-info" onclick="viewSingleStudent('${
            item.id
          }')"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger" onclick="deleteSingleStudent('${
            item.id
          }')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
        `;
    });
  }
  studentDataList.innerHTML = listStudentData;
};

getAllStudents();

/**
 * new student submit
 */

createNewStudentForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const {
    Institute,
    board,
    dateOfBarth,
    examination,
    fatherName,
    group,
    motherName,
    name,
    regNo,
    rollNo,
    type,
    year,
  } = data;

  // form validation
  if (
    !Institute ||
    !board ||
    !dateOfBarth ||
    !examination ||
    !fatherName ||
    !group ||
    !motherName ||
    !name ||
    !regNo ||
    !rollNo ||
    !type ||
    !year
  ) {
    return (msg.innerHTML = createAlert("All Fields are required"));
  }

  let oldData = [];

  // check data exist

  if (localStorage.getItem("students")) {
    oldData = JSON.parse(localStorage.getItem("students"));
  }

  oldData.push({
    id: createID(),
    Institute,
    board,
    dateOfBarth,
    examination,
    fatherName,
    group,
    motherName,
    name,
    regNo,
    rollNo,
    type,
    year,
    result: null,
    createdAt: Date.now(),
    updatedAt: null,
  });

  // send data to ls
  localStorage.setItem("students", JSON.stringify(oldData));
  e.target.reset();
  btnClose.forEach((item) => item.click());
  getAllStudents();
};

/**
 * Add student result
 */

const addStudentResultModal = (id) => {
  studentResultForm.querySelector('input[name="id"]').value = id;
};

/**
 * Student result form submit
 */

studentResultForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (!data.Bangla || !data.English || !data.Math) {
    return alert("All Fields are required");
  }

  // get all students
  const students = JSON.parse(localStorage.getItem("students"));

  // add result
  const updateStudent = students.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        result: {
          bangla: data.Bangla,
          english: data.English,
          math: data.Math,
          socialScience: data.SocialScience,
          religion: data.Religion,
          science: data.Science,
        },
      };
    } else {
      return item;
    }
  });

  // update ls
  localStorage.setItem("students", JSON.stringify(updateStudent));
  e.target.reset();
  btnClose.forEach((item) => item.click());
  getAllStudents();
};

// set single user data
const viewSingleStudent = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const singleStudent = studentData.find((item) => item.id == id);

  if (singleStudent) {
    localStorage.setItem("singleStudent", JSON.stringify(singleStudent));
    window.location.href = "singleStudentData.html";
  } else {
    alert("No data Found");
  }
};

const deleteSingleStudent = (id) => {
  const conformDelete = confirm("Are you sure");

  // get all students
  const students = JSON.parse(localStorage.getItem("students"));

  if (conformDelete) {
    const findDeleteUserId = students.filter((item) => item.id !== id);
    localStorage.setItem("students", JSON.stringify(findDeleteUserId));
    getAllStudents();
  }
};
