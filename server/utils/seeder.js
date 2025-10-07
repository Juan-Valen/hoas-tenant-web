import dotenv from 'dotenv'
import { users } from './data.js'
import User from '../models/userModel.js'
import Market from '../models/marketModel.js'
import Item from '../models/itemModel.js'
import Space from '../models/spaceModel.js'
import connectDB from '../config/db.js'
import bcrypt from 'bcrypt';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany()
        await Market.deleteMany()
        await Item.deleteMany()
        await Space.deleteMany()

        const sampleUsers = users.map((u) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(u.password, salt);
            return { ...u, password: hash };
        });

        await User.insertMany(sampleUsers);
        //        const createdUsers = await User.insertMany(sampleUsers);

        //        const adminUser = createdUsers[0]._id
        //
        //        const sampleProducts = products.map((product) => {
        //            return { ...product, user: adminUser }
        //        })
        //
        //        await Item.insertMany(sampleProducts)
        //
        //        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Market.deleteMany()
        await Item.deleteMany()
        await Space.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
