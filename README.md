**Launch bot:**

1) `git clone git@github.com:7flash/telegram-antispam-bot.git`
2) `npm install`
3) `sudo npm install -g pm2`
4) `sudo node index.js`

**Change questions:**
1) `vim questions.json`
2) `git add questions.json && git commit -m "questions"`
3) `ssh -i key.pem ubuntu@amazonaws.com`
4) `cd chatbot && git pull`
5) `sudo pm2 restart index`
6) `sudo pm2 status`

**Change start text (/start):**
1) `vim start_template.json`
2) `git add start_template && git commit -m "start"`
3) `ssh -i key.pem ubuntu@amazonaws.com`
4) `cd chatbot && git pull`
5) `sudo pm2 restart index`
6) `sudo pm2 status`
