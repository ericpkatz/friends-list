const path = require('path');
const db = require('./db');
const { Friend } = db.models;

const express = require('express');
const app = express();
app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/friends', async (req, res, next)=> {
  try {
    res.send(await Friend.findAll({ order: [['rating', 'desc']]}));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/friends/:id', async (req, res, next)=> {
  try {
    const friend = await Friend.findByPk(req.params.id);
    await friend.update(req.body);
    res.send(friend);
  }
  catch(ex){
    next(ex);
  }
});

const init = async()=> {
  try {
    await db.syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};




init();


