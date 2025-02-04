const express = require("express");
const app = express();
const os = require("os")
const hostname = os.hostname();

app.listen(8090, () => console.log("Посещение порта 8090 на хосте: " + hostname));
app.get("/", (req, res) => res.send("Текущий хост: " + hostname ) ) ;
