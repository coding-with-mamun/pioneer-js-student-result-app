const mark_sheet_info = document.getElementById("mark_sheet_info");

// get search result

const searchData = JSON.parse(localStorage.getItem("searchData"));

if (!searchData) {
  window.location.href = "index.html";
}

mark_sheet_info.innerHTML = `
<div class="student_img">
<div class="result_head">
  <h2>${searchData.examination} Result ${searchData.year}</h2>
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
    <td>${searchData.rollNo}</td>
    <td>Name</td>
    <td>${searchData.name}</td>
  </tr>
  <tr>
    <td>Board</td>
    <td>${searchData.board}</td>
    <td>Father Name</td>
    <td>${searchData.fatherName}</td>
  </tr>
  <tr>
    <td>Group</td>
    <td>${searchData.group}</td>
    <td>Mother Name</td>
    <td>${searchData.motherName}</td>
  </tr>
  <tr>
    <td>Type</td>
    <td>${searchData.type}</td>
    <td>Date Of barth</td>
    <td>${searchData.dateOfBarth}</td>
  </tr>
  <tr>
    <td>Result</td>
    <td>
    ${
      getFinalGradeAndGpa({
        bangla: searchData.result.bangla,
        english: searchData.result.english,
        math: searchData.result.math,
        science: searchData.result.socialScience,
        social: searchData.result.science,
        reli: searchData.result.religion,
      }).grade
    }
    </td>
    <td>Institute</td>
    <td>${searchData.Institute}</td>
  </tr>
  <tr>
    <td>Gpa</td>
    <td colspan="3">${
      getFinalGradeAndGpa({
        bangla: searchData.result.bangla,
        english: searchData.result.english,
        math: searchData.result.math,
        science: searchData.result.socialScience,
        social: searchData.result.science,
        reli: searchData.result.religion,
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
    <td>${searchData?.result?.bangla || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.bangla).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.bangla).grade}</td>
  </tr>
  <tr>
    <td>102</td>
    <td>English</td>
    <td>${searchData?.result?.english || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.english).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.english).grade}</td>
  </tr>
  <tr>
    <td>103</td>
    <td>Math</td>
    <td>${searchData?.result?.math || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.math).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.math).grade}</td>

  </tr>
  <tr>
    <td>104</td>
    <td>Science</td>
    <td>${searchData?.result?.science || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.science).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.science).grade}</td>
  </tr>
  <tr>
    <td>105</td>
    <td>Social Science</td>
    <td>${searchData?.result?.socialScience || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.socialScience).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.socialScience).grade}</td>
  </tr>
  <tr>
    <td>106</td>
    <td>Religion</td>
    <td>${searchData?.result?.religion || null}</td>
    <td>${getGradeAndGPA(searchData?.result?.religion).gpa}</td>
    <td>${getGradeAndGPA(searchData?.result?.religion).grade}</td>
  </tr>
  </tbody>
</table>

<a href="#" onclick="goBackToMainPage()">Search Agin</a>

</div>

`;

const goBackToMainPage = () => {
  localStorage.removeItem("searchData");
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = "./admin.html";
  }
};
