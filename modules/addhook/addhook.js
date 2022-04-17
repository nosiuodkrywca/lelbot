// TODO (fix)

const fs = require('fs')

addhook = function (message, context) {
    fs.readFile('./data/webhooks.json', (err, data) => {
        if (err) throw err;
        let hooks = JSON.parse(data.toString().trim());

        if (!hooks.hasOwnProperty(message.channel.id)) {

            try {
                message.channel
                    .createWebhook(
                        'Cpt. HookBot',
                        'https://lel.nosiu.pl/lel/hook.png'
                    )
                    .then(h => {
                        hooks[message.channel.id] = {};
                        hooks[message.channel.id]['id'] = h.id;
                        hooks[message.channel.id]['token'] = h.token;
                        hooks[message.channel.id]['channel'] = message.channel.name;
                        fs.writeFile(
                            './data/webhooks.json',
                            JSON.stringify(hooks),
                            function (e) {
                                if (!e) h.send(h.name + ' deployed');
                            }
                        );
                    })
                    .catch(console.error());
            } catch (error) { console.log(error); }

        } else {
            let hook = new Discord.WebhookClient(
                hooks[message.channel.id]['id'],
                hooks[message.channel.id]['token']
            );
            hook.send(hook.name + ' deployed');
        }
    });
}

module.exports = addhook