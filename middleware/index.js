let express = require('express')
const http = require('http');
let app = express();
var port = process.env.PORT || 8080;
var service_today_ep = process.env.TODAY_SERVICE_EP
var service_bitcoin_ep = process.env.BITCOIN_SERVICE_EP

const fetch_backend_data = (service_ep, cb) => {

	let data;

	data = http.get(service_ep + "/data", (resp) => {
		resp.on('data', (chunk) => {
			data = chunk;
		});

		resp.on('end', () => {
			cb(data);
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});

	return data;

}

app.get('/', (req, res) => res.send("Welcome to children's stock market: middleware service"));

app.get('/data', function (req, res) {
	let date_ob = new Date();
	resp_data = {"middleware": "This data is generated by middleware at: " + date_ob.getTime()};

	todays_data = fetch_backend_data(service_today_ep, function (data) {
		resp_data["today_service"] = JSON.parse(data)
	})
	bitcoin_data = fetch_backend_data(service_bitcoin_ep, function (data) {
		resp_data["bitcoin_service"] = JSON.parse(data)
		res.send(resp_data)
	})
});
app.listen(port, function () {
	console.log("Children's stock market middleware service is up!!");
});

process.on('SIGINT', function () {
	process.exit();
});