const mostrarAlunos = (alunos) => {
    const conteudo = document.getElementById('tabela')
    alunos.forEach((aluno) => {
        const tabelaHTML = `
            <div class="tbody" id="tbody">
                <span class="nomeTbody">${aluno.nome}</span>
                <span class="disciplinaTbody">${aluno.disciplina}</span>
                <span class="perfilTabelaTbody">${aluno.perfil}</span>
                <span class="ativoTbody">on/off</span>
                <span class="acoesTbody">Ações</span> 
            </div>
        `
        conteudo.innerHTML = conteudo.innerHTML + tabelaHTML
    })
}

const getAlunos = async () => {
    const apiURL = await fetch('http://localhost:3000/aluno')
    const alunos = await apiURL.json()
    mostrarAlunos(alunos)
    console.log(alunos)
}

getAlunos()

const novoUsuario = () => {
    window.location = "../../../pages/novoUsuario/index.html"
}