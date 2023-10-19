// Função para pesquisar o nome do aluno no navegador
const formulario = document.getElementById('formulario')
let alunoId = null

// Captura o id na url do navegador
const getIdUrl = () => {
    const paramString = window.location.search
    const params = new URLSearchParams(paramString)
    alunoId = params.get('id')
    console.log(alunoId)
}

const buscarAluno = async () => {
    const response = await fetch(`http://localhost:3000/aluno/${alunoId}`)
    const aluno = await response.json()
    return aluno
}

const carregarDadosFormulario = async (aluno) => {
    document.getElementById('nome').value = aluno.nome
    document.getElementById('turma').value = aluno.turma
    document.getElementById('ativo').checked = aluno.ativo
}

const carregarDados = async () => {
    getIdUrl()
    const aluno = await buscarAluno()
    carregarDadosFormulario(aluno)
}

const editarAluno = async (aluno) => {
    await fetch(`http://localhost:3000/aluno/${alunoId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })

    window.location = "../../../pages/users/alunos/index.html"
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

    editarAluno(aluno)

})


carregarDados()

