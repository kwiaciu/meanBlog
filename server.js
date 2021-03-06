const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const path = require('path');

// const { Datastore } = require('nedb-async-await');
const { AsyncNedb } = require('nedb-async')


const db = {};
db.posts = new AsyncNedb({
  filename: path.resolve(path.dirname(''), './database/posts.db'),
  autoload: true,
});

db.users = new AsyncNedb({
  filename: path.resolve(path.dirname(''), './database/users.db'),
  autoload: true,
});

if (process.env.ENV === 'dev') {
  const cors = require('cors');
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base64 helpers
const btoa = (string) => Buffer.from(string).toString('base64');
const atob = (encoded) => Buffer.from(encoded, 'base64').toString();

authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.replace('Basic ', '');
  let user;
  if (token) {
    user = await db.users.asyncFindOne({ token });
  }
  // authorization
  if (!user) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    next();
  }
};

app.post('/api/login', async (req, res) => {
  const { token } = req.body;
  let user;

  if (token) {
    user = await db.users.asyncFindOne({ token });
  }

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// create post
app.post('/api/posts', authMiddleware, async (req, res) => {
  if (
    req.body.title !== '' &&
    req.body.shortContent !== '' &&
    req.body.longContent !== ''
  ) {
    const doc = req.body;
    doc.createdAt = Date.now();

    const post = await db.posts.asyncInsert(doc);
    res.json(post);
  } else {
    res.status(400).json({ error: 'Bad request.' });
  }
});

// read post
app.get('/api/posts', async (req, res) => {
  const posts = await db.posts.asyncFind({}, [['sort', { createdAt: -1 }]]);
  console.log(posts)
  res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await db.posts.asyncFindOne({ _id: req.params.id });
  res.json(post);
});

// update post
app.put('/api/posts/:id', authMiddleware, async (req, res) => {
  const doc = req.body;
  const docId = req.params.id;
  const result = await db.posts.asyncUpdate({ _id: docId }, doc);
  res.json(result);
});

// delete post
app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
  const result = await db.posts.asyncRemove({ _id: req.params.id });
  res.json(result);
});

// utils
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server works!' });
});

app.get('/api/db-backup', authMiddleware, (req, res) => {
  res.download('./database/posts.db', 'db-backup.db');
});

// serve static angular files
app.use('/', express.static(path.resolve(__dirname, './client/dist/client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist/client/index.html'));
});

app.listen(PORT);