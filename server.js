const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const path = require('path');


const { Datastore } = require('nedb-async-await');

const db = {};
db.posts = Datastore({
  filename: path.resolve(path.dirname(''), './database/posts.db'),
  autoload: true,
});

if (process.env.ENV === 'dev') {
  console.warn('Dev environment');
  const cors = require('cors');
  app.use(cors());
}

// create post
app.post('/api/posts', (req, res) => {
  res.send('create post');
});

// read post
app.get('/api/posts', async (req, res) => {
  const posts = await db.posts.find({})
  res.json(posts);
});

// app.get('/api/query', async (req, res) => {
//   const posts = []
//   const result = await db.posts.insert(posts);

//   // const posts = await db.posts.find({})
//   res.json(result)
// })

app.get('/api/posts/:id', (req, res) => {
  console.warn(req.params);
  res.send('read a single post: ' + req.params.id);
});

// update post
app.put('/api/posts/:id', (req, res) => {
  res.send('update a single post: ' + req.params.id);
});

// delete post
app.delete('/api/posts/:id', (req, res) => {
  res.send('delete a single post: ' + req.params.id);
});

// utils
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server works!' });
});

app.get('/api/db-backup', (req, res) => {
  res.download('./database/posts.db', 'db-backup.db');
});

// serve static angular files
app.use('/', express.static(path.resolve(__dirname, './client/dist/client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist/client/index.html'));
});

app.listen(PORT);