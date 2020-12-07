# 1. config.json
create config.json file.
### 1.1 properties: 
1. token: token of your bot;
2. prefix: prefix for your bot;
3. owners: ids of bot owners;

# 2.0 commands
create commands to "modules/cmds/{category}/{name}.js"
### 2.1 module.exports must be have nexts properties:
- run: function of your command. Take 3 arguments: message, client and args;
- config: data of command;
- config.name: name of command. Sets automatically be filename, but you can speciefed;
- config.category: category command, too sets automatically by folder name, but you ccan speciefed;
- config.aliases: aliases of the command name;
- config.permissions: permissions, which need to run command;
- config.visible: visible command for usual users. Sets automatically, but you can set him.
- config.args: array of the replyes at no arguments;
- config.description, config.bigDescription, config.using and config.ecamples: for help; 