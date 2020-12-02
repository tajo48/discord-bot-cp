const Discord = require("discord.js");
const fs = require("fs");
const http = require("http");
var dateone = "0";
var state = 1;

let client = new Discord.Client();
client.config = JSON.parse(fs.readFileSync("config.json", "utf8"));

client.once("ready", () => {
  console.log(`${client.user.tag} is Online`);
  client.user.setActivity("Odliczam do cyberpunk MORTYY");
});

client.on("message", (message) => {
  if (!message.content.startsWith("-") || message.author.bot) return;
  const args = message.content.slice("-".length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command != "tutaj") return;
  if (message.author.id == "419560454688473108") return;
  // Set the date we're counting down to
  var countDownDate = new Date("Dec 10, 2020 01:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`${days}d ${hours}h ${minutes}m`);
    message.channel.send({
      embed: {
        color: "#EDE801",
        title: `Cyberpunk 2077 countdown`,
        description: `${days}d ${hours}h ${minutes}m`,
      },
    });

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      message.channel.send({
        embed: {
          color: "#EDE801",
          title: `Koniec czekania`,
          description: `Cyberpunk 2077 został wydany`,
        },
      });
    }
  }, 400000);
});

client.login(client.config.token).catch(() => {
  console.error("Invalid bot token provided in config.json");
  process.exit();
});
