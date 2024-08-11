const express = require('express');
const path = require('path');
const app = express();
const port =3000;



const mysql = require('mysql');

const connection = mysql.createConnection({

host: 'sql12.freesqldatabase.com',

user: 'sql12724651',

password: 'x9uJedswEf',

database: 'sql12724651',

port: 3306});

connection.connect((err) => {

if (err) {

console.error('Error connecting: D '+ err.stack);

return;

} console.log('Connected as id ' + connection.threadId); });

// Remember to close the connection when you're done connection.end();
jsondata = [];



app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})
//-----------------------------------------------
app.get('/api',(req,res)=>{
    res.send(jsondata)
})
// ---------------------------------------------
app.get('/add-home',(req,res)=>{
    formdata = req.query;
    jsondata.push(formdata)
    insertquery =`INSERT INTO data ("ownername","monum","loc","disc") VALUES(?,?,?,?)`;
    value= [formdata.ownwername,formdata.monum,formdata.loc,formdata.disc];

    connection.query(insertquery,value,(err, result)=>{

        if (err) throw err;
        console.log('new row inserted');
    });
    res.redirect('/')
})
//------------------------------------------------
app.get('/api/delete',(req,res)=>{
    delt = req.query;
    console.log(delt);
    
for(i=0;i<jsondata.length;i++){
    if((jsondata[i]).ownername==delt.delname && (jsondata[i]).monum==delt.delnum && (jsondata[i]).loc==delt.delloc && (jsondata[i]).disc==delt.deldisc ){jsondata.splice(i,1);break}
}


    res.redirect('/')
})

app.listen(port,()=>{console.log(`running=> ${port}`)})
