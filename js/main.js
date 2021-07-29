//Sidebar open close


let menuOpenBtn = document.querySelector(".container .sidebar-logo .logo_name");
let navbar = document.querySelector(".container .navbar");
let head = document.getElementById("header");
window.onscroll = function () {
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
             head.style.backgroundColor = 'var(--preto)';
        } else {
             head.style.backgroundColor = '';
        }
    });
  };

menuOpenBtn.addEventListener("click", () => {
    if (navbar.style.left === '' || navbar.style.left === '-100%') {
        navbar.style.left = "10px";
    }else {
        navbar.style.left = "-100%";
    }
})

