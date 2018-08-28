const fs = require("fs");
const path = require("path");
const Bot = require('node-telegram-bot-api');

const domains = require("./domains.json");
const questions = require("./questions.json");
const startTemplate = fs.readFileSync("./start_template").toString();

const showCommand = '/show';
const startCommand = '/start';

const devToken = '';
const prodToken = '';
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
	if(message.text.startsWith(showCommand)) {
		const topic = message.text.substr(showCommand.length + 1);

		if(questions[topic]) {
			bot.sendMessage(message.chat.id, questions[topic]);
		}
	} else if(message.text.startsWith(startCommand)) {
		const startMessage = startTemplate.replace('<NAMEOFUSER>', message.from.first_name);
		bot.sendMessage(message.chat.id, startMessage);
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
