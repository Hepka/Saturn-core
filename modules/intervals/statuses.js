const { Client } = require(`discord.js`)

const { statuses } = require(`../../json/dictionary.json`)
const flagsF = require(`../../lib/flags.js`)

let num = 0;

module.exports = {
    timeOut: 2e4,
    num: 0,
    run: (client = new Client) => {
        const flags = {
            "serverCount": client.guilds.cache.size,
            "userCount": client.users.cache.size // client.guilds.cache.array().reduce((a, b) => a.memberCount + b.memberCount)
        }

        console.log(flags)
        console.log(statuses)
        console.log(num)
        // console.log(flagsF(statuses[this.num].name, flags, "$"))

        client.user.setActivity({
            "type": statuses[num].type, 
            "name": flagsF(statuses[num].name, flags, "$")
        })

        if (num == (statuses.length - 1)) num = 0
        else num++
    }
}