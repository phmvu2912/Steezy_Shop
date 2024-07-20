import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);

        console.log('Kết nối tới MongoDB thành công!');
    } catch (error) {
        console.log(error)
    }
}

export default connectDB