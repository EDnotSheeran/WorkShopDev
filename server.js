const express = require('express')
const server = express()

// const ideas = require('./ideas.json').reverse()

const db = require('./db')

server.use(express.static('public'))

server.use(express.urlencoded({extended: true}))

const nunjucks =  require('nunjucks')
nunjucks.configure('views', {
    express: server,
    noCache: true,
})

server.get('/',(req,res)=>{

    db.all(`SELECT * FROM ideas;`,function(err,ideas){
        if(err) {
            console.log(err)
            return res.send('erro')
        }

        let lastIdeas = []
        for(idea of ideas.reverse()){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
        res.render('index.html',{ ideas: lastIdeas })
    })
})
server.get('/ideas',(req,res)=>{
    db.all(`SELECT * FROM ideas;`,function(err,ideas){
        if(err) {
            console.log(err)
            return res.send('erro')
        }

        let lastIdeas = []
        for(idea of ideas.reverse()){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
        res.render('ideas.html', { ideas })
    })
})
server.post('/newidea',(req,res)=>{
    const { img, title, category, description, url } = req.body

    db.run(`
        INSERT INTO ideas(
            img,
            title,
            category,
            description,
            url
        ) VALUES (?,?,?,?,?);
    `,[ img, title, category, description, url ],function(err){
        if(err) return console.log(err)
        
        return res.redirect('/ideas')
    })
})
server.listen(80)