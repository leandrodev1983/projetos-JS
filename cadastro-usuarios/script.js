// script.js

// Adiciona um evento ao formulário para interceptar o envio
document.getElementById('formularioCadastro').addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o envio do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Verifica se estamos editando um registro existente
    const indexEditando = document.getElementById('formularioCadastro').getAttribute('data-index-editando');
    if (indexEditando !== null) {
        atualizarDado(indexEditando, nome, email);
    } else {
        adicionarDado(nome, email);
    }

    // Limpa o formulário e o estado de edição
    document.getElementById('formularioCadastro').reset();
    document.getElementById('formularioCadastro').removeAttribute('data-index-editando');
    document.querySelector('button[type="submit"]').textContent = 'Enviar';
});

// Função para adicionar um novo dado
function adicionarDado(nome, email) {
    // Cria um objeto com os dados
    const novoDado = {
        nome: nome,
        email: email
    };

    // Recupera os dados existentes do localStorage
    let dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro')) || [];

    // Adiciona o novo dado ao array
    dadosCadastro.push(novoDado);

    // Converte o array em JSON
    const dadosJSON = JSON.stringify(dadosCadastro);

    // Armazena os dados no localStorage
    localStorage.setItem('dadosCadastro', dadosJSON);

    // Exibe os dados cadastrados
    exibirDados();

    // Exibe uma mensagem de sucesso
    alert('Dados salvos com sucesso!');
}

// Função para atualizar um dado existente
function atualizarDado(index, nome, email) {
    let dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro')) || [];

    // Atualiza o dado no array
    dadosCadastro[index] = {
        nome: nome,
        email: email
    };

    // Converte o array em JSON
    const dadosJSON = JSON.stringify(dadosCadastro);

    // Armazena os dados no localStorage
    localStorage.setItem('dadosCadastro', dadosJSON);

    // Exibe os dados atualizados
    exibirDados();

    // Exibe uma mensagem de sucesso
    alert('Dados atualizados com sucesso!');
}

// Função para validar o e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para exportar os dados
function exportarDados() {
    const dadosJSON = localStorage.getItem('dadosCadastro');
    if (dadosJSON) {
        const blob = new Blob([dadosJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dadosCadastro.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Nenhum dado para exportar.');
    }
}

// Função para exibir os dados cadastrados
function exibirDados() {
    const dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro')) || [];
    const tbody = document.getElementById('tabelaDados').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior

    dadosCadastro.forEach((dado, index) => {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = dado.nome;
        tr.appendChild(tdNome);

        const tdEmail = document.createElement('td');
        tdEmail.textContent = dado.email;
        tr.appendChild(tdEmail);

        const tdAcoes = document.createElement('td');

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.classList.add('editar');
        botaoEditar.onclick = function() {
            editarDado(index);
        };
        tdAcoes.appendChild(botaoEditar);

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('remover');
        botaoRemover.onclick = function() {
            removerDado(index);
        };
        tdAcoes.appendChild(botaoRemover);

        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });
}

// Função para editar um dado
function editarDado(index) {
    let dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro')) || [];
    const dado = dadosCadastro[index];

    // Preenche o formulário com os dados existentes
    document.getElementById('nome').value = dado.nome;
    document.getElementById('email').value = dado.email;

    // Define o índice do dado sendo editado
    document.getElementById('formularioCadastro').setAttribute('data-index-editando', index);
    document.querySelector('button[type="submit"]').textContent = 'Atualizar';
}

// Função para remover um dado
function removerDado(index) {
    let dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro')) || [];
    dadosCadastro.splice(index, 1); // Remove o dado pelo índice

    // Converte o array em JSON
    const dadosJSON = JSON.stringify(dadosCadastro);

    // Armazena os dados no localStorage
    localStorage.setItem('dadosCadastro', dadosJSON);

    // Exibe os dados atualizados
    exibirDados();
}

// Exibe os dados cadastrados ao carregar a página
document.addEventListener('DOMContentLoaded', exibirDados);
