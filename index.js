const Bot = require('node-telegram-bot-api');

const domains = require("./domains.json");

function containsDomain(string) {
	let domainFound = false;
	domains.forEach((domain) => {
		if(string.indexOf(domain) !== -1) {
			domainFound = true;
		}
	});
	return domainFound;
}

const token = '592274947:AAEm2fSBDixNDzUVUUu11agTTpy1qJyr2Dg';

const bot = new Bot(token, { polling: true });

bot.on('message', (message) => {
	if(containsDomain(message.text)) {
		bot.deleteMessage(message.chat.id, message.message_id);
		console.log("Removed message");
	}
});