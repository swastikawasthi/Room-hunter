const express = require('express');
const path = require('path');
const fs =require('fs')
const app = express();
const port =3000;

rdata=fs.readFileSync('maindata.json','utf8')
jsondata = JSON.parse(rdata)


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
    fs.writeFileSync('maindata.json',JSON.stringify(jsondata,null,2))
    res.redirect('/')
})
//------------------------------------------------
app.get('/api/delete',(req,res)=>{
    delt = req.query;
    console.log(delt);
    
for(i=0;i<jsondata.length;i++){
    if((jsondata[i]).ownername==delt.delname && (jsondata[i]).monum==delt.delnum && (jsondata[i]).loc==delt.delloc && (jsondata[i]).disc==delt.deldisc ){jsondata.splice(i,1);break}
}

fs.writeFileSync('maindata.json',JSON.stringify(jsondata,null,2)) 
    res.redirect('/')
})

app.listen(port,()=>{console.log(`running=> ${port}`)})