//delete and edit button
let delBtn=document.createElement('button');
delBtn.className='delete';
delBtn.innerText='Delete';
delBtn.style='font-Size:10px;float:right; background-Color:red; margin-right:3px; margin-top:2px;'
let editBtn=document.createElement('button');
editBtn.className='edit';
editBtn.innerText='Edit';
editBtn.style='font-Size:10px; float:right; background-Color:yellow; margin-right:3px; margin-top:2px'

//Displayig expenses on screen
function updateList(items){
    let list=document.getElementById('list');
    for (let i of items) {
        let item=document.createElement('li');
        item.id=i.id;
        item.style='text-align:left';
        item.innerText=i.amount +' - '+i.description+' - '+i.category;
        list.appendChild(item);
        item.appendChild(delBtn.cloneNode(true))
        item.appendChild(editBtn.cloneNode(true))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    axios.get('/getExpenses')
    .then(res=>{
        updateList(res.data)
        analyze(res.data)
    })
    .catch(err=>console.log(err))
})

//adding edit and delete functionality
let list=document.getElementById('list');
list.addEventListener('click',(e)=>{
    if(e.target.className=='delete'){
        axios.get(`/deleteItem?id=${e.target.parentElement.id}`)
        .then(()=>e.target.parentElement.remove())
        .catch(err=>console.log(err))
    }
    if(e.target.className=='edit'){
        //localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        document.getElementById('amount').value=e.target.parentElement.innerText.split(' - ')[0];
        document.getElementById('disc').value=e.target.parentElement.innerText.split(' - ')[1];
        document.getElementById('did').value=e.target.parentElement.id;
        document.getElementById('submit').innerHTML='UPDATE';
        e.target.parentElement.remove();
    }
})

//Analyzer functionality
function analyze(allitems){
    var spendonFood=0;
    var spendonEntertainment=0;
    var spendonTravel=0;
    var spendonPhone=0;
    var spendonMedical=0;
    var spendonRent=0;
    var totalSpend=0;
    for (const i of allitems){
        if (i.category=='Food'){
            spendonFood+=Number(i.amount);
        }
        else if (i.category=='Entertainment'){
            spendonEntertainment+=Number(i.amount);
        }
        else if (i.category=='Travel'){
            spendonTravel+=Number(i.amount);
        }
        else if (i.category=='Phone'){
            spendonPhone+=Number(i.amount);
        }
        else if (i.category=='Medical'){
            spendonMedical+=Number(i.amount);
        }
        else if (i.category=='Rent'){
            spendonRent+=Number(i.amount);
        }
        totalSpend+=Number(i.amount);
    }
    document.getElementById('col1').children[1].innerText='Rs. '+spendonFood;
    document.getElementById('col1').children[2].innerText=(spendonFood*100/totalSpend).toFixed(2)+'%';
    document.getElementById('col2').children[1].innerText='Rs. '+spendonEntertainment;
    document.getElementById('col2').children[2].innerText=(spendonEntertainment*100/totalSpend).toFixed(2)+'%';
    document.getElementById('col3').children[1].innerText='Rs. '+spendonTravel;
    document.getElementById('col3').children[2].innerText=(spendonTravel*100/totalSpend).toFixed(2)+'%';
    document.getElementById('col4').children[1].innerText='Rs. '+spendonPhone;
    document.getElementById('col4').children[2].innerText=(spendonPhone*100/totalSpend).toFixed(2)+'%';
    document.getElementById('col5').children[1].innerText='Rs. '+spendonMedical;
    document.getElementById('col5').children[2].innerText=(spendonMedical*100/totalSpend).toFixed(2)+'%';
    document.getElementById('col6').children[1].innerText='Rs. '+spendonRent;
    document.getElementById('col6').children[2].innerText=(spendonRent*100/totalSpend).toFixed(2)+'%';
}