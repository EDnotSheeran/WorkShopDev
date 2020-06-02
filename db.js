const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.serialize(function(){
    //criar tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        img TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        url TEXT
    );`)
})
// dev()
function dev(){
    const data = require('./ideas.json')
    data.map(idea =>{
        //inserir dados na tabela
            db.run(`
            INSERT INTO ideas(
                img,
                title,
                category,
                description,
                url
            ) VALUES (?,?,?,?,?);
        `,[
            idea.img,
            idea.title,
            idea.category,
            idea.description,
            idea.url
        ],function(err){
            if(err) return console.log(err)
            
            console.log(this)
        })
    })
}

module.exports = db



    //deletar um dado da tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`,[2],function(err){
    //     if(err) return console.log(err)
    //     console.log('deletado', this)
    // })

    //consultar dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if(err) return console.log(err)

    //     console.log(rows)
    // })
    