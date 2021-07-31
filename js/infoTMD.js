var assistir = "";
    
    const uri = window.location.href;
    const parte = uri.substring(uri.indexOf("?") + 1)
    const id = parte.substring(0,parte.indexOf("-"))
    var type = parte.substring(parte.indexOf("-") + 1)
    console.log(id)
    if(type == "serie"){
        type = "tv"
    }else if(type == 'filme'){
        type = "movie"
    }

     const url = "https://api.themoviedb.org/3/"+type+"/" + id + "?api_key=03c289251eafe042b3a223b60229cb92&language=pt-BR"
    
    fetch(url)
        .then(resp => resp.json())
        .then(ret => {
            var generob = "";
            var name = "";
            var duration = "";
            var criadores = "";
            var statusSerie = "";
            var temporadas = "";
            var banner = "";
            var descricaoCurta = "";
            var produtora = "";
            var dataInicio = "";
            

            if(type == "tv"){
                for (var a in ret.genres) {
                    generob = generob + ret.genres[a].name+ "<br> " ;
                }
                name = ret.name;
                duration = ret.runtime;
                avaliacoes = ret.vote_average;
                descricao = ret.overview;
                temporadas = ret.number_of_seasons;
                if(ret.episode_run_time > 60){
                    hora = Math.trunc(ret.episode_run_time / 60);
                    minuto = ret.episode_run_time%60;
                    duration = hora+" horas e "+minuto+" minutos"
                }else{
                    duration = ret.episode_run_time + " minutos";
                }
                statusSerie = ret.status;
                for (var a in ret.created_by) {
                    criadores = criadores +  ret.created_by[a].name +"<br> ";
                }
                banner ="https://image.tmdb.org/t/p/w1920_and_h1080_face"+ret.backdrop_path;
                assistir = ret.homepage;

                st = document.getElementById('status')
                st.innerHTML = statusSerie;

                dataInicio = ret.first_air_date;
                dataInicio = dataInicio.substring(0,dataInicio.indexOf("-"));
            }else if(type =="movie"){

                for (var a in ret.genres) {
                    generob = generob + ret.genres[a].name + "<br>";
                }
                name = ret.title;
                duration = ret.runtime;
                avaliacoes = ret.vote_average;
                descricao = ret.overview;
                if(ret.runtime > 60){
                    hora = Math.trunc(ret.runtime / 60);
                    minuto = ret.runtime % 60;
                    duration = hora+" horas e "+minuto+" minutos"
                }else{
                    duration = ret.episode_run_time + " minutos";
                }
                statusSerie = ret.status;
                for (var a in ret.created_by) {
                    criadores = criadores +  ret.created_by[a].name +"<br> ";
                }

                banner ="https://image.tmdb.org/t/p/w1920_and_h1080_face"+ret.backdrop_path;
                descricaoCurta = ret.tagline;
                   
                produtora = ret.production_companies[0].name;
                assistir = ret.homepage;

                dataInicio = ret.release_date;
                dataInicio = dataInicio.substring(0,dataInicio.indexOf("-"));
            }


            const botao = document.getElementById('botao')
            botao.setAttribute("onclick","ir()")

            const titulo = document.getElementById('titulo')
            titulo.innerHTML = name;

            const relevancia = document.getElementById('relevancia')
            relevancia.innerHTML = (avaliacoes*10) + "% Relevante"
            if(avaliacoes >= 5){
                relevancia.setAttribute("style","color:#46d369")
            }else{
                relevancia.setAttribute("style","color:red")
            }

            const fprn = document.getElementById("filmePrincipal")
            fprn.setAttribute("style","background-image: url("+banner+")")

            const desc = document.getElementById('descricao')
            desc.innerHTML = descricao

            const dur = document.getElementById('duracao')
            dur.innerHTML = duration;

            const gen = document.getElementById('genero')
            gen.innerHTML = generob;

            const cri = document.getElementById('criadores')
            if(criadores == "" || criadores == null){
                cri.innerHTML = "Sem Informação"
            }else{
                cri.innerHTML = criadores;
            }

            const temp = document.getElementById('temporadas')
            if(temporadas == "" || temporadas == null){
                temp.innerHTML = ""
            }else{
                temp.innerHTML = temporadas + " temporadas";
            }

            const descCurta = document.getElementById('descCurta')
            if(descricaoCurta == "" || descricaoCurta == null){
                descCurta.innerHTML = ""
            }else{
                descCurta.innerHTML = descricaoCurta ;
            }

            if(produtora){
                prod = document.getElementById('prod')
                prod.innerHTML = produtora;
            }else{
                prod = document.getElementById('prod')
                prod.innerHTML = "Sem informação";
            }

            if(statusSerie){
                st = document.getElementById('st')
                st.setAttribute('style','display:none')
            }

           const data = document.getElementById("criacao")
            data.innerHTML = dataInicio;
            
            /* 
            dados = {
                "titulo": name,
                "genero":generob,
                "duracao":duration,
                "descricao":descricao,
                "temporadas":temporadas,
                "criadores":criadores,
                "status": statusSerie,
                "avaliacoes":avaliacoes,
                "banner": banner,
                "descricaoCurta":descricaoCurta,
                "produtora":produtora,
                "assistir": assistir,
            } 
            
            console.log(dados)*/
        })

        function ir(){
            window.location.href = assistir;
        }