const listaDeProdutos = () => {
    return fetch('https://my-json-server.typicode.com/jmrcos/alura-geek-api/produtos')
        .then((resposta) => resposta.json())
        .catch((err) => console.log(err));
}

const createProduct = (nome, preco, imagem) => {
    return fetch('https://my-json-server.typicode.com/jmrcos/alura-geek-api/produtos', {
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

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Produto excluído com sucesso!');
        } else {
            console.error('Erro ao excluir o produto:', response.status);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};

export const servicesProducts = {
    listaDeProdutos,
    createProduct,
    deleteProduct,
};
