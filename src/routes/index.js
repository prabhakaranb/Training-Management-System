const express = require('express');

const authRouter = require('./authRoutes');
const courseRouter = require('./courseRoutes');
const subjectRouter = require('./subjectRoutes');
const streamRouter = require('./streamRoutes');
const userRouter = require('./userRoutes');

const router = express.Router();

router.get('/health', (req, res, next) => ({
  data: {
    message: 'I\'m healthy',
    uptime: process.uptime(),
  },
}));

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/', authRouter);

router.use('/courses', courseRouter);

router.use('/subjects', subjectRouter);

router.use('/stream', streamRouter);

router.use('/users', userRouter);

module.exports = router;
