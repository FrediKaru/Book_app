const controlPanel = document.querySelector('.controlPanel');
const app = document.querySelector('.app');

function createBookElement(el, content, className){
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}

function addButton() {
    const addButton = createBookElement("button", "Add", "addBtn");
    return controlPanel.append(addButton);
}
function searchButton() {
    const searchButton = createBookElement("input", "Search", "searchBtn");
    searchButton.setAttribute("placeholder", "Search books...")
    return controlPanel.append(searchButton);
}
searchButton();
addButton();

