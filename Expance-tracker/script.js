
const inputname = document.getElementById('expense-name');
const inputamount = document.getElementById('expense-amount');
const list = document.getElementById('expence-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let totalamount = 0;
tasks.forEach((task, index) => rendering(task, index));

document.getElementById("add").addEventListener('click',()=>{
    const inputvalue = inputname.value.trim()
    const amount = parseInt(inputamount.value.trim());

    if(inputvalue === '' || isNaN(amount)){
        alert('Please enter valid expanse name and amount');
        return;
    }

    const newtask = {
        id: Date.now(),
        text: inputvalue,
        amount: amount,
        completed: false,
    }
    tasks.push(newtask);
    inputname.value = '';
    inputamount.value = '';
    rendering(newtask, tasks.length - 1);
    savetasks();
})

function rendering(task, index){
    totalamount += task.amount;
    const li = document.createElement('tr');
    li.setAttribute('data-id',task.id);
     li.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${task.text}</td>
                        <td>${task.amount}</td>
                        <td>
                            <button id="edit" style="background-color: #007bff; color: white; border: none; border-radius: 3px;">Edit</button>
                            <button id="remove" style="background-color: #dc3545; color: white; border: none; border-radius: 3px;">Remove</button>
                        </td>
                    `;
    list.appendChild(li);
    li.querySelector('#remove').addEventListener('click',()=> {
        list.removeChild(li)
        tasks = tasks.filter((t)=>t.id !== task.id)
        savetasks();
        totalamount -= task.amount;
        document.getElementById('total-amount').textContent = `${totalamount}`;
    })
    li.querySelector('#edit').addEventListener('click',()=> {
        const newname = prompt('Enter new expense name', task.text);
        const newamount = parseInt(prompt('Enter new expense amount', task.amount));

         if (newname === null || newname.trim() === '' || isNaN(newamount)) {
          alert("Invalid input");
          return;
        }
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
            totalamount = totalamount - task.amount + newamount;

            task.text = newname.trim();
            tasks.amount = newamount;

            tasks[index] = task;

             li.children[1].textContent = newname.trim();
             li.children[2].textContent = newamount;

            document.getElementById('total-amount').textContent = `${totalamount}`;
            savetasks();
        }

    });
    
    document.getElementById('total-amount').textContent = `${totalamount}`;
    
}

function savetasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
