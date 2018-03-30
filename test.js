const assert = require("assert");

const domains = require("./domains.json");

const badMessage = "hello spam.ru";
const goodMessage = "hello ru guys!";

function containsDomain(string) {
	let domainFound = false;
	domains.forEach((domain) => {
		if(string.indexOf(domain) !== -1) {
			domainFound = true;
		}
	});
	return domainFound;
}

assert.equal(containsDomain(badMessage), true);
assert.equal(containsDomain(goodMessage), false);

console.log('ok');