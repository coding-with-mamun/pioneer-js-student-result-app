const single_user_data = document.getElementById("single_user_data");
const updateForm = document.getElementById("studentDataUpdateForm");
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
const singleStudent = JSON.parse(localStorage.getItem("singleStudent"));
if (!singleStudent) {
  // Get the current URL
  let baseURL = window.location.href;
  baseURL = baseURL.substring(0, baseURL.lastIndexOf("/") + 1);
  let redirectURL = baseURL + "admin.html";
  window.location.href = redirectURL;
}

// get single user
const getSingleUserData = () => {
  const singleStudent = JSON.parse(localStorage.getItem("singleStudent"));
  single_user_data.innerHTML = `
    <div class="student_img">
    <div class="result_head">
      <h2>${singleStudent?.examination} Result ${singleStudent?.year}</h2>
    </div>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0B-a72j6NKLtK8NxtMYXcFnR4APLht8eMk-bPZTdtbg&s"
      alt=""
    />
    </div>
    <div class="edu_student_info">
    <table>
      <tr>
        <td>Roll No</td>
        <td>${singleStudent?.rollNo}</td>
        <td>Name</td>
        <td>${singleStudent?.name}</td>
      </tr>
      <tr>
        <td>Board</td>
        <td>${singleStudent?.board}</td>
        <td>Father Name</td>
        <td>${singleStudent?.fatherName}</td>
      </tr>
      <tr>
        <td>Group</td>
        <td>${singleStudent?.group}</td>
        <td>Mother Name</td>
        <td>${singleStudent?.motherName}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>${singleStudent?.type}</td>
        <td>Date Of barth</td>
        <td>${singleStudent?.dateOfBarth}</td>
      </tr>
      <tr>
        <td>Result</td>
        <td>
        ${
          getFinalGradeAndGpa({
            bangla: singleStudent?.result?.bangla,
            english: singleStudent?.result?.english,
            math: singleStudent?.result?.math,
            science: singleStudent?.result?.socialScience,
            social: singleStudent?.result?.science,
            reli: singleStudent?.result?.religion,
          }).grade
        }
        </td>
        <td>Institute</td>
        <td>${singleStudent?.Institute}</td>
      </tr>
      <tr>
        <td>Gpa</td>
        <td colspan="3">${
          getFinalGradeAndGpa({
            bangla: singleStudent?.result?.bangla,
            english: singleStudent?.result?.english,
            math: singleStudent?.result?.math,
            science: singleStudent?.result?.socialScience,
            social: singleStudent?.result?.science,
            reli: singleStudent?.result?.religion,
          }).gpa
        }</td>
      </tr>
    </table>
    </div>
    
    <div class="result_head">
    <h2>Grade Sheet</h2>
    </div>
    <div class="edu_student_grade_sheet">
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Subject</th>
          <th>Mark</th>
          <th>Gpa</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>101</td>
          <td>Bangla</td>
          <td>${singleStudent?.result?.bangla || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.bangla).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.bangla).grade}</td>
        </tr>
        <tr>
          <td>102</td>
          <td>English</td>
          <td>${singleStudent?.result?.english || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.english).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.english).grade}</td>
        </tr>
        <tr>
          <td>103</td>
          <td>Math</td>
          <td>${singleStudent?.result?.math || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.math).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.math).grade}</td>
    
        </tr>
        <tr>
          <td>104</td>
          <td>Science</td>
          <td>${singleStudent?.result?.science || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.science).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.science).grade}</td>
        </tr>
        <tr>
          <td>105</td>
          <td>Social Science</td>
          <td>${singleStudent?.result?.socialScience || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.socialScience).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.socialScience).grade}</td>
        </tr>
        <tr>
          <td>106</td>
          <td>Religion</td>
          <td>${singleStudent?.result?.religion || null}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.religion).gpa}</td>
          <td>${getGradeAndGPA(singleStudent?.result?.religion).grade}</td>
        </tr>
      </tbody>
    </table>
    
    <div class ="d-flex gap-4 py-5 justify-content-center">
        <a href="#" onclick="goBackToMainPage()">Go back</a>
        <a href="#" class="btn btn-primary text-white px-4" data-bs-toggle="modal"
        data-bs-target="#studentDataUpdate" onclick="updateStudentData()">Update Data</a>
    </div>
    
    </div>
    
    `;
};

getSingleUserData();

// set update student data to input value
const updateStudentData = () => {
  const singleUser = JSON.parse(localStorage.getItem("singleStudent"));

  // Set input field values
  updateForm.querySelector('input[name="name"]').value = singleUser.name;
  updateForm.querySelector('input[name="fatherName"]').value =
    singleUser.fatherName;
  updateForm.querySelector('input[name="motherName"]').value =
    singleUser.motherName;
  updateForm.querySelector('input[name="rollNo"]').value = singleUser.rollNo;
  updateForm.querySelector('input[name="regNo"]').value = singleUser.regNo;
  updateForm.querySelector('input[name="dateOfBarth"]').value =
    singleUser.dateOfBarth;

  // Set select values
  updateForm.querySelector('select[name="Institute"]').value =
    singleUser.Institute;
  updateForm.querySelector('select[name="board"]').value = singleUser.board;
  updateForm.querySelector('select[name="year"]').value = singleUser.year;
  updateForm.querySelector('select[name="examination"]').value =
    singleUser.examination;

  // Set radio button values
  const groupRadioButtons = updateForm.querySelectorAll('input[name="group"]');
  groupRadioButtons.forEach((radioButton) => {
    if (radioButton.value === singleUser.group) {
      radioButton.checked = true;
    }
  });

  const typeRadioButtons = updateForm.querySelectorAll('input[name="type"]');
  typeRadioButtons.forEach((radioButton) => {
    if (radioButton.value === singleUser.type) {
      radioButton.checked = true;
    }
  });

  // Set result input field values
  updateForm.querySelector('input[name="Bangla"]').value =
    singleUser.result.bangla;
  updateForm.querySelector('input[name="English"]').value =
    singleUser.result.english;
  updateForm.querySelector('input[name="Math"]').value = singleUser.result.math;
  updateForm.querySelector('input[name="SocialScience"]').value =
    singleUser.result.socialScience;
  updateForm.querySelector('input[name="Science"]').value =
    singleUser.result.science;
  updateForm.querySelector('input[name="Religion"]').value =
    singleUser.result.religion;
};

/**
 * update student data
 */
updateForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const {
    Bangla,
    English,
    Math,
    Religion,
    Science,
    SocialScience,
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
  } = Object.fromEntries(form_data.entries());

  // get old data
  const getOldSingleData = JSON.parse(localStorage.getItem("singleStudent"));
  const getOldData = JSON.parse(localStorage.getItem("students"));

  const updateData = getOldData.map((item) => {
    if (item.id == getOldSingleData.id) {
      return {
        id: getOldSingleData.id,
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
        result: {
          bangla: Bangla,
          english: English,
          math: Math,
          socialScience: SocialScience,
          religion: Religion,
          science: Science,
        },

        createdAt: getOldSingleData.createdAt,
        updatedAt: new Date(),
      };
    } else {
      return item;
    }
  });

  localStorage.setItem(
    "singleStudent",
    JSON.stringify({
      id: getOldSingleData.id,
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
      result: {
        bangla: Bangla,
        english: English,
        math: Math,
        socialScience: SocialScience,
        religion: Religion,
        science: Science,
      },

      createdAt: getOldSingleData.createdAt,
      updatedAt: new Date(),
    })
  );
  localStorage.setItem("students", JSON.stringify(updateData));
  btnClose.forEach((item) => item.click());
  getSingleUserData();
};

// back button
const goBackToMainPage = () => {
  localStorage.removeItem("singleStudent");

  if (history.length > 1) {
    history.back();
  } else {
    // Get the current URL
    let baseURL = window.location.href;
    baseURL = baseURL.substring(0, baseURL.lastIndexOf("/") + 1);
    let redirectURL = baseURL + "admin.html";
    window.location.href = redirectURL;
  }
};
