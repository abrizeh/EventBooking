import express from "express";
//import router from "./routes/auth";
import {readdirSync} from "fs";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require ("morgan");
require("dotenv").config(); 

const app = express();

// db connection
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    
    useUnifiedTopology:true,
    
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Connection Error:", err));


//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// route middleware
readdirSync("./routes").map((r) =>
 app.use("/api", require(`./routes/${r}`))
 );
//app.use("/api",router);
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port 8000`));