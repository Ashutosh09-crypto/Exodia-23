let stars = document.getElementById('stars');
// let moon = document.getElementById('moon');
// let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('texted');
let btn = document.getElementById('btned');
let tryedit = document.getElementById("try");
// let mountains_front = document.getElementById('mountains_front');
let header = document.querySelector('header');


window.addEventListener('scroll', function () {
    let value = window.scrollY;
    stars.style.left = value * (-0.25) + 'px';
    // moon.style.top = value * 1.05 + 'px';
    // mountains_behind.style.top = value * 0.5 + 'px';
    // mountains_front.style.top = value * 0 + 'px';
    text.style.marginRight = value * (0.8) + 'px';
    btn.style.marginRight = value * (1) + 'px';
    // tryedit.style.marginTop =value * 1.5 + 'px';
    // header.style.top = value * 0.5 + 'px';


})

const buttons = document.querySelectorAll(".faq-toggle");

for (let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", () =>
    // console.log("click")
    buttons[i].parentElement.classList.toggle("active")
  );
}

// buttons.forEach((button) => {
  
// });
