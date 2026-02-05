const inputFilme = document.getElementById("tituloFilme");
const listarFilmes = document.getElementById("listaFilmes");

async function buscarFilmes() {
  const tituloFilme = inputFilme.value;
  inputFilme.value = "";
  inputFilme.focus();
  // Adicione sua chave da OpenWeatherMap API abaixo
  // Obtenha sua chave em: https://www.omdbapi.com/
  const APIKey = "SUA_CHAVE_AQUI";
  const url = `https://www.omdbapi.com/?s=${tituloFilme}&apikey=${APIKey}`;

  listarFilmes.innerHTML = "";
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.Response && dados.Search) {
      const totalEncontrado = parseInt(dados.totalResults);
      const totalFilmes = document.createElement("h2");
      totalFilmes.textContent = `Total Filmes: ${totalEncontrado}`;
      listarFilmes.append(totalFilmes);

      dados.Search.forEach((filme) => {
        const card = document.createElement("div");
        card.classList.add("filme-card");
        const imagem = document.createElement("img");
        imagem.src =
          filme.Poster !== "N/A"
            ? filme.Poster
            : "https://via.placeholder.com/300x450?text=Sem+Poster";
        const titulo = document.createElement("h1");
        titulo.textContent = filme.Title;
        const ano = document.createElement("p");
        ano.textContent = `Ano: ${filme.Year}`;
        card.append(imagem, titulo, ano);
        listarFilmes.appendChild(card);
      });
    } else {
      const messagemErro = document.createElement("p");
      messagemErro.textContent = `Erro: ${dados.Error}`;
      listarFilmes.appendChild(messagemErro);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
document.getElementById("filmeBtn").addEventListener("click", buscarFilmes);
