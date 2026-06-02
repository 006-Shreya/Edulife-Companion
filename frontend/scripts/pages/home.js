const todayStudyElement = document.getElementById('today-study');
const weeklyTotalElement = document.getElementById('weekly-total');
const historyList = document.getElementById('history-list');

let studyHistory = JSON.parse(localStorage.getItem('studyHistory')) || [];
let totalStudyHours = JSON.parse(localStorage.getItem('totalStudyHours')) || 0;

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateStudyData() {
  const todayStudy = studyHistory
    .filter((item) => item.date === getTodayDate())
    .reduce((total, item) => total + item.hours, 0);
  const weeklyStudy = studyHistory.reduce((total, item) => total + item.hours, 0);

  todayStudyElement.textContent = todayStudy;
  weeklyTotalElement.textContent = weeklyStudy;

  historyList.innerHTML = '';
  studyHistory.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.date}: ${entry.hours} hours`;
    historyList.appendChild(li);
  });
}

function addStudyHours() {
  const studyInput = document.getElementById('study-hours');
  const studyHours = parseFloat(studyInput.value);
  if (studyHours > 0) {
    const todayDate = getTodayDate();
    studyHistory.push({ date: todayDate, hours: studyHours });
    totalStudyHours += studyHours;

    localStorage.setItem('studyHistory', JSON.stringify(studyHistory));
    localStorage.setItem('totalStudyHours', totalStudyHours);

    studyInput.value = '';
    updateStudyData();
  } else {
    alert('Please enter a valid number of hours.');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  sidebar.classList.toggle('open');
  mainContent.classList.toggle('shift');
}

updateStudyData();
