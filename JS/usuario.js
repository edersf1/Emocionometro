let exibirSubMenu = false

function mostrarMenu(){
    const imgSeta = document.querySelector("#setaUsers")
    const subMenu = document.querySelector("#subMenu")
    const menuUser = document.querySelector("#menuUser")
    const span = document.querySelector("#span")

    if(!exibirSubMenu){
        imgSeta.src="../../assets/images/setaParaBaixo.svg"
        subMenu.style.display = "block"
        menuUser.style.background = "#faa81a7b"
        span.style.color = "#FFFF"
        exibirSubMenu = true
    }else{
        imgSeta.src="../../assets/images/setaUsersMarrom.svg"
        subMenu.style.display = "none"
        menuUser.style.background = "none"
        span.style.color = "#AA6F34"
        exibirSubMenu = false

    }

    
    
}