const express = require('express')
const app = express()
const connection = require('./database/database')
const Question = require('./database/Question')
const Answer = require('./database/Answers')

connection
    .authenticate()
    .then(() => {
        console.log('Success connection')
    })
    .catch((error) => {
        console.log(error)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    Question.findAll({raw: true, order:[
        ['id', 'DESC'] // order [['option','ASC/DESC']]
    ]})
        .then(questions => {
            res.render('index', {
                questions: questions
            })
        })
})

app.get('/questions', (req, res) => {
    res.render('questions')
})

app.post('/salvequestion', (req, res) => {
    let title = req.body.title
    let description = req.body.description
    
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/questions/:id', (req, res) => {
    let id = req.params.id
    Question.findOne({
        where: {
            id: id
        }
    }).then(questions => {
        if(questions != undefined) {

            Answer.findAll({
                where: {
                    questionId: questions.id
                },
                order: [['id', 'DESC']]
            }).then(answers => {
                res.render('question', {
                    questions: questions,
                    answers: answers
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/salveanswer', (req, res) => {
    let bodyAnswer = req.body.bodyAnswer
    let questionId = req.body.questionId
    
    Answer.create({
        bodyAnswer: bodyAnswer,
        questionId: questionId
    }).then(() => {
        res.redirect('/questions/'+questionId)
    })
})



app.listen(3005, () =>{
    console.log('Ok')
})