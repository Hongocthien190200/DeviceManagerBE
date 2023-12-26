const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');

const app = express();

const statusRoute = require('./src/routes/status');
const categoryRoute = require('./src/routes/category');
const unitRoute = require('./src/routes/unit');
const locationRoute = require('./src/routes/location');
const deviceRoute = require('./src/routes/devices');
const repairRoute = require('./src/routes/repairers');
const repairHistoryRoute = require('./src/routes/repairHistory');
const maintenaceHistoryRoute = require('./src/routes/maintenanceHistory');
const authen = require('./src/routes/auth');
const schedulelogin = require('./src/routes/schedulelogin');
const department = require('./src/routes/department');

const { startCron} = require('./src/service/notification');

dotenv.config();
mongoose.connect(process.env.CONNECT_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('CONNECT TO MONGODB');
    })
    .catch(err => console.log(err));
const port = 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", statusRoute);
app.use("/api", unitRoute);
app.use("/api", categoryRoute);
app.use("/api", locationRoute);
app.use("/api", repairRoute);
app.use("/api", deviceRoute);
app.use("/api", repairHistoryRoute);
app.use("/api", maintenaceHistoryRoute);
app.use("/api", authen);
app.use("/api", schedulelogin);
app.use("/api", department);

startCron();

//Khởi chạy
app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

