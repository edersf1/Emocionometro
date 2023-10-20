// Função para pesquisar o nome do professor no navegador
const formulario = document.getElementById('formulario')
let professorId = null

// Captura o id na url do navegador
const getIdUrl = () => {
    const paramString = window.location.search
    const params = new URLSearchParams(paramString)
    professorId = params.get('id')
    console.log(professorId)
}

const buscarProfessor = async () => {
    const response = await fetch(`https://emocionometro-1.onrender.com/professor/${professorId}`)
    const professor = await response.json()
    return professor
}

const carregarDadosFormulario = async (professor) => {
    document.getElementById('nome').value = professor.nome
    document.getElementById('disciplina').value = professor.disciplina
    document.getElementById('perfil').value = professor.perfil
    document.getElementById('ativo').checked = professor.ativo
    botaoDesativar()
}

const carregarDados = async () => {
    getIdUrl()
    const professor = await buscarProfessor()
    carregarDadosFormulario(professor)
}

const editarProfessor = async (professor) => {
    await fetch(`https://emocionometro-1.onrender.com/professor/${professorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
    })

    window.location = "../../../pages/users/professor/index.html"
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
    editarProfessor(professor)

})

carregarDados()