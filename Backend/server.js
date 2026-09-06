require('dotenv').config();
const app = require('./src/app');
console.log(process.env.PORT)
app.get("hello");
app.listen(process.env.PORT,()=>{
    console.log("server is running");
});

