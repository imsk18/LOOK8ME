require('dotenv').config();
const app = require('./src/app');
const connectToDb = require('./src/config/database')
console.log(process.env.PORT)
// app.get("hello");
connectToDb();
app.listen(process.env.PORT,()=>{
    console.log("server is running");
});

