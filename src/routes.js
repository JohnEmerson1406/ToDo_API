const express = require('express')
const ToDo = require('./models/todo')

class Todo {
    constructor() {
        this.app = express()

        this.app.get('/', this.items)
        this.app.post('/', this.newItem)
        this.app.put('/', this.updateItem)
        this.app.delete('/', this.deleteItem)
    }

    items(req, res) {
        ToDo.find().then(docs => {
            res.json({
                items: docs
            })
        }, err => {
            res.status(500).json({
                error: 'Erro ao carregar os itens'
            })
        })
    }

    newItem(req, res) {
        let todoItem = new ToDo({
            title: req.body.title
        })

        todoItem.save().then(doc => {
            res.status(201).json(todoItem)
        }, err => {
            res.status(500).json({
                error: 'Erro ao criar item'
            })
        })
    }

    updateItem(req, res) {
        ToDo.updateOne({ _id: req.body.id }, { title: req.body.new_title, is_done: req.body.new_status }).then(doc => {
            res.json({
                ok: true
            })
        }, err => {
            res.status(500).json({
                error: 'Erro ao atualizar o item'
            })
        })
    }

    deleteItem(req, res) {
        ToDo.deleteOne({ _id: req.body.id }).then(doc => {
            res.json({
                ok: true
            })
        }, err => {
            res.status(500).json({
                error: 'Erro ao deletar o item'
            })
        })
    }
}

module.exports = new Todo().app