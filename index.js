const express = require("express")
require('dotenv').config()

const app = express()
app.use(express.json())

// As the request will be from a different origin
app.use('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});

app.post('/', (req, res) => {
  const matches = req.body?.payload.filter(obj => obj?.drm === true && obj?.episodeCount > 0) || []
  if (matches.length === 0) {
    return res.status(400).send({
      error: "Could not decode request: JSON parsing failed"
    })
  } else {
    const results = matches.map(obj => {
      const { image: { showImage = null }, slug, title } = obj
      return { image: showImage, slug, title }
    })
    return res.status(200).send({ response: results })
  }
})


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))