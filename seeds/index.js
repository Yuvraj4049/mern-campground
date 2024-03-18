const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '658a2b3bf11d6f9fce18f681',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dy257qe9w/image/upload/v1703561658/YelpCamp/ivtqbg90dn9slgcnhryz.jpg',
                    filename: 'YelpCamp/ivtqbg90dn9slgcnhryz'
                },
                {
                    url: 'https://res.cloudinary.com/dy257qe9w/image/upload/v1703561659/YelpCamp/bqmakuc9e1xp30sbw5yo.jpg',
                    filename: 'YelpCamp/bqmakuc9e1xp30sbw5yo'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
// url: 'https://res.cloudinary.com/dy257qe9w/image/upload/v1703086682/YelpCamp/b5ktj6vaoaaphp8nqbk8.png',
//                     filename: 'YelpCamp/b5ktj6vaoaaphp8nqbk8'
//                 },
//                 {
//                     url: 'https://res.cloudinary.com/dy257qe9w/image/upload/v1703084931/YelpCamp/ghmmejgxwfp7bkcurq9o.png',
//                     filename: 'YelpCamp/ghmmejgxwfp7bkcurq9o'
//author: '658a2b3bf11d6f9fce18f681',









