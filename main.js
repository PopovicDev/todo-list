class TaskList{
    constructor(){
        if(localStorage.getItem("Tasks") !== null){
            this.array = JSON.parse(localStorage.getItem("Tasks"));
        }
        else{
            this.array = [];
        }
    };

    addToList(task){
        this.array.push(task);
        localStorage.setItem("Tasks", JSON.stringify(this.array));
    }

    clearList(){
        this.array = [];
    }
}

class Task{
    constructor(id, text, completed, createdAt){
        this._id = parseInt(id);
        this._text = text;
        this._completed = completed;
        this._createdAt = createdAt;
    }
}

const task_input = document.getElementById('task-text');
const date_input = document.getElementById('date');
const tasks = document.getElementById('tasks');
const submit = document.getElementById('submit');
const edit = document.getElementById('edit-container');
const editButton = document.getElementById('edit');
const edit_text = document.getElementById('edit-text');
const edit_date = document.getElementById('edit-date');
const all = document.getElementById('all');
const active = document.getElementById('active');
const done = document.getElementById('done');
let ln;
let obj = new TaskList();
const [act, inact] = [["black", "2px solid gold", "white"], ["gold", "none", "black"]];
let statuses = [active.dataset.status, all.dataset.status, done.dataset.status];

let allList = () => {
    if(localStorage.getItem("Tasks") !== null){
        let list = JSON.parse(localStorage.getItem("Tasks"));
        tasks.innerHTML = "";
        list.map(el => {
            if(el._completed == true){
                tasks.innerHTML += `<div id="task">
                <h4>${el._text}</h4>
                <div id="task-buttons">
                    <h4 id="task-date">Issued on: ${el._createdAt}</h4>
                    <button id="delete" onclick="deleteTD(${el._id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>`;
            }
            else{
                tasks.innerHTML += `<div id="task">
                <h4>${el._text}</h4>
                <div id="task-buttons">
                    <h4 id="task-date">Issued on: ${el._createdAt}</h4>
                    <button id="finish" onclick="finishTD(${el._id})"><i class="fa-solid fa-check"></i></button>
                    <button id="editt" onclick="editTD(${el._id})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button id="delete" onclick="deleteTD(${el._id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>`;
            }
        });
        [all.style.backgroundColor, all.style.border, all.style.color] = act;
        [active.style.backgroundColor, active.style.border, active.style.color] = inact;
        [done.style.backgroundColor, done.style.border, done.style.color] = inact;
        statuses = ["false", "true", "false"];
    }
}

let activeList = () => {
    if(localStorage.getItem("Tasks") !== null){
        let list = JSON.parse(localStorage.getItem("Tasks"));
        tasks.innerHTML = "";
        list.filter(el => el._completed == false).map(el => {
        tasks.innerHTML += `<div id="task">
                <h4>${el._text}</h4>
                <div id="task-buttons">
                    <h4 id="task-date">Issued on: ${el._createdAt}</h4>
                    <button id="finish" onclick="finishTD(${el._id})"><i class="fa-solid fa-check"></i></button>
                    <button id="editt" onclick="editTD(${el._id})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button id="delete" onclick="deleteTD(${el._id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>`;
        });
        [active.style.backgroundColor, active.style.border, active.style.color] = act;
        [done.style.backgroundColor, done.style.border, done.style.color] = inact;
        [all.style.backgroundColor, all.style.border, all.style.color] = inact;
        statuses = ["true", "false", "false"];
    }
}

let doneList = () => {
    if(localStorage.getItem("Tasks") !== null){
        let list = JSON.parse(localStorage.getItem("Tasks"));
        tasks.innerHTML = "";
        list.filter(el => el._completed == true).map(el=>{
        tasks.innerHTML += `<div id="task">
                <h4>${el._text}</h4>
                <div id="task-buttons">
                    <h4 id="task-date">Issued on: ${el._createdAt}</h4>
                    <button id="delete" onclick="deleteTD(${el._id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>`;
        });
        [done.style.backgroundColor, done.style.border, done.style.color] = act;
        [active.style.backgroundColor, active.style.border, active.style.color] = inact;
        [all.style.backgroundColor, all.style.border, all.style.color] = inact;
        statuses = ["false", "false", "true"];
    }
}

let finishTD = (id) => {
    let list = JSON.parse(localStorage.getItem("Tasks"));
    list.map(el=>{
        if(el._id == id){
            el._completed = true;
        }
    });
    localStorage.setItem("Tasks", JSON.stringify(list));
    switch(statuses.indexOf("true")){
        case 0:
            activeList();
            break;
        case 1:
            allList();
            break;
        case 2:
            doneList();
            break;
    }
}

let editTD = (id) => {
    edit.style.display = "flex";
    let list = JSON.parse(localStorage.getItem("Tasks"));
    list.map(el=>{
        if(el._id == id){
            editButton.dataset.id = el._id;
            edit_text.value = el._text;
            edit_date.value = el._createdAt;
        }
    });
}

let editSubmit = () => {
    let list = JSON.parse(localStorage.getItem("Tasks"));
    list.map(el=>{
        if(el._id == editButton.dataset.id){
            el._text = edit_text.value;
            el._createdAt = edit_date.value;
        }
    });
    localStorage.setItem("Tasks", JSON.stringify(list));
    switch(statuses.indexOf("true")){
        case 0:
            activeList();
            break;
        case 1:
            allList();
            break;
        case 2:
            doneList();
            break;
    }
    edit.style.display="none";
}

let deleteTD = (id) => {
    let list = JSON.parse(localStorage.getItem("Tasks"));
    list.map(el=>{
        if(el._id == id){
            list.splice(id, 1);
        }
    });
    if(list.length > 0){
        for(let i=id;i < list.length;i++){
            list[i]._id--;
        }
        localStorage.setItem("Tasks", JSON.stringify(list));
        switch(statuses.indexOf("true")){
            case 0:
                activeList();
                break;
            case 1:
                allList();
                break;
            case 2:
                doneList();
                break;
        }
    }
    else{
        localStorage.removeItem("Tasks");
        localStorage.setItem("LN", 0);
        obj.clearList();
        ln = 0;
        tasks.innerHTML = "";
        [done.style.backgroundColor, done.style.border, done.style.color] = inact;
        [active.style.backgroundColor, active.style.border, active.style.color] = inact;
        [all.style.backgroundColor, all.style.border, all.style.color] = inact;
    }
}

submit.addEventListener('click', ()=>{
    obj.addToList(new Task(ln, task_input.value, false, date_input.value));
    ln++;
    localStorage.setItem("LN", ln);
    switch(statuses.indexOf("true")){
        case 0:
            activeList();
            break;
        case 1:
            allList();
            break;
        case 2:
            doneList();
            break;
        default:
            activeList();
            break;
    }
    task_input.value = "";
    date_input.value = "";
});

(()=>{
    if(localStorage.getItem("LN") !== null){
        ln = localStorage.getItem("LN");
    }
    else{
        ln = 0;
        localStorage.setItem("LN", ln);
    }
    activeList();
})();

all.addEventListener('click', ()=>{
    allList();
})

active.addEventListener('click', ()=>{
    activeList();
})

done.addEventListener('click', ()=>{
    doneList();
})
