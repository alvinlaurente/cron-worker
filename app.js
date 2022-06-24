const createError = require('http-errors');
const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');

require('dotenv').config()

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const secret = process.env.PASSWORD
const base_url = process.env.BASE_URL

let finish = true;
let count = 0;
const cron = schedule.scheduleJob('*/10 * * * * *', async () => {
  console.log('---------------------------------------------------------');

  if (finish) {
    finish = false
    console.log("start", count)
    await axios
    .get(`${base_url}/v1/leaderboard/redeem/process-claim?pass=${secret}`)
    .then((res) => {
      console.log(res.data.success, '/' , res.data.data);
      finish = true
      console.log('finish', count)
      count++
    })
    .catch(err => {
      console.log(err.message)
      cron.cancel()
    })
  }

  console.log('---------------------------------------------------------');
})

app.listen(port, () => {
  console.log(`Cron App listening on port ${port}`)
})

module.exports = app;
