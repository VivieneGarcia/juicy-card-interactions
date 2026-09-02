document.addEventListener('DOMContentLoaded', () => {
  let yearsOld = 0;
  let intervalId = null;
  let longPressTimeout = null;
  const LONG_PRESS_DELAY = 200; // long press long

  const homeButton = document.querySelector('.home-button');
  const plusButton = document.getElementById('plus-button');
  const minusButton = document.getElementById('minus-button');
  const yearsOldText = document.getElementById('years-old');
  const container = document.querySelector('.container');

  const creditsBtn = document.getElementById('credits-button');
  const modal = document.getElementById('credits-modal');

  const dingSound = new Audio('assets/normal.wav');
  const rejectSound = new Audio('assets/error.mp3');
  const chingSound = new Audio('assets/ching.wav');

  const music = document.getElementById('background-music');
  const musicToggleButton = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');

  const originalContent = container.innerHTML;

  const body = document.body;

  function changeBackground(imagePath) {
    playDingSound();
    body.style.backgroundImage = `url('${imagePath}')`;
  }

  document.getElementById('blue').addEventListener('click', () => {changeBackground('assets/blue_background.png'); });
  document.getElementById('black').addEventListener('click', () => {changeBackground('assets/black_background.png'); });
  document.getElementById('pink').addEventListener('click', () => {changeBackground('assets/pink_background.png'); });
  document.getElementById('dirt').addEventListener('click', () => {changeBackground('assets/dirt_background.png'); });
  document.getElementById('green').addEventListener('click', () => {changeBackground('assets/green_background.png');});

  creditsBtn.addEventListener('click', () => {
    playChingSound();
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  });
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      playChingSound();
    }
  });

  const cardsData = {
    0: [],
    1: [
      { title: 'I\'m Alive', emojiSrc: 'assets/smile.png', content: 'woah', special: true },
      { title: 'Parents', emojiSrc: 'assets/heart.png', content: 'Soneta and Vivencio' },
      { title: 'Siblings', emojiSrc: 'assets/heart.png', content: 'Starra and Vince' },
      { title: 'Gender', emojiSrc: 'assets/spade.png', content: 'Girl / Babae / Female' },
    ],
    7: [
      { title: 'Timeskip', emojiSrc: 'assets/time.png', content: 'Bad Memory' },
      { title: 'Drawerist', emojiSrc: 'assets/smile.png', content: 'Saw a comic book and got completely hooked. I HAD to learn that skill.', special: true },
    ],
    15: [ //4th
      { title: 'Timeskip', emojiSrc: 'assets/time.png', content: 'Bad Memory' },
      { title: 'TRY HARD', emojiSrc: 'assets/spade.png', content: '4th Year HighSchool: Pabibo days. Legit Study Hard! ' },
      { title: 'WITH HONORS', emojiSrc: 'assets/haha.png', content: 'First time on stage with a medal, yay. Super duper proud of myself. Will always brag', special: true },
    ],
    16: [ // sti 1st 19
      { title: 'Taste of Money', emojiSrc: 'assets/spade.png', content: 'Got my first art commission on FB. #RICHGURL #300PesosFeelsSoGood',  special: true  },
      { title: 'Senior High', emojiSrc: 'assets/diamond.png', content: 'First time cutting class. #heheCoolKid'},
    ],
    17: [ // sti online 20
      { title: 'Pandemic', emojiSrc: 'assets/cry.png', content: 'Online Class #tinamadWalangNatutunan #24/7Sleep' , special: true},
      { title: 'First Tablet', emojiSrc: 'assets/haha.png', content: 'Bought my first screen drawing tablet! yay more drawings.'},
    ],
    18: [ // 1st year psych 21
      { title: 'Adult', emojiSrc: 'assets/heart.png', content: 'I can get arrested now, sheesh.' },
      { title: 'College !!!', emojiSrc: 'assets/spade.png', content: 'BS Psych. Almost took a gap year and freelanced, but i got scared', special: true },
      { title: 'BS Psychology', emojiSrc: 'assets/diamond.png', content: 'Binge-watched K-drama for a project? I DON\'T LIKE Biology. Fav subject: MMW'},
      { title: 'Bad Year', emojiSrc: 'assets/cry.png', content: 'Worst year of mah life i think' },
    ],
    19: [ // 1st year 22
      { title: 'College Ver. 2', emojiSrc: 'assets/haha.png', content: 'HAHAHAHA nag-shift' },
      { title: 'Computer Science', emojiSrc: 'assets/question_black.png', content: 'I lowkey fw coding and logic', special: true },
      { title: 'Start of an Addiction', emojiSrc: 'assets/spade.png', content: 'Tiktok Screen time: 5 Billion Hours' },
    ],
    20: [ // 2nd year 23
      { title: 'First Kinda Good App', emojiSrc: 'assets/haha.png', content: 'OOP Project: Karipas. Coding finally clicked!!! Bad Coding but WoAH', special: true},
    ],
    21: [ // 3rd year 2024
      { title: 'PRESENT', emojiSrc: 'assets/diamond.png', content: 'Wow, I\'m here.', special: true},
      { title: 'Drawing Addict', emojiSrc: 'assets/haha.png', content: 'Drawing, Coding & Sleep' },
      { title: 'Fave food rn', emojiSrc: 'assets/smile.png', content: 'Jolly Hotdog - 69 php' },
      { title: 'Hmm?', emojiSrc: 'assets/question_black.png', content: 'Still figuring things out... ' },
    ],
  };

  function playDingSound() {
    dingSound.currentTime = 0;
    dingSound.play();
  }

  function playRejectSound() {
    rejectSound.currentTime = 0;
    rejectSound.play();
  }
  function playChingSound(){
    chingSound.currentTime = 0;
    chingSound.play();
  }

  function triggerShakeAnimation() {
    yearsOldText.classList.add('shake');
    setTimeout(() => yearsOldText.classList.remove('shake'), 500);
  }

  function triggerBounceAnimation() {
    yearsOldText.classList.add('bounce');
    setTimeout(() => yearsOldText.classList.remove('bounce'), 300);
  }

  function createCard({ title, emojiSrc, content }) {
    const box = document.createElement('div');
    box.classList.add('box');

    const boxTitle = document.createElement('h2');
    boxTitle.textContent = title;

    const emoji = document.createElement('img');
    emoji.src = emojiSrc;
    emoji.alt = `${title} Icon`;
    emoji.classList.add('emoji');

    const contentParagraph = document.createElement('p');
    contentParagraph.innerHTML = content;

    box.appendChild(boxTitle);
    box.appendChild(emoji);
    box.appendChild(contentParagraph);

    return box;
  }

  function createSpecialCard({ title, emojiSrc, content }) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.id = 'special';
  
    const boxTitle = document.createElement('h2');
    boxTitle.textContent = title;
  
    const emoji = document.createElement('img');
    emoji.src = emojiSrc;
    emoji.alt = `${title} Icon`;
    emoji.classList.add('emoji');
  
    const contentParagraph = document.createElement('p');
    contentParagraph.innerHTML = content;
  
    box.appendChild(boxTitle);
    box.appendChild(emoji);
    box.appendChild(contentParagraph);
  
    return box;
  }
  
  function updateCards() {
  console.log(`Updating cards for age: ${yearsOld}`);
  container.innerHTML = yearsOld === 0 ? originalContent : '';

  if (cardsData[yearsOld]) {
    cardsData[yearsOld].forEach((cardData, index) => {

      const isSpecialCard = (cardData.special === true); 
      const card = isSpecialCard ? createSpecialCard(cardData) : createCard(cardData);
      container.appendChild(card);
    });
  }
}

  function getValidAges() {
    return Object.keys(cardsData).map(Number); 
  }

  function incrementYears() {
    const validAges = getValidAges();
    const currentIndex = validAges.indexOf(yearsOld);

    console.log(`Current age: ${yearsOld}, Next valid age index: ${currentIndex}`);  

    // Check if the next valid age exists
    if (currentIndex !== -1 && currentIndex < validAges.length - 1) {
      yearsOld = validAges[currentIndex + 1];
      console.log(`Incremented age: ${yearsOld}`); 
      yearsOldText.textContent = yearsOld === 1 ? `${yearsOld} year old` : `${yearsOld} years old`;
      playDingSound();
      triggerBounceAnimation();
      updateCards();
    } else {
      playRejectSound();
      triggerShakeAnimation();
    }
  }

  function decrementYears() {
    const validAges = getValidAges();
    const currentIndex = validAges.indexOf(yearsOld);

    console.log(`Current age: ${yearsOld}, Previous valid age index: ${currentIndex}`); 

    if (currentIndex > 0) {
      yearsOld = validAges[currentIndex - 1];
      console.log(`Decremented age: ${yearsOld}`); 

      if (yearsOld === 0) {
        yearsOldText.textContent = 'VIVS\' CARDS';
      } else if (yearsOld === 1) {
        yearsOldText.textContent = `${yearsOld} year old`;
      } else {
        yearsOldText.textContent = `${yearsOld} years old`; 
      }

      playDingSound();
      triggerBounceAnimation();
      updateCards();
    } else {
      playRejectSound();
      triggerShakeAnimation();
    }
}


  function startLongPress(action) {
    if (intervalId) return;
    intervalId = setInterval(action, 100); // Adjust speed 
  }

  function stopLongPress() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Handle button press for both single click and long press
  function handleButtonPress(button, action) {
    button.addEventListener('mousedown', () => {
      longPressTimeout = setTimeout(() => {
        startLongPress(action);
      }, LONG_PRESS_DELAY);
    });

    button.addEventListener('mouseup', () => {
      clearTimeout(longPressTimeout);
      if (!intervalId) action();
      stopLongPress();
    });

    button.addEventListener('mouseleave', () => {
      clearTimeout(longPressTimeout);
      stopLongPress();
    });
  }

  // Attach listeners to buttons
  handleButtonPress(plusButton, incrementYears);
  handleButtonPress(minusButton, decrementYears);

  musicToggleButton.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicIcon.src = "assets/volume_off.png";
    } else {
      music.pause();
      musicIcon.src = "assets/volume_on.png";
    }
  });

  homeButton.addEventListener('click', () => {
    yearsOld = 0;
    location.reload(); // Resetting to 0
    console.log(`Homed, yearsOld reset to: ${yearsOld}`);
  });
});
