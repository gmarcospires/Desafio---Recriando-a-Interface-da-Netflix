  function TMDElements(prop){
    let url;
    var pesq;
      if(prop == 1){
         url =
        // "https://api.themoviedb.org/3/keyword/180547/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/keyword/849/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        "https://api.themoviedb.org/3/trending/movie/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/movie/popular?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        var divs = document.getElementById("carousel-inner");
      }else if (prop == 2){
        url =
        "https://api.themoviedb.org/3/keyword/180547/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/keyword/849/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/trending/movie/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/movie/popular?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        var divs = document.getElementById("carousel-inner2");
      } else if(prop == 3){
        url =
        // "https://api.themoviedb.org/3/keyword/180547/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        "https://api.themoviedb.org/3/keyword/849/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/trending/movie/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/movie/popular?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        var divs = document.getElementById("carousel-inner3");
      }else if(prop == 4){
        url =
         "https://api.themoviedb.org/3/tv/popular?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/keyword/180547/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/keyword/849/movies?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/trending/movie/week?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        // "https://api.themoviedb.org/3/movie/popular?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR";
        var divs = document.getElementById("carousel-inner3");
        var pesq = 'anime'
      }
    
fetch(url)
    .then(resp => resp.json())
    .then(ret => {
       
        var divImagem;
        var j = 0;
        divImagem = document.createElement("div");
        for (var i = 0; i < ret.results.length; i++) {
            //divs[i]
            element = ret.results[i];
            if(pesq != undefined){
                var a = ret.genre_ids;
                a.
            }
            let imagem = document.createElement("img");
            imagem.src =
                "https://image.tmdb.org/t/p/w600_and_h900_face" + element.poster_path;
            
            imagem.setAttribute("class", "box-filme d-block w-100")
            // imagem.classList.add("box-filme");
            // imagem.classList.add("d-block");
            // imagem.classList.add("w-100");
            imagem.alt = "Banner do filme " + element.title;

             
            // if(i==0){
            //     divImagem.setAttribute("class","item carousel-item itm");
            // }else{
            //     divImagem.setAttribute("class","item carousel-item itm");
            // }
            divImagem.setAttribute("class","item carousel-item itm");
        //    divImagem.setAttribute("style","display: "flex"")

            // let info = document.createElement("div");
            // //info.setAttribute("style","display:none;")
            // info.setAttribute("class", "item carousel-item active");

            // let name = document.createElement("p");
            // name.innerHTML = element.title;




            // let button = document.createElement("button");
            // let t = document.createElement("i");

            // t.setAttribute("class", "fas fa-info-circle");
            // button.setAttribute("onclick", "irPagina(" + element.id + ",'filme')");
            // button.setAttribute("class", "botao");
            // button.appendChild(t);
            // button.innerHTML = button.innerHTML + "Mais informações";

            // let div = document.createElement("div");

            // div.appendChild(name);
            // div.appendChild(button);


            // info.appendChild(div);

            divImagem.appendChild(imagem);
        }
        
         divs.appendChild(divImagem);
         let antigo = divImagem;
         for(let j = 0; j<ret.results.length-1;j++){
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