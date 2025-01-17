const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.u6jxllb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Model of registration schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Registration.findOne({ email: email });
        if (!existingUser) {
            const registrationData = new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect('/success');
        } else {
            console.log("User already exists");
            res.redirect('/error');
        }

    } catch (error) {
        console.log("Error: ", error);
        res.redirect('/error');
    }
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/pages/success.html');
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/pages/error.html');
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD;
// mongoose.connect("mongodb+srv://${username}:${password}@cluster0.u6jxllb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }); 

// //registration schema
// const registrationSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// //mode of registration schema
// const Registration = new mongoose.model("Registration", registrationSchema);

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/pages/index.html');
// });

// app.post('/register', (req, res) => {
//     try {
//         const{name, email, password} = req.body;

//         const registration = new Registration({
//             name,
//             email,
//             password
//         });
//         await registration.save();
//         res.redirect('/success');

//     } catch(error) {
//         console.log("Error");
//         res.redirect('error');
//     }
// });

// app.get('/success', (req, res) => {
//     res.sendFile(__dirname + '/pages/success.html');
// });

// app.get('/error', (req, res) => {   
//     res.sendFile(__dirname + '/pages/error.html');
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });