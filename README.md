**Launch bot:**

1) `git clone git@github.com:TABULARASA-IO/chatbot.git`
2) `npm install`
3) `sudo npm install -g pm2`
4) `sudo node index.js`

**Change questions:**
1) `vim questions.json`
2) `git add questions.json && git commit -m "questions"`
3) `ssh -i berlenko.pem ubuntu@ec2-34-229-78-25.compute-1.amazonaws.com`
4) `sudo pm2 restart index`
5) `sudo pm2 status`
