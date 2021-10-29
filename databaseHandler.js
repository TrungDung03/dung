const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://dung2001:dung123@cluster0.4ks5r.mongodb.net'
const DATABASE_NAME = 'GCH0902_DB'

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateDocument}