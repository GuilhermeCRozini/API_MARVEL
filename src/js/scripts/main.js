/**
 * Ao criar uma conta no site da Marvel, será gerado para você uma Public Key e uma Private Key
 * Para conseguir consumir a API utilizando o fetch por exemplo, é preciso gerar um MD5
 * Utilizei este site: https://blueimp.github.io/JavaScript-MD5/
 * Para gerar o md5, devo colocar da seguinte forma timeStamp Private Key e a Public Key, todos juntos
 * O timeStamp pode ser gerado com o código abaixo, depois ir no console do navegador e pegar o número gerado
 *  const identificaTimeStamp = Math.floor(Date.now() / 1000);
 *  console.log(identificaTimeStamp);
 */

const timeStamp = '1660013521';
const apiKey = 'e449ef6e7e513cd19ca925813189a018';
const md5 = 'f57e619917f30e810dd944d083d9bc5a';

const areaInfo = document.getElementById('container-info');
const botaoPesquisa = document.getElementById('btn-pesquisa');
  botaoPesquisa.disabled = true;
const inputPesquisa = document.getElementById('js-pesquisa');


//  Botão ativo apenas quanto tiver conteúdo no input
addEventListener('input', () => {
  let conteudo = inputPesquisa.value;
  if (conteudo !== null && conteudo !== '') {
    botaoPesquisa.disabled = false;
  } else {
    botaoPesquisa.disabled = true;
   }
})

botaoPesquisa.addEventListener('click', buscaPersonagem);

// Mapeando os botões enter e tab para validar pesquisa
inputPesquisa.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && inputPesquisa.value.length > 0) {
    buscaPersonagem()
  }
})

function buscaPersonagem() {
  areaInfo.innerHTML = '';
  let valueInput = inputPesquisa.value;

  fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${valueInput}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=1`)
    .then(response => response.json())
    .then(info => {
      info.data.results.map(element => {
        let nomeChar = element.name;
        let imagemChar = element.thumbnail.path + '.' + element.thumbnail.extension;
        let descricaoChar = element.description;

          createInfoPersonagem(nomeChar, imagemChar, descricaoChar);
      })
    })
}

function createInfoPersonagem(nomeChar, imagemChar, descricaoChar) {

  let todaInfo = document.createElement('div');
  todaInfo.className = 'info';
  areaInfo.appendChild(todaInfo);

  let divImagem = document.createElement('div');
  divImagem.className = 'imagem-personagem';
  todaInfo.appendChild(divImagem);

  let imagemPersonagem = document.createElement('img');
  imagemPersonagem.setAttribute('src', imagemChar);
  divImagem.appendChild(imagemPersonagem);

  let divNomeDescricao = document.createElement('div');
  divNomeDescricao.className = 'text-personagem';
  todaInfo.appendChild(divNomeDescricao);

  let nomePersonagem = document.createElement('h3');
  nomePersonagem.className = 'nome-personagem';
  nomePersonagem.textContent = nomeChar;
  divNomeDescricao.appendChild(nomePersonagem);

  let descricaoPersonagem = document.createElement('p');
  descricaoPersonagem.className = 'dados-personagem';
  descricaoPersonagem.textContent = descricaoChar;
  divNomeDescricao.appendChild(descricaoPersonagem);
}