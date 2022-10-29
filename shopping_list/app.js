const inputText = document.querySelector('.application-input');
const btn = document.querySelector('.application-btn');
const appList = document.querySelector('.application-list');

btn.addEventListener("click", () => {
    addList(inputText);
});
inputText.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        addList(inputText);
    }
});

function addList(inputText){
    const span = document.createElement('span');
    span.setAttribute('class', 'text-span');
    const delBtn = document.createElement('button');
    delBtn.setAttribute('class', 'del-btn');
    delBtn.innerText = "❌";
    span.innerText = inputText.value;
    span.appendChild(delBtn);
    appList.append(span);
    inputText.value = '';
    btn.addEventListener("click", "delList");
};

function delList(event){
    const span = event.target.parentElement;
    span.remove();
}