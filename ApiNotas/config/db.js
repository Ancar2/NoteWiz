const { default: mongoose } = require("mongoose")

const connectionDB = async () =>{
try {
    await mongoose.connect(process.env.DB_URL)
    console.log('connect to DB');
    
    
} catch (error) {
    console.log('connection fail');
    
}
}

module.exports = connectionDB
// aa