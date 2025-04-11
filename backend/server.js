const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
const DB_URL=process.env.DB_URL;
const routes=require("./routes");
app.use(routes);


mongoose.connect(DB_URL).then(()=>console.log("MongoDB connected with server")).catch((err)=>console.log('Failed: ',err));

app.get('/ping', (req, res) => {
  res.send('pong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});