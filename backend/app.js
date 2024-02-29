// app.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 


// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

require("./routes/user.routes.js")(app);
require("./routes/clothingitem.routes.js")(app);
require("./routes/scenarios.routes.js")(app);
require("./routes/analytical.routes.js")(app);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});