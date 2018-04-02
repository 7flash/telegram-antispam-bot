const Bot = require('node-telegram-bot-api');

const domains = require("./domains.json");
const questions = require("./questions.json");

const command = '/show';

const devToken = '504157066:AAGPuih7wRfL6gkTUL8M9gA-9rYRDA-6Hf0';
const prodToken = '592274947:AAEm2fSBDixNDzUVUUu11agTTpy1qJyr2Dg';
const token = process.env.dev ? devToken : prodToken;

const bot = new Bot(token, { polling: true });

function containsDomain(string) {
	let domainFound = false;
	domains.forEach((domain) => {
		if(string.indexOf(domain) !== -1) {
			domainFound = true;
		}
	});
	return domainFound;
}

function reply(message) {
	if(message.text.startsWith(command)) {
		const topic = message.text.substr(command.length + 1);

		if(questions[topic]) {
			bot.sendMessage(message.chat.id, questions[topic]);
		}
	}
}

function remove(message) {
	if(containsDomain(message.text)) {
		bot.getChatMember(message.chat.id, message.from.id).then((data) => {
			if (data.status !== "creator" && data.status !== "administrator") {
				let deletePromise = bot.deleteMessage(message.chat.id, message.message_id);
				let kickPromise = bot.kickChatMember(message.chat.id, message.from.id);
				Promise.all([deletePromise, kickPromise]).then(() => {
					console.log(`[remove]${new Date()}`);
				});
			}
		});
	}
}

bot.on('message', (message) => {
	if(message.chat.type === 'private') {
		reply(message);
	} else {
		remove(message);
	}
});