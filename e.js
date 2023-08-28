
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
    //update analyzer
    analyze()
    //Clearing input fields
    document.getElementById('amount').value='';
    document.getElementById('disc').value='';
})

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
        analyze()
    }
    if(e.target.className=='edit'){
        //localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        document.getElementById('amount').value=e.target.parentElement.innerText.split(' - ')[0];
        document.getElementById('disc').value=e.target.parentElement.innerText.split(' - ')[1];
        localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
        e.target.parentElement.remove();
    }
})

function analyze(){
    var spendonFood=0;
    var spendonEntertainment=0;
    var spendonTravel=0;
    var spendonPhone=0;
    var spendonMedical=0;
    var spendonRent=0;
    var totalSpend=0;
    let allitems={...localStorage};
    for (const i in allitems){
        let obj=JSON.parse(allitems[i])
        if (obj.category=='Food'){
            spendonFood+=Number(obj.amount);
        }
        else if (obj.category=='Entertainment'){
            spendonEntertainment+=Number(obj.amount);
        }
        else if (obj.category=='Travel'){
            spendonTravel+=Number(obj.amount);
        }
        else if (obj.category=='Phone'){
            spendonPhone+=Number(obj.amount);
        }
        else if (obj.category=='Medical'){
            spendonMedical+=Number(obj.amount);
        }
        else if (obj.category=='Rent'){
            spendonRent+=Number(obj.amount);
        }
        totalSpend+=Number(obj.amount);
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
    document.getElementById('col6').children[2].innerText=(spendonRent*100/totalSpend).toFixed(2)+'%'

    

}
    


analyze()