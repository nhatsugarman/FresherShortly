


const header = document.querySelector('.header')

const shrinkHeader = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    header.classList.add('shrink')
  } else {
    header.classList.remove('shrink')
  }
}

window.addEventListener('scroll', shrinkHeader)



// Toggle menu item


const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");



const activeClass = "is-show";
toggle.addEventListener("click", function () {
  menu.classList.add(activeClass);
});
window.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !e.target.matches(".menu-toggle")) {
    menu.classList.remove(activeClass);
  }
});

close.onclick = () => {
  menu.classList.remove(activeClass);
}

// Active shotern button 

const shorten = document.querySelector(".shorten");
const buttonShorten = document.querySelector(".shorten-button");
const copied = document.querySelectorAll(".shorten-item__copy");
const shortenContent = document.querySelector(".shorten-content");


buttonShorten.addEventListener("click", function (e) {
  shorten.classList.toggle('active');
  shortenContent.classList.toggle('active')
});


copied.forEach((item) => {
  item.onclick = () => {
    item.classList.add('copied');
  }
})

