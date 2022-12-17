const fs = require('fs');

const glob = require('glob');

// check if LELBOT_DATA_DIR env variable exists, if not, create data dir in user home directory
const data_dir = (typeof process.env.LELBOT_DATA_DIR != "undefined" ? process.env.ENV_VARIABLE : process.env.HOME+'/lelbot_data' );


export { data_dir };


// create data dir if not exists

if (!fs.existsSync(data_dir)){
    fs.mkdirSync(data_dir);
    fs.writeFileSync(data_dir + '/prefixes.json', "{}", { flag: "wx" });
    fs.writeFileSync(data_dir + '/autoresponder.json', "{}", { flag: "wx" });
}

// end

var module_dict = {};
glob.sync('./modules/**/*.js').forEach(function (file) {
    let dash = file.split('/');
    if (dash.length == 4) {
        let dot = dash[3].split('.');
        if (dot.length == 2 && dash[2] == dot[0]) {
            let key = dot[0];
            module_dict[key] = require(file);
        }
    }
});

const { Client, Intents } = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS);
myIntents.add(Intents.FLAGS.GUILD_MESSAGES);
myIntents.add(Intents.FLAGS.GUILD_MEMBERS);
myIntents.add(Intents.FLAGS.DIRECT_MESSAGES);

const client = new Client({ intents: myIntents });
const config = require('./config.json');

client.once('ready', () => {

    client.user.setPresence({
        status: 'active',
        activities: [config["activity"]]
    });

    console.log('active');

});


client.on('messageCreate', async message => {

    fs.readFile(data_dir + '/autoresponder.json', (err, data) => {
        if (err) throw err;
        let auto = JSON.parse(data.toString().trim());
        if (!auto.hasOwnProperty(message.guild.id))
            auto[message.guild.id] = {};
        if (auto[message.guild.id].hasOwnProperty(message.content.toLowerCase())) {
            message.channel.send(auto[message.guild.id][message.content.toLowerCase()]);
            return;
        }
    });

    var prefix;

    if (message.content == '') return;

    if (message.guild) {
        let prefixes = JSON.parse(
            fs
                .readFileSync(data_dir + '/prefixes.json')
                .toString()
                .trim()
        );

        if (p.hasOwnProperty(message.guild.id)) {
            prefix = prefixes[message.guild.id];
        } else prefix = 'lel.';
    } else prefix = 'lel.';

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args[0];
    const param = args[1];
    const context = message.content.slice((prefix + command).length).trim();


    if ( message.content.startsWith(prefix) && command in module_dict ) module_dict[command](message, context);


});


client.login(config.token).catch(console.log);


module.exports = {
    data_dir: data_dir
};