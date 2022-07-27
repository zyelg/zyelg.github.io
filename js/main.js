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
