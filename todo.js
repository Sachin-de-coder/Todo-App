 document.addEventListener('DOMContentLoaded',()=>{
        const input = document.getElementById('input-field');
        const add = document.getElementById('add-input');
        const list = document.getElementById('input-list');
        const clear = document.getElementById('clear-list');

        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => rendering(task))
        add.addEventListener('click', () => {
            const textInput = input.value.trim();
            if(textInput === '') return;

            const newtask = {
                id:Date.now(),
                text:textInput,
                completed:false,
            }
            tasks.push(newtask); 
            savetask();
            input.value = '';
            rendering(newtask);
            emptyMessage();
            disappearbutton();
        });

        function rendering(task){
            const li = document.createElement('li');
            li.setAttribute('data-id',task.id);
            li.innerHTML= `${task.text} <button>Delete</button>`;
            list.appendChild(li);
            li.querySelector('button').addEventListener('click',()=>{
                list.removeChild(li);
                tasks = tasks.filter((t)=>t.id !== task.id);
                savetask();
                emptyMessage();
                disappearbutton();
            });
        }
        function savetask(){
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        
        input.addEventListener('keydown',(e)=>{
            if(e.key === 'Enter'){
                add.click();
            }
        });

        clear.addEventListener('click',() => {
            tasks = [];
             while (list.firstChild) {
                 list.removeChild(list.firstChild);
             }
            savetask();
            emptyMessage();
            disappearbutton();
        });
        function disappearbutton(){
            clear.style.display = tasks.length < 2 ? "none" : "inline";
        }
        disappearbutton();

        function emptyMessage(){
            const emptyMessage = document.getElementById("input-value-empty");
            emptyMessage.style.display = tasks.length === 0 ? "inline" : "none";
        }
        emptyMessage();
        });