const achievements = {
  consistency: {
    id: 'consistency',
    title: 'Consistency',
    icon: 'fa-medal',
    levels: [
      { days: 7, text: '7 day streak', unlocked: false },
      { days: 30, text: '30 day streak', unlocked: false },
      { days: 100, text: '100 day streak', unlocked: false }
    ]
  },
  goalSetter: {
    id: 'goalSetter',
    title: 'Goal Setter',
    icon: 'fa-bullseye',
    levels: [
      { goals: 5, text: '5 goals completed', unlocked: false },
      { goals: 20, text: '20 goals completed', unlocked: false },
      { goals: 50, text: '50 goals completed', unlocked: false }
    ]
  },
  bookworm: {
    id: 'bookworm',
    title: 'Bookworm',
    icon: 'fa-book-reader',
    levels: [
      { books: 10, text: '10 books read', unlocked: false },
      { books: 25, text: '25 books read', unlocked: false },
      { books: 50, text: '50 books read', unlocked: false }
    ]
  }
};

let userProgress = {
  currentStreak: 0,
  completedGoals: 0,
  booksRead: 0,
  lastStudyDate: null
};

function loadUserProgress() {
  const savedProgress = localStorage.getItem('edulifeProgress');
  if (savedProgress) {
    userProgress = JSON.parse(savedProgress);
    updateAchievements();
  }
}

function saveUserProgress() {
  localStorage.setItem('edulifeProgress', JSON.stringify(userProgress));
  updateAchievements();
}

function updateStreak() {
  const today = new Date().toDateString();
  if (userProgress.lastStudyDate) {
    const lastDate = new Date(userProgress.lastStudyDate);
    const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      userProgress.currentStreak++;
    } else if (diffDays > 1) {
      userProgress.currentStreak = 1;
    }
  } else {
    userProgress.currentStreak = 1;
  }

  userProgress.lastStudyDate = today;
  saveUserProgress();
}

function updateAchievements() {
  const badgesContainer = document.querySelector('.badges');
  if (!badgesContainer) return;

  badgesContainer.innerHTML = '';

  Object.values(achievements).forEach((achievement) => {
    let currentLevel = null;

    switch (achievement.id) {
      case 'consistency':
        currentLevel = achievement.levels.find(
          (level) => userProgress.currentStreak >= level.days && !level.unlocked
        );
        break;
      case 'goalSetter':
        currentLevel = achievement.levels.find(
          (level) => userProgress.completedGoals >= level.goals && !level.unlocked
        );
        break;
      case 'bookworm':
        currentLevel = achievement.levels.find(
          (level) => userProgress.booksRead >= level.books && !level.unlocked
        );
        break;
    }

    if (currentLevel) {
      currentLevel.unlocked = true;
      showAchievementNotification(achievement.title, currentLevel.text);
    }

    const highestLevel = achievement.levels.reduce((highest, current) => {
      if (current.unlocked) {
        switch (achievement.id) {
          case 'consistency':
            return userProgress.currentStreak >= current.days ? current : highest;
          case 'goalSetter':
            return userProgress.completedGoals >= current.goals ? current : highest;
          case 'bookworm':
            return userProgress.booksRead >= current.books ? current : highest;
        }
      }
      return highest;
    }, null);

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.innerHTML = `
      <i class="fas ${achievement.icon}"></i>
      <span>${achievement.title}</span>
      <small>${highestLevel ? highestLevel.text : 'Not started'}</small>
    `;
    badgesContainer.appendChild(badge);
  });
}
