import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
const app = express();
var AuthRouter = require('./routes/auth')
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.ATLAS_URI || "mongodb://localhost/BITSTACK"
 const connection = mongoose.connect(mongoURI)
 .then(()=>console.log('MongoDB database connected successfully'))
 .catch(error=>console.error(error))

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', AuthRouter);
app.get('/', (req, res) => res.send(`BITSTACK ⚡️[server]: Server is running at https://localhost:${PORT}`));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});