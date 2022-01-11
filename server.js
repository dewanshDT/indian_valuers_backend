const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./routes/blogs');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: ["https://dew-nerdlog.herokuapp.com", "http://localhost:3000"]
}))

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/nerdlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('connected to the database'));

app.use('/api/v1/blogs', blogRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => { console.log(`listening on port ${PORT}`)});