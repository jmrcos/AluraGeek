import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector('[data-products]');
const form = document.querySelector('[data-form]');

function createElement(nome, preco, imagem, id){
    const card = document.createElement('div'); 
    card.classList.add('produtos__card');
    
    card.innerHTML = `
        <img class="produtos__card__imagem" src="${imagem}" alt="${nome}">
        <div class="produtos__card__info">
            <h2 class="produtos__card__info__nome">${nome}</h2>
            <div class="produtos__card__info__preco">
                <span>$${preco},00</span>
                <button class="delete-button" data-id="${id}">
                    <img src="./assets/icone-deletar.svg" alt='Ícone de deletar'>
                </button>           
        </div>
    `
    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try{
        const listProduct = await servicesProducts.listaDeProdutos();
        listProduct.forEach(product => {
            productContainer.appendChild(
                createElement(product.nome, product.preco, product.imagem, product.id)
            );           
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nome = document.querySelector('[data-name]').value;
    const preco = document.querySelector('[data-price]').value;
    const imagem = document.querySelector('[data-image]').value;

    servicesProducts
        .createProduct(nome, preco, imagem)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    
})

render();