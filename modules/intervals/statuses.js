const { Client } = require(`discord.js`)

module.exports = {
    timeOut: 2e4,
    run: (client = new Client) => {
        client.user.setActivity({"type": "PLAYING", "name": "228 666 1337 1488"})
    }
}