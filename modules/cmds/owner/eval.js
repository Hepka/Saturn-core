const Discord = require(`discord.js`);
const util = require(`util`)

module.exports.run = (message = new Discord.Message(), client = new Discord.Client(), args = ['']) => {
    let msg;
    try {
        let result = util.inspect(eval(message.content.slice(message.content.split(/ +/g)[0].length)), {depth: 0})

        msg = "```js\n" + result + "\n```"
    } catch(e) {
        msg = "```js\n" + e + "```"
    }

    message.channel.send(msg).then(async msg_ => {
        msg_.react("❌");
        msg_.awaitReactions((reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id, {max: 1, time: 20000}).then(collected => {
            const reaction = collected.first()
            if (reaction?.emoji.name == "❌") msg_.delete()
        });
    })
}

module.exports.config = {
    aliases: [`e`, `js`, `ebal`],
    permissions: [],
    args: ["вставь код!"],

    description: `Запустить код на js.`,
    bigDescription: `Команда позволяет выполнить код на жава скрипте. доступна только владельцам бота.`,
    using: `eval <code>`,
    examples: [`eval 228`, `eval 10 + 10`]
}