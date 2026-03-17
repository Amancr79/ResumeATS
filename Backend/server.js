const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const connectDatabase = require("./src/config/database");

connectDatabase();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



