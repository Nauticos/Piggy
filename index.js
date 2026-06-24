require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/piggy-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms 🐷` });
});

(async () => {
  await app.start();
  console.log("Bot is running! 🐷");
})();

app.command("/piggy-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/piggy-ping - Check bot latency
/piggy-translate - Translate text to Pig Latin
/piggy-oink - 🐷
/piggy-fiction - Pig Wikipedia`
  });
});

app.command("/piggy-oink", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Oink! Oink! 🐷`
  });
});

app.command("/piggy-translate", async ({ command, ack, respond }) => {
    await ack();
    function translateToPigLatin(text) {
        const words = text.split(/\s+/);
        const translated = words.map(word => {
            const vowelMatch = word.match(/[aeiou]/i);
            if(!vowelMatch) return word;
            const firstVowel = word.indexOf(vowelMatch[0])

            if (firstVowel === 0) {
                return word + "way";
            } else {
                const consonants = word.slice(0, firstVowel);
                const restOfWord = word.slice(firstVowel);
                return restOfWord + consonants + "ay";
            }
            });
        return translated.join(" ");
    }
    const translated = translateToPigLatin(command.text);
    await respond({
        text: `${translated} 🐷`
    });
});

app.command("/piggy-fiction", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Have some famous pigs! https://en.wikipedia.org/wiki/List_of_fictional_pigs`
  });
});