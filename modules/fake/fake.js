const webshot = require('node-webshot');
const fs = require('fs');

fake = async function (message, context) {
    let options = { captureSelector: "#msg" };

    const param = context
        .trim()
        .split(/ +/g)[0];

    let avatar, content, color, user, name;

    if (message.mentions.members.first() || message.mentions.users.first()) {

        avatar = await message.mentions.users.first().avatarURL();

        content = context
            .slice(param.length + 1)
            .replace(/<a?:(?!GW)[\w\d_]+:\d+>/g, "")
            .replace(/\+[\w]*/, "")
            .trim();

        color =
            message.mentions.members.first().displayHexColor.substr(1) ||
            "000000";
        if (color == "000000") color = "FFFFFF";

        user =
            message.mentions.members.first() || message.mentions.users.first();
        name = user.displayName || user.username;


    } else {
    /*
        avatar = await message.author.avatarURL();
        content = context
            .slice(0)
            .replace(/<a?:(?!GW)[\w\d_]+:\d+>/g, "")
            .trim();

        color = message.author.displayHexColor.substr(1);
        if (color == "000000") color = "FFFFFF";

        user =
            message.author;
        name = user.displayName || user.username;
        */
       return;
    }

    let req =
        "https://playground.nosiu.pl/fakemessage/index.php?user=" + encodeURI(name) +
        "&avatar=" + avatar +
        "&color=" + color +
        "&content=" + encodeURI(content) +
        "&id=" + message.mentions.users.first().id;
    if (context.match(/\+metal/)) req += "&metal";

    try {
        webshot(req, "./modules/fake/temp.png", options, function (err) {
            if (!err) {
                message.channel.send({ files: ["./modules/fake/temp.png"] });
                if (message.guild) message.delete();
            }
        });
    } catch (e) { console.log(e); }
}


module.exports = fake