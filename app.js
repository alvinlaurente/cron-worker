const createError = require('http-errors');
const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');

require('dotenv').config()

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const secret = process.env.PASSWORD
const base_url = process.env.BASE_URL

schedule.scheduleJob('*/10 * * * * *', async () => {
  console.log('---------------------------------------------------------');
  await axios
    .get(`${base_url}/v1/leaderboard/redeem/process-claim?pass=${secret}`)
    .then((res) => {
      console.log(res.data)
    })
    .catch(err => console.log(err.message))
  console.log('---------------------------------------------------------');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
