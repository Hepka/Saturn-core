class Command {
    constructor (options = {
        name: "",
        category: "",

        args: [""],
        aliases: [""],

        permissions: [""],

        info: {
            en: {
                description: "",
                bigDescription: "",
                using: "",
                examples: [""],
            }
        }
    }, execute = async () => {}) {
        if (typeof execute !== 'function') throw new Error(`execute param must be a function!`);
        this.execute = execute;
        
        if (!options.name) throw new Error(`Command name must not be empty!`);

        for (let lang in options.info) {
            if (!options.info[lang].description) throw new Error(`Command description must not be empty! Command name: ${options.name}`);
            if (!options.info[lang].using) throw new Error(`Command using must not be empty! Command name: ${options.name}`);
            if (!options.info[lang].bigDescription) options.info[lang].bigDescription = options.info[lang].description;
        }
    }

    config = {};
    execute = async (message = new Discord.Message, client = new Discord.Client, args = [""]) => {};
}

module.exports = Command;