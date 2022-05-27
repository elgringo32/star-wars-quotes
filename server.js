const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.listen(3000, function() {
    console.log('listening on 3000')
  })


  MongoClient.connect('mongodb+srv://elgringo2020:g56M8uXBStEu36t9@cluster0.avl9i.mongodb.net/?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')
    app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


    app.get('/',  (req, res) => {
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', {quotes: results})
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes',  (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
    })
    .catch(error => console.error(error))

    })
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'yoda' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }
          )
            .then(result => {
                res.json('Success')            
            })
            .catch(error => console.error(error))
      })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name },
           
          )
          .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
              res.json('Deleted Darth Vader')
          })
          .catch(error => console.error(error))
    })  
  })
  .catch(error => console.error(error))
  





