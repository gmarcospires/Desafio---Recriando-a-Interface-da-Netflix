async function carrossel() {
    await TMDElements(1);
    await TMDElements(2);
    await TMDElements(3);
    await TMDElements(4);
    await TMDElements(5);
}

carrossel();
let menuOpenBtn = document.querySelector(".container .sidebar-logo .logo_name");
let navbar = document.querySelector(".container .myNavbar");

let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    let minPerSlide
    if (window.matchMedia("(max-width: 575.9px) and and (orientation: portrait)").matches) {
        minPerSlide = 2
    } else if (window.matchMedia("(min-width: 576px) and (max-width: 767.9px)").matches) {
        minPerSlide = 3
    } else if (window.matchMedia("(min-width: 768px) and (max-width: 991.9px)").matches) {
        minPerSlide = 3
    } else if (window.matchMedia("(min-width: 992px) and (max-width: 1199.9px)").matches) {
        minPerSlide = 3
    } else if (window.matchMedia("(min-width: 1200px) and (max-width: 2559.9px)").matches) {
        minPerSlide = 7
    }
    else {
        minPerSlide = 3
    }

    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
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
    } else {
        navbar.style.left = "-100%";
    }
})

function main() {
    let mainTitulo = document.getElementById("mainTitulo");
    let mainDesc = document.getElementById("mainDesc");
    let filmePrincipal = document.getElementsByClassName("filme-pricipal")[0]
    let mainPlay = document.getElementById("mainPlay")
    let mainInfo = document.getElementById("mainInfo")
    let url =
        "https://api.themoviedb.org/3/trending/tv/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR&page=1&include_image_language=en,null";

    fetch(url)
        .then(resp => resp.json())
        .then(ret => {
            var element;
            let url2 = "https://api.themoviedb.org/3/tv/" + ret.results[Math.floor(Math.random() * (19 - 0) + 0)].id + "?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR"

            fetch(url2).then(resp => resp.json())
                .then(film => {
                    element = film;
                    let imagem =
                        "https://image.tmdb.org/t/p/original" + element.backdrop_path;
                    filmePrincipal.style.background = "linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)100%), url(" + imagem + ")"
                    filmePrincipal.style.backgroundSize = "100% 100%";
                    mainTitulo.innerHTML = element.name.toUpperCase();
                    mainDesc.innerHTML = element.overview;
                    mainPlay.addEventListener('click', () => {
                        window.open(
                            element.homepage,
                            '_blank'
                        );
                    })
                    let el = "#modal" + element.id;
                    mainInfo.setAttribute("data-bs-toggle", "modal")
                    mainInfo.setAttribute("data-bs-target", el)
                });
        })
}

main();
