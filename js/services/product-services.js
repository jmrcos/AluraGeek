const listaDeProdutos = () => {
    return fetch('http://localhost:3000/produtos')
        .then((resposta) => resposta.json())
        .catch((err) => console.log(err));
}

const createProduct = (nome, preco, imagem) => {
    return fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            preco, 
            imagem,
        }),
    })
    .then((resposta) => resposta.json())
    .then((erro) => console.log(erro));

}

export const servicesProducts = {
    listaDeProdutos,
    createProduct,
};
