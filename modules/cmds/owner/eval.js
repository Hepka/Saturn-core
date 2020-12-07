const Discord = require(`discord.js`);
const util = require(`util`)

module.exports.run = (message = new Discord.Message(), client = new Discord.Client(), args = ['']) => {
    try {
        let result = util.inspect(eval(message.content.slice(message.content.split(/ +/g)[0].length)), {depth: 0})

        message.channel.send("```js\n" + result + "\n```")
    } catch(e) {
        message.channel.send("```js\n" + e + "```")
    }
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