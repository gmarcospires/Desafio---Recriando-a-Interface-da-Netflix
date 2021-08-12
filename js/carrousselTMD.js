async function TMDElements(prop) {
  let url;
  if (prop == 1) {
    url =
      "https://api.themoviedb.org/3/trending/movie/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR&page=1";
    var divs = document.getElementById("carousel-inner");
  } else if (prop == 2) {
    url =
      "https://api.themoviedb.org/3/keyword/180547/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
    var divs = document.getElementById("carousel-inner2");
  } else if (prop == 3) {
    url =
      "https://api.themoviedb.org/3/keyword/849/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
    var divs = document.getElementById("carousel-inner3");
  } else if (prop == 4) {
    url =
      "https://api.themoviedb.org/3/discover/tv?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR&with_keywords=210024&sort_by=popularity.desc";
    var divs = document.getElementById("carousel-inner4");
  } else if (prop == 5) {
    url =
      "https://api.themoviedb.org/3/trending/tv/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR&page=1";
    var divs = document.getElementById("carousel-inner5");
  }

  await fetch(url)
    .then(resp => resp.json())
    .then(ret => {

      var divImagem;
      var j = 0;
      var element;
      divImagem = document.createElement("div");
      for (var i = 0; i < ret.results.length; i++) {
        element = ret.results[i];
        let imagem = document.createElement("img");
        imagem.src =
          "https://image.tmdb.org/t/p/w600_and_h900_face" + element.poster_path;

        imagem.setAttribute("class", "box-filme w-100")
        imagem.alt = "Banner do filme " + element.title;
        divImagem.setAttribute("class", "item carousel-item itm");


        fazerModal({ id: ret.results[i].id, media_type: ret.results[i].media_type, prop: prop })

        let el = "#modal" + element.id
        imagem.setAttribute("data-bs-toggle", "modal")
        imagem.setAttribute("data-bs-target", el)
        
        divImagem.appendChild(imagem);

      }

      divs.appendChild(divImagem);
      let antigo = divImagem;
      for (let j = 0; j < ret.results.length - 1; j++) {
        let d = antigo.cloneNode(true);
        let filho = d.children[0]
        d.removeChild(filho)
        d.appendChild(filho)
        divs.appendChild(d);
        antigo = d;
      }
      divImagem.classList.add("active")

    });
}

async function fazerModal(element) {
  var url2;
  if (element.prop == 2 || element.prop == 3) {
    url2 = "https://api.themoviedb.org/3/movie/" + element.id + "?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR"
  } else if (element.prop == 4) {
    url2 = "https://api.themoviedb.org/3/tv/" + element.id + "?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR"
  } else {
    url2 = "https://api.themoviedb.org/3/" + element.media_type + "/" + element.id + "?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR"
  }



  var info;
  var duration;
  let generob = "";
  await fetch(url2).then(resp => resp.json())
    .then(film => {
      info = film;
    });
  let backdrops = "https://image.tmdb.org/t/p/w500/" + info.backdrop_path;
  let modals = document.getElementById("modals")


  if (info.runtime > 60) {
    let hora = Math.trunc(info.runtime / 60);
    let minuto = info.runtime % 60;
    duration = hora + " horas e " + minuto + " minutos"
  } else {
    duration = info.episode_run_time + " minutos";
  }

  if (element.media_type === 'movie' || element.prop == 2 || element.prop == 3) {
    let produtora = "";
    if (info.production_companies[0]) {
      for (var a in info.production_companies) {
        if (a == 0) {
          produtora = info.production_companies[a].name;
        } else {
          produtora = produtora + ", " + info.production_companies[a].name;
        }
      }
    } else {
      produtora = "Sem informação"
    }
    for (let a in info.genres) {
      if (a == 0) {
        generob = info.genres[a].name;
      } else {
        generob = generob + ", " + info.genres[a].name;
      }

    }
    let titulo = info.title;
    let func = () => {
      window.open(
        info.homepage,
        '_blank'
      );
    }
    modals.insertAdjacentHTML('afterbegin',
      '<div class="modal fade" id="modal' + info.id + '" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content" style="background: linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)100%), url(' + backdrops + '); background-repeat: no-repeat; background-size: 100% 100%;">' +
      '<div class="modal-header" >' +
      '<h5 class="modal-title" id="modalLabel">' + titulo + '</h5>' +
      '<button type="button" class="btn" id="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></button>' +
      '</div>' +
      '<div class="modal-body" >' +
      '<div class="info_modal">' +
      '<p id="modal_overview" class="overview ">' + info.overview + '</p>' +
      '<div id="info_modal_info" class=" overview2">' +
      '<p id="modal_runtime" class="d-block"> Duração: ' + duration + '</p>' +
      '<p id="modal_generos" class="d-inline"> Gêneros: ' + generob + '</p>' +
      '<p id="modal_produtora" class="d-block"> Produtora: ' + produtora + '</p>' +
      '</div>' +
      '</div>' +
      '<button id="btn_assistir' + info.id + '" type="button" role="button" class="btn btn2" onclick="' + func + '">' +
      '<i class="fas fa-play"></i> Assistir' +
      '</buton>' +
      '</div>' +
      '</div>' +
      '</div>'
    )
    document.getElementById('btn_assistir' + info.id).addEventListener('click', func)
  } else {
    let titulo = info.name
    let criadores = "";
    let duration = "";
    let temporadas = "";
    let produtora = "";

    for (let a in info.genres) {
      if (a === 0) {
        generob = info.genres[a].name;
      } else {
        generob = generob + ", " + info.genres[a].name;
      }

    }

    temporadas = info.number_of_seasons;
    if (info.production_companies[0]) {
      for (var a in info.production_companies) {
        if (a == 0) {
          produtora = info.production_companies[a].name;
        } else {
          produtora = produtora + ", " + info.production_companies[a].name;
        }
      }
    } else {
      produtora = "Sem informação"
    }

    if (info.episode_run_time > 60) {
      let hora = Math.trunc(info.episode_run_time / 60);
      let minuto = info.episode_run_time % 60;
      duration = hora + " horas e " + minuto + " minutos"
    } else {
      duration = info.episode_run_time + " minutos";
    }
    statusSerie = info.status;
    for (var a in info.created_by) {
      if (a == 0) {
        criadores = info.created_by[a].name;
      } else {
        criadores = criadores + ", " + info.created_by[a].name;
      }
    }
    let func = () => {
      window.open(
        info.homepage,
        '_blank'
      );
    }

    modals.insertAdjacentHTML('afterbegin',
      '<div class="modal fade" id="modal' + info.id + '" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content" style="background: linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)100%), url(' + backdrops + '); background-repeat: no-repeat; background-size: 100% 100%;">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title" id="modalLabel">' + titulo + '</h5>' +
      '<button type="button" class="btn" id="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></button>' +
      '</div>' +
      '<div class="modal-body" >' +
      '<div class="info_modal">' +
      '<p id="modal_overview" class="overview ">' + info.overview + '</p>' +
      '<div id="info_modal_info" class=" overview2">' +
      '<p id="modal_runtime" class="d-block"> Duração: ' + duration + '</p>' +
      '<p id="modal_produtora" class="d-block"> Produtora: ' + produtora + '</p>' +
      '<p id="modal_criadores" class="d-block"> Criadores: ' + criadores + '</p>' +
      '<p id="modal_generos" class="d-inline"> Gêneros: ' + generob + '</p>' +
      '</div>' +
      '</div>' +
      '<button id="btn_assistir' + info.id + '" type="button" role="button" class="btn btn2" onclick="' + func + '">' +
      '<i class="fas fa-play"></i> Assistir' +
      '</buton>' +
      '</div>' +
      '</div>' +
      '</div>'
    )
    document.getElementById('btn_assistir' + info.id).addEventListener('click', func)
  }

}