require("dotenv").config();

import settings from "../settings.json";

const ONE_MINUTE = 60000;
const RELOAD_DATA_TIME = ONE_MINUTE * 2;
const feedData = [];

async function start() {
	setInterval(() => {
		reload();
	}, ONE_MINUTE);
	reload();
}

function print() {
	console.clear();
	const date = new Date();
	console.log(date.toLocaleString());
	console.log(feedData);
}

async function reload() {
	console.log("Reloading...");

	// Clear data
	feedData.splice(0, feedData.length);

	for (let feed of settings.feeds) {
		const res: any = await fetch(feed.endpoint).catch((err) => {
			return { data: [{ message: `Problem connecting to ${feed.endpoint}.` }] };
		});
		const json = res.json ? await res.json() : res;
		const messages = json.data?.map((a) => a.message);
		feedData.push(...messages);
	}
	print();
}

start();
