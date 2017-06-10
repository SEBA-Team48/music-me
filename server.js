/**
 * Created by peresthahadji on 10.06.17.
 */
var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
 */
console.log("Server is listening on port %s", Config.app.port);
app.listen(Config.app.port);


