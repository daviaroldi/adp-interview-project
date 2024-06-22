import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // route to show the tasks being process
  res.render('index.html');
});

export default router;
