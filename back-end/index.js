let express = require('express')
const http = require('http');
let app = express();
var port = process.env.PORT || 8080;
var service_type = process.env.TYPE


app.get('/', (req, res) => res.send("Welcome to children's stock market: backend service: " + service_type));

app.get('/data', function (req, res) {
	let service_map = []
	service_map["today"] = "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today"
	service_map["bitcoin"] = "http://api.coindesk.com/v1/bpi/currentprice.json"

	let data = '';

	http.get(service_map[service_type], (resp) => {
		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			res.send(JSON.parse(data));
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});

});
app.listen(port, function () {
	console.log("Children's stock market backend service is up!! Serving type: " + service_type);
});

process.on('SIGINT', function () {
	process.exit();
});