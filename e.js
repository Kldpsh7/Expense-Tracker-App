
//Adding event listner to form submit
document.getElementById('form').addEventListener('submit',(e)=>{
    //preventing default
    e.preventDefault()
    //creating an object with entered calues
    let obj={
        'amount':document.getElementById('amount').value,
        'discription':document.getElementById('disc').value,
        'category':document.getElementById('cat').value
    }
    //storing entered values to local storage
    localStorage.setItem(obj['discription'],JSON.stringify(obj));
    //updating on screen
    updateList()
    //Clearing input fields
    document.getElementById('amount').value='';
    document.getElementById('disc').value='';
})

//delete and edit button
let delBtn=document.createElement('button');
delBtn.className='delete';
delBtn.innerText='Delete';
delBtn.style='font-Size:10px;float:right; background-Color:red; margin-left:5px; margin-rigth:5px'
let editBtn=document.createElement('button');
editBtn.className='edit';
editBtn.innerText='Edit';
editBtn.style='font-Size:10px; float:right; background-Color:yellow; margin-left:5px; margin-rigth:5px'

//Displayig expenses on screen
function updateList(){
    let allitems={...localStorage};
    let list=document.getElementById('list');
    list.innerHTML='';
    for (const key in allitems) {
        let item=document.createElement('li');
        item.id=key;
        item.style='text-align:left';
        item.innerText=JSON.parse(allitems[key]).amount +' - '+
        JSON.parse(allitems[key]).discription+' - '+JSON.parse(allitems[key]).category;
        list.appendChild(item);
        item.appendChild(delBtn.cloneNode(true))
        item.appendChild(editBtn.cloneNode(true))
    }
}

updateList()

//adding edit and delete functionality
let list=document.getElementById('list');
list.addEventListener('click',(e)=>{
    if(e.target.className=='delete'){
        localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        e.target.parentElement.remove();
    }
    if(e.target.className=='edit'){
        //localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        document.getElementById('amount').value=e.target.parentElement.innerText.split(' - ')[0];
        document.getElementById('disc').value=e.target.parentElement.innerText.split(' - ')[1];
        localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        e.target.parentElement.remove();
    }
})