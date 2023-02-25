function createMenuElement(text, href) {
    return `<li><a href="${href}" class="nav-link">${text}</a></li>`
}

async function getMenu() {
    mainMenu = document.getElementById('main-menu')
    link = createMenuElement('Test Ata', '/')
    mainMenu.insertAdjacentHTML('beforeend', link)
}

getMenu()
