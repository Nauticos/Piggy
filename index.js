require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

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
/piggy-help - Show this help message
/piggy-ping - Check bot latency
/piggy-translate - Translate text to Pig Latin
/piggy-oink - 🐷
/piggy-wikipedia - Real pig Wikipedia
/piggy-fiction - Fictional pig Wikipedia
/piggy-joke - Get a joke
/piggy-quote - Get a random quote from a pig
/piggy-idiom - Get a random pig idiom explained`
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

app.command("/piggy-wikipedia", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Have some real pigs! https://en.wikipedia.org/wiki/List_of_fictional_pigs`
  });
});

app.command("/piggy-fiction", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Have some famous pigs! https://en.wikipedia.org/wiki/List_of_fictional_pigs`
  });
});

app.command("/piggy-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/piggy-quote", async ({ ack, respond }) => {
  await ack();
    const QuoteNumber = Math.floor(Math.random() * 14)
    const Quote = ["“It is deeply satisfying to know that my accomplishments are appreciated by a pig of your caliber.” - Wilbur (Charlotte's Web)",
      "“All animals are equal, but some animals are more equal than others.” - Napoleon (Animal Farm)",
      "“If you are jumping up and down in muddy puddles, you must wear your boots.” - Peppa Pig (Peppa Pig)",
      "“I am an expert at lots of things.” - Daddy Pig (Peppa Pig)",
      "“Th-th-th-that’s all, folks!” - Porky Pig (Looney Tunes)",
      "“To the prosperity of The Manor Farm!” - Napoleon (Animal Farm)",
      "“Four legs good, two legs bad.” - Snowball (Animal Farm)",
      "“Well, I have to warn you, I may be small, but I can be ferocious if provoked.” - Babe (Babe: Pig in the City)",
      "“I am fond of pigs. Dogs look up to us. Cats look down on us. Pigs treat us as equals.” - Winston Churchill",
      "“I learned long ago, never to wrestle with a pig. You get dirty, and besides, the pig likes it.” - George Bernard Shaw",
      "“Beauty is in the eye of the beholder and it may be necessary from time to time to give a stupid or misinformed beholder a black eye.” - Miss Piggy (The Muppet Show)",
      "“They call me Mister Pig!” - Pumbaa (The Lion King)",
      "“Hey, look, I'm Picasso!” - Hamm (Toy Story)",
      "“Not by the hair on my chinny-chin-chin!” - The Pig (The Three Little Pigs)",
    ];
    const CurrentQuote = Quote[QuoteNumber];
  await respond({
     text: `${CurrentQuote}` });
});

app.command("/piggy-idiom", async ({ ack, respond }) => {
  await ack();
    const IdiomNumber = Math.floor(Math.random() * 9)
    const Idiom = [
      "“When pigs fly”: A playful way to say that something will never happen because it is completely impossible.",
      "“Make a pig of yourself”: To overeat or act in an overly greedy and messy manner at the dinner table.",
      "“Live high on the hog”: To live a luxurious, extravagant lifestyle, specifically by being able to afford the most expensive cuts of meat.",
      "“Like a pig in mud”: Extremely happy, relaxed, or content in your current situation.",
      "“A pigsty”: Used to describe a room, house, or space that is filthy, disorderly, and completely untidy.",
      "“Buy a pig in a poke”: Making a purchase or committing to a deal sight unseen, often resulting in getting something far inferior to expectations.",
      "“Lipstick on a pig”: Making a superficial or cosmetic change to something in an attempt to make it look better, without addressing its fundamental flaws.",
      "“Sweat like a pig”: To perspire heavily (which is ironic, as pigs do not actually sweat).",
      "“Pig-headed”: Being stubbornly obstinate or unwilling to compromise on an idea",
    ];
    const CurrentIdiom = Idiom[IdiomNumber];
  await respond({
     text: `${CurrentIdiom}` });
});