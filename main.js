import { data } from './data.js';

// para pegar o elemento na tela
const container = document.getElementById('elemento-pai');
const header = document.getElementById('header');

//função para criar um HTML de um card
function createCard(item) {
    return `
    <div class="card_ponto_turistico">
    <div class="card_imagem">
        <img src="${item.imagem}" alt="${item.titulo}" />
    </div>
    <div class="card_detalhes">
        <div class="categorias">
    ${item.categorias.map(cat => `<span>${cat}</span>`).join('')}
        </div>

        <h1 class="titulo">${item.titulo}</h1>
    
        <p>${item.descricao}</p>
            

    </div>

</div>`;
}

//container.innerHTML += createCard(data[3]);
//container.innerHTML += createCard(data[5]);

//função para criar o header com cadegorias únicas e remove duplicadas usando set

// renderiza os cards e o header
function rendercards(data) {
    //gera todos os cards e junta como uma string
    const cards = data.map(createCard).join('');
    //adiciona todos os cards de uma vez ao DOM
    container.innerHTML = cards;
}

function createHeaderCategorias(data) {
    // extrai todos as categorias e remove duplicadas usando o set 
    const categoriasUnicas = ['todas', ...new Set(data.flatMap(item => item.categorias))];

    //cria o HTML do header com todas as categorias
    const categoriasHTML = categoriasUnicas
        .map(cat => `<button class="categorias-btn">${cat}</button>`).join("")
    header.innerHTML = categoriasHTML;


    // Adiciona evento de clique aos botões para filtrar
    const buttons = document.querySelectorAll('.categorias-btn')
    // laço de repeticao
    buttons.forEach((button, index) => {


        // Adiciona a class "active" ao primeiro botão
        if (index === 0) {
            button.classList.add('active');
        }
        // Adicionar o evento de click ao botao
        button.addEventListener('click', () => {
            const categoriaSelecionada = button.textContent;

            // funcao para realizar o filtro
            filtrarPorCategorias(categoriaSelecionada)

            // remover as class "active" de todos os botões
            buttons.forEach(btn => btn.classList.remove('active'));
            // adicionar a classe "active" ao botão clicado
            button.classList.add('active')
        });
    });
}

//função para filtrar os cards pot categorias
function filtrarPorCategorias(categoria) {
    if (categoria === 'todas') {
        rendercards(data); // se a categorias for "All", renderiza todos as cards
    } else {
        const filteredData = data.filter(item => item.categorias.includes(categoria))
        rendercards(filteredData); //renderiza apenas os cards filtrados
    }
}
//renderiza os cards e o header
rendercards(data);
createHeaderCategorias(data)

