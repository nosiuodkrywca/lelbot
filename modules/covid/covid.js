const lang = require('../../builtin/lang');

covid = (message, context) => {

    try {
        throw("Module deprecated because the COVID API is no longer available.");
    } catch(e) {
        message.reply(lang.error(e)).then((reply)=>{
            setTimeout(() => {
                reply.delete();
                if(message.guild) message.delete();
            }, e.length*150);
        });
    }
    

    /* if (message.content.startsWith("👑")) {
        //korona
        let m = message.content.replace("👑", "").trim();

        let req, ms;

        if (m == "") {
            req = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");
            ms = "Cases worldwide 🌎";
        } else {
            req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country");
            ms = "Cases for " + d.country + " " + flag(d.country);
        }

        req.query({
            format: "undefined"
        });

        req.headers({
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": ""
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            let d = res.body["0"];
            let e = {
                fields: [
                    {
                        name: "Confirmed 🦠",
                        value: d["confirmed"],
                        inline: true
                    },
                    {
                        name: "Recovered 💖",
                        value: d["recovered"],
                        inline: true
                    },
                    {
                        name: "Critical 💉",
                        value: d["critical"],
                        inline: true
                    },
                    {
                        name: "Deaths 💀",
                        value: d["deaths"],
                        inline: true
                    }
                ]
            };
            message.channel.send(ms, { embed: e });
            console.log(res.body);
        });
    } */
}

module.exports = covid