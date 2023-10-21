const mostrarAlunos = (alunos) => {
    const conteudo = document.getElementById('tabela')
    alunos.forEach((aluno) => {
        const tabelaHTML = `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${aluno.nome}</span>
                <span class="disciplinaTbody">${aluno.turma}</span>
                <span class="ativoTbody" id="ativo">${aluno.ativo ? '<img src="../../../assets/images/Toggle.svg">' : '<img src="../../../assets/images/Toggle (1).svg">'}</span>
                <span class="acoesTbody">
                    <button id="editar" onclick="editarAluno(${aluno.id})"><img src="../../../assets/images/Property 1=editar.svg"></img></button>
                    <button id="excluir" onclick="excluirAluno(${aluno.id})"><img src="../../../assets/images/Property 1=excluir.svg"></img></button>
                </span> 
            </div>
        `

        conteudo.innerHTML = conteudo.innerHTML + tabelaHTML
        
    })
}
    

    // Função para direcionar para a pagina de edição do Aluno
    const editarAluno = (id) => {
    window.location = `../../../pages/novoUsuario/aluno/editar.html?id=${id}`
    }

    // Função para exclusão de aluno da API
    const excluirAluno = async (id) => {
        await fetch(`https://emocionometro-1.onrender.com/aluno/${id}`, { method: 'DELETE' })
        getAlunos()
        window.location = "../../../pages/users/alunos/index.html"
        }

// puxar os alunos da API.
const getAlunos = async () => {
    const apiURL = await fetch('https://emocionometro-1.onrender.com/aluno')
    const alunos = await apiURL.json()
    mostrarAlunos(alunos)
}

getAlunos()

const novoUsuario = () => {
    window.location = "../../../pages/novoUsuario/aluno/index.html"
}

// Cadastrar Alunos na API
const formulario = document.getElementById('formulario')

const cadastrarAluno = async (aluno) => {
    await fetch('https://emocionometro-1.onrender.com/aluno', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })

    window.location = "../../../pages/users/alunos/index.html"

}

const pesquisar = async () => {
    const pesquisa = document.getElementById('pesquisa').value
    let resultados = await fetch(`https://emocionometro-1.onrender.com/aluno?nome_like=${pesquisa}`)
    let resultadosFormatados = await resultados.json()
    mostrarResultado(resultadosFormatados)
   
}

const mostrarResultado = (alunos) => {
    const conteudo = document.getElementById('tabela')
    let corpo = `
        ${alunos.map(aluno => `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${aluno.nome}</span>
                <span class="disciplinaTbody">${aluno.turma}</span>
                <span class="ativoTbody" id="ativo">${aluno.ativo ? '<img src="../../../assets/images/Toggle.svg">' : '<img src="../../../assets/images/Toggle (1).svg">'}</span>
                    <button id="editar" onclick="editarAluno(${aluno.id})"><img src="../../../assets/images/Property 1=editar.svg"></img></button>
                    <button id="excluir" onclick="excluirAluno(${aluno.id})"><img src="../../../assets/images/Property 1=excluir.svg"></img></button>
                </span> 
            </div>
        `)}
    `
    conteudo.innerHTML = corpo
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const turma = formulario.elements['turma'].value
    const ativo = formulario.elements['ativo'].checked

    const aluno = {
        nome,
        turma,
        ativo
    }

    cadastrarAluno(aluno)

})




