import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector('[data-products]');
const form = document.querySelector('[data-form]');
const btnLimpar = document.querySelector('.add-produto__container-btns__btn__clear');

function createElement(nome, preco, imagem, id){
    const card = document.createElement('div'); 
    card.classList.add('produtos__card');
    
    card.innerHTML = `
        <img class="produtos__card__imagem" src="${imagem}" alt="${nome}">
        <div class="produtos__card__info">
            <h2 class="produtos__card__info__nome">${nome}</h2>
            <div class="produtos__card__info__preco">
                <span>$${preco},00</span>
                <button class="delete-button" data-id id="${id}">
                    <img src="./assets/icone-deletar.svg" alt='Ícone de deletar'>
                </button>           
        </div>
    `
    productContainer.appendChild(card);

    const btns = document.querySelectorAll("[data-id]")

    btns.forEach(btn => {btn.addEventListener('click', (e) => {
        e.preventDefault()
        servicesProducts.deleteProduct(id);
        btn.closest('.produtos__card').remove();
    })});

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

    alert('Produto adcionado com sucesso!')
    
})

function limparCampos(){
    const nome = document.querySelector('[data-name]').value='';
    const preco = document.querySelector('[data-price]').value='';
    const imagem = document.querySelector('[data-image]').value='';
}

btnLimpar.addEventListener('click', limparCampos)

render();
 


