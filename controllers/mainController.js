const path = require('path');
const Expense = require('../models/expenseModel');

module.exports.getHome = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','Expense.html'))
}

module.exports.postExpense = (req,res,next)=>{
    const delId = req.body.did;
    if(!delId){
        Expense.create({
            amount:req.body.amount,
            description:req.body.description,
            category:req.body.category
        })
        .then(()=>res.redirect('/'))
        .catch(err=>console.log(err))
    }else{
        Expense.findByPk(delId)
        .then(item=>{
            item.set({
                amount:req.body.amount,
                description:req.body.description,
                category:req.body.category
            })
            return item.save()
        })
        .then(()=>res.redirect('/'))
        .catch(err=>console.log(err))
    }
}

module.exports.getExpenses =(req,res,next)=>{
    Expense.findAll()
    .then(exps=>{
        res.json(exps)
    })
    .catch(err=>console.log(err))
}

module.exports.getDeleteItem = (req,res,next)=>{
    let delid = req.query.id;
    Expense.findAll({where:{id:delid}})
    .then(item=>{
        item[0].destroy();
        res.send()
    })
    .catch(err=>console.log(err))
}