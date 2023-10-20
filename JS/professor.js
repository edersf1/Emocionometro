
const mostrarProfessores = (professores) => {
    const conteudo = document.getElementById('tabela')
    professores.forEach((professor) => {
        const tabelaHTML = `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${professor.nome}</span>
                <span class="disciplinaTbody">${professor.disciplina}</span>
                <span class="perfilTabelaTbody">${professor.perfil}</span>
                <span class="ativoTbody" id="ativo">${professor.ativo ? '<img src="../../../assets/images/Toggle.svg">' : '<img src="../../../assets/images/Toggle (1).svg">'}</span>
                <span class="acoesTbody">
                    <button id="editar" onclick="editarProfessor(${professor.id})"><img src="../../../assets/images/Property 1=editar.svg"></img></button>
                    <button id="excluir" onclick="excluirProfessor(${professor.id})"><img src="../../../assets/images/Property 1=excluir.svg"></img></button>
                </span> 
            </div>
        `
        conteudo.innerHTML = conteudo.innerHTML + tabelaHTML
    })
}

// Função para direcionar para a pagina de edição do professor

const editarProfessor = (id) => {
    window.location = `../../../pages/novoUsuario/professor/editar.html?id=${id}`
}

// Função para exclusão de professor da API

const excluirProfessor = async (id) => {
    await fetch(`https://emocionometro-1.onrender.com/professor/${id}`, { method: 'DELETE' })
    getProfessores()
    window.location = "../../../pages/users/professor/index.html"
}

const getProfessores = async () => {
    const apiURL = await fetch('https:///emocionometro-1.onrender.com/professor')
    const professores = await apiURL.json()
    mostrarProfessores(professores)
}

getProfessores()

const novoUsuario = () => {
    window.location = "../../../pages/novoUsuario/professor/index.html"
}

// Cadastrar professores na API

const formulario = document.getElementById('formulario')

const cadastrarProfessor = async (professor) => {
    await fetch('https://emocionometro-1.onrender.com/professor', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
    })

    window.location = "../../../pages/users/professor/index.html"

}

const pesquisar = async () => {
    const pesquisa = document.getElementById('pesquisa').value
    let resultados = await fetch(`https://emocionometro-1.onrender.com/professor?nome_like=${pesquisa}`)
    let resultadosFormatados = await resultados.json()
    mostrarResultado(resultadosFormatados)
    // console.log("teste")
}


const mostrarResultado = (professores) => {
    const conteudo = document.getElementById('tabela')
    let corpo = `
        ${professores.map(professor => `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${professor.nome}</span>
                <span class="disciplinaTbody">${professor.disciplina}</span>
                <span class="perfilTabelaTbody">${professor.perfil}</span>
                <span class="ativoTbody" id="ativo">${professor.ativo ? '<img src="../../../assets/images/Toggle.svg">' : '<img src="../../../assets/images/Toggle (1).svg">'}</span>
                <span class="acoesTbody">
                    <button id="editar" onclick="editarProfessor(${professor.id})"><img src="../../../assets/images/Property 1=editar.svg"></img></button>
                    <button id="excluir" onclick="excluirProfessor(${professor.id})"><img src="../../../assets/images/Property 1=excluir.svg"></img></button>
                </span> 
            </div>
        `)}
    `
    conteudo.innerHTML = corpo
}


function botaoDesativar(){
    let ativar = true
    ativar = !ativar
    if(ativar == true){
        imgAtivo.src="../../../assets/images/Toggle.svg"
        ativar = true
    }else{
        imgAtivo.src="../../../assets/images/Toggle (1).svg"
        ativar = false
    }
   
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const disciplina = formulario.elements['disciplina'].value
    const perfil = formulario.elements['perfil'].value
    const ativo = formulario.elements['ativo'].checked

    const professor = {
        nome,
        disciplina,
        perfil,
        ativo
    }

    cadastrarProfessor(professor)

})