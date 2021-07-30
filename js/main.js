//Sidebar open close


let menuOpenBtn = document.querySelector(".container .sidebar-logo .logo_name");
let navbar = document.querySelector(".container .myNavbar");
// let head = document.getElementById("header");

//     console.log(head);
    
//     (window).scroll(function () {
//         if ((this).scrollTop() > 40) {
//             head.classList.remove('blur')
//             console.log(head);
//             //  head.style.backgroundColor += 'var(--preto) !important';
//         } else {
//             console.log(head.classList.add('blur'))
//             //  head.style.backgroundColor = '';
//             console.log("head");
//         }
//     });


 
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    let minPerSlide
    // number of slides per carousel-item
    if(window.matchMedia("(max-width: 575.9px) and and (orientation: portrait)").matches ){
        minPerSlide = 2
    }else if (window.matchMedia("(min-width: 576px) and (max-width: 767.9px)").matches){
        minPerSlide = 3
    }else if(window.matchMedia("(min-width: 768px) and (max-width: 991.9px)").matches){
        // TODO
        minPerSlide = 3 
    }else if(window.matchMedia("(min-width: 992px) and (max-width: 1199.9px)").matches){
        minPerSlide = 3 
    }else if(window.matchMedia("(min-width: 1200px) and (max-width: 2559.9px)").matches){
        minPerSlide = 5 
    }
    else{
        minPerSlide = 3
    }
    
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

menuOpenBtn.addEventListener("click", () => {
    if (navbar.style.left === '' || navbar.style.left === '-100%') {
        navbar.style.left = "10px";
    }else {
        navbar.style.left = "-100%";
    }
})

