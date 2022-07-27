// Assigning menu to div with class menu-icon
let menu = document.querySelector('.menu-icon');

// Assigning navbar to div with class menu
let navbar = document.querySelector('.menu');

// function for menu to work
menu.onclick = () => {
  navbar.classList.toggle('active'); // moves the 3 menu lines to an X
  menu.classList.toggle('move'); // Opens/closes the navbar
  bell.classList.remove('active'); // Close notifications when navbar is open
}

// Notification
let bell = document.querySelector('.notification');

document.querySelector('#bell-icon').onclick = () => {
  bell.classList.toggle('active');
}

// Custom Scroll Bar
window.onscroll = function() {mufunction()};

function mufunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
}

// Accordion Animation
const accordion = document.getElementsByClassName('contentBx');

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function() {
    this.classList.toggle('active')
  })
}

// Form Submission
function sendEmail() {
  alert('Form Submitted Successfully')
}

// Quiz
var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "What are red pandas classified as?",
    o : [
      "Procynonidae",
      "Ursidae",
      "Mustelidae",
      "Ailuriade"
    ],
    a : 3 // arrays start with 0, so answer is Ailuriade
  },
  {
    q : "Which country has the biggest habitat size for red pandas",
    o : [
      "Bhutan",
      "Nepal",
      "India",
      "China"
    ],
    a : 1
  },
  {
    q : "What is their preference when it comes to habitat range?",
    o : [
      "2400-3900 m",
      "2000-3000 m",
      "1500-2300 m",
      "1800-2900 m"
    ],
    a : 0
  },
  {
    q : "Which country has the most protected areas (10) for red pandas?",
    o : [
      "Nepal",
      "Bhutan",
      "China",
      "Myanmmar"
    ],
    a : 0
  },
  {
    q : "How many red pandas are left in the world??",
    o : [
      "8000",
      "9500",
      "10000",
      "15000"
    ],
    a : 3
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
