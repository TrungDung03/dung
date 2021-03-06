const express = require('express')
const { insertToDB, getAll, deleteObject,getDocumentById,updateDocument} = require('./databaseHandler')
const app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

const path = require('path')
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', async (rep,res)=>{
    var result = await getAll("Products")
    res.render('home',{products:result})
})

app.post('/insert', async (req,res)=>{
    const name =req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL;
    if (price.Number < 50 || price.Number >1000) {
        var result = await getAll("Products")
        res.render('home', { products: result, picError: 'Giá không hợp lệ!' })
    } else {
        const obj = { name: name, price: price, picURL: url }
        await insertToDB(obj, "Products")
        res.redirect('/')
    }
})

app.get('/delete/:id',async (req,res)=>{
    const idValue =req.params.id 
    await deleteObject(idValue,"Products")
    res.redirect('/')
})

app.get('/edit/:id',async (req,res)=>{
    const idValue = req.params.id
    const productToEdit = await getDocumentById(idValue,"Products")
    res.render("edit",{product:productToEdit})
})

app.post('/update', async (req,res)=>{
    const id = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL
    let updateValues = {$set : {name:name,price:price,picURL:url}};
    await updateDocument(id,updateValues,"Products")
    res.redirect('/')
})
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')