
const mostrarProfessores = (professores) => {
    const conteudo = document.getElementById('tabela')
    professores.forEach((professor) => {
        const tabelaHTML = `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${professor.nome}</span>
                <span class="disciplinaTbody">${professor.disciplina}</span>
                <span class="perfilTabelaTbody">${professor.perfil}</span>
                <span class="ativoTbody">on/off</span>
                <span class="acoesTbody">Ações</span> 
            </div>
        `
        conteudo.innerHTML = conteudo.innerHTML + tabelaHTML
    })
}

const getProfessores = async () => {
    const apiURL = await fetch('http:///localhost:3000/professor')
    const professores = await apiURL.json()
    mostrarProfessores(professores)
    console.log(professores)
}

getProfessores()

const novoUsuario = () => {
    window.location = "../../../pages/novoUsuario/professor/index.html"
}