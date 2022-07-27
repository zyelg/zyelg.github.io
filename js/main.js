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

// Quiz
// Getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");

const option_list = document.querySelector(".option_list");

// If start quiz button is clicked
start_btn.onclick = ()=>{
  info_box.classList.add("activeInfo"); // shows the info box
}

// If exit button is clicked
exit_btn.onclick = ()=>{
  info_box.classList.remove("activeInfo"); // hides the info box
}

// If continue button is clicked
continue_btn.onclick = ()=>{
  info_box.classList.remove("activeInfo"); // hides the info box
  quiz_box.classList.add("activeQuiz"); // shows the quiz box
  showQuestions(0);
  qnsCounter(1);
  startTimer(15);
  startTimerLine(0);
}

let qns_count = 0;
let qns_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=> {
  result_box.classList.remove("activeResult");
  quiz_box.classList.add("activeQuiz");
  let qns_count = 0;
  let qns_num = 1;
  let timeValue = 15;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(qns_count);
  qnsCounter(qns_num);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
}

quit_quiz.onclick = ()=> {
  window.location.reload();
}

// If next button is clicked
next_btn.onclick = ()=> {
  if (qns_count < questions.length - 1) {
      qns_count++;
      qns_num++;
      showQuestions(qns_count);
      qnsCounter(qns_num);
      clearInterval(counter);
      startTimer(timeValue);
      clearInterval(counterLine);
      startTimerLine(widthValue);
      next_btn.style.display = "none";
  } else {
    console.log("No more questions left!");
    showResultBox();
  }
}

// Getting questions and options from array
function showQuestions(index) {
  const qns_text = document.querySelector(".qn_text");
  let qns_tag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>';
  let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                   + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                   + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                   + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
  qns_text.innerHTML = qns_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[qns_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore)
    answer.classList.add("correct")
    console.log("Answer is correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  }
  else {
    answer.classList.add("incorrect")
    console.log("Answer is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // If answers are inccorect then automatically selec the correct once
    for (let i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  // Once user selected disable all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  info_box.classList.remove("activeInfo"); // hides the info box
  quiz_box.classList.remove("activeQuiz"); // hides the quiz box
  result_box.classList.add("activeResult"); // shows the result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag = '<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore > 1) {
    let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
    scoreText.innerHTML = scoreTag;
  }
  else {
    let scoreTag = '<span>and sorry, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if(time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if(time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if(time > 549) {
      clearInterval(counterLine);
    }
  }
}


function qnsCounter(index) {
  const bottom_qns_counter = quiz_box.querySelector(".total_qns");
  let totalQuestionsCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>questions</span>'
  bottom_qns_counter.innerHTML = totalQuestionsCountTag;
}
