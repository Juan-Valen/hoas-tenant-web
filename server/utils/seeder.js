import dotenv from 'dotenv'
import { users, items, spaces, reservations, markets } from './data.js'
import User from '../models/userModel.js'
import Market from '../models/marketModel.js'
import Item from '../models/itemModel.js'
import Space from '../models/spaceModel.js'
import Reservation from '../models/reservationModel.js'
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

        const usersNew = await User.insertMany(sampleUsers);
        items[0]["created_by"] = usersNew[0]._id.toString()
        items[1]["created_by"] = usersNew[1]._id.toString()
        items[2]["created_by"] = usersNew[0]._id.toString()
        items[3]["created_by"] = usersNew[1]._id.toString()
        console.log(items);

        const itemsNew = await Item.insertMany(items);

        console.log("🧺 Seeded items");

        // Seed spaces
        spaces[0]["created_by"] = usersNew[0]._id;
        spaces[1]["created_by"] = usersNew[1]._id;

        const spacesNew = await Space.insertMany(spaces);

        console.log("🏠 Seeded spaces");

        // Seed reservations
        reservations[0]["reserved_id"] = itemsNew[0]._id;
        reservations[0]["reserved_by"] = usersNew[0]._id;
        reservations[1]["reserved_id"] = spacesNew[0]._id;
        reservations[1]["reserved_by"] = usersNew[1]._id;

        await Reservation.insertMany(reservations);

        console.log("📅 Seeded reservations");

        // Seed market items
        markets[0]["owner_id"] = usersNew[0]._id;
        markets[1]["owner_id"] = usersNew[1]._id;

        await Market.insertMany(markets);
        process.exit()
    } catch (error) {
        console.error(error.message)
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
