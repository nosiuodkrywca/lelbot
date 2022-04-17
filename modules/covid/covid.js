function covid(message, context) {

    message.channel.send("Deprecated - global COVID API is dead");

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
            "x-rapidapi-key": "d2f5746fd3msh67138833b1dc186p1551a1jsna307db625aa3"
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