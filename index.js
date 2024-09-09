const express = require('express');
const path = require('path');
const app = express();
const port =3000;




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
