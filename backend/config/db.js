import mongoose, { model } from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to database ${mongoose.connection.host}`)

        
    } catch (error) {
        console.log(`error to connecct database`)
        
    }

}
export default connectDB