const fs = require('fs')

auto = function (message, context) {
    if (context.match(/\*\*is\*\*/)) {
        fs.readFile(__dirname + "../../data/autoresponder.json", (err, data) => {
            if (err) throw err;
            let auto = JSON.parse(data.toString().trim());
            let na = context
                .trim()
                .split("**is**");
            na[0] = na[0].trim().toLowerCase();
            na[1] = na[1].trim();
            if (!auto.hasOwnProperty(message.guild.id))
                auto[message.guild.id] = {};
            if (auto[message.guild.id].hasOwnProperty(na[0])) {
                message.channel.send(`${na[0]} już istnieje`);
            } else {
                auto[message.guild.id][na[0].trim()] = na[1].trim();
                fs.writeFile(
                    __dirname + "../../data/autoresponder.json",
                    JSON.stringify(auto),
                    function (e) {
                        message.channel.send(`${na[0]}: **${na[1]}**`);
                    }
                );
            }
        });
    } else {
        message.channel.send(
            `*keyword* **\\\*\\\*is\\\*\\\*** *response*`
        );
    }
}

module.exports = auto