const lang = require('../../builtin/lang');

haiku = (message, context) => {

    try {
        throw("Module deprecated because of a change in Discord message API. The module is going to be rewritten to use logs to generate haikus.");
    } catch(e) {
        message.reply(lang.error(e)).then((reply)=>{
            setTimeout(() => {
                reply.delete();
                if(message.guild) message.delete();
            }, e.length*150);
        });
    }


    /*if (message.channel.id != "665993270769221648") return;
    if (message.mentions.channels.first()) {
        let ch = message.mentions.channels.first();
    } else {
        let ch = message.channel;
    }

    ch.fetchMessages({ limit: 100 }).then(messages => {
        var i = 0,
            licznik = 0;
        var haiku = new Array();
        var rnd;
        var rndit;
        var maxmsg = 100 * Math.exp(-15 / messages.size);

        let msgks = Array.from(messages.keys());

        let j = 0;
        for (let find = 0; find < 3; find++) {
            msgks = shuffle(msgks);

            for (let iter = 0; iter < messages.size; iter++) {
                let item = messages.get(msgks[iter]);
                if (iter % messages.size == 0) j++;

                if (item.author.id != "544602993111203859")
                    if (!item.content.toString().match(/^spin./))
                        if (!item.content.toString().match(/@/))
                            if (!item.content.toString().match(/http/))
                                if (message.channel.id == "303514414181646336") {
                                    if (
                                        syllables(item.content, "en") ==
                                        7 - (1 - (i % 2)) * 2
                                    ) {
                                        haiku[i++] = item;
                                        //console.log("found: "+item+" with "+syllables(item, 'en')+" syllables\n");
                                    }
                                } else {
                                    if (
                                        syllables(item.content) ==
                                        7 - (1 - (i % 2)) * 2
                                    ) {
                                        haiku[i++] = item;
                                        //console.log("znaleziono: "+item+" o "+syllables(item)+" sylabach\n");
                                    }
                                }

                if (i == 3) break;
            }
        }

        if (i == 3) {
            message.channel.send({
                embed: {
                    title: "Haiku",
                    color: 3447003,
                    description:
                        haiku[0].content +
                        "\n" +
                        haiku[1].content +
                        "\n" +
                        haiku[2].content,
                    footer: {
                        text:
                            "by: " +
                            haiku[0].author.username +
                            ", " +
                            haiku[1].author.username +
                            " and " +
                            haiku[2].author.username
                    }
                }
            });


        } else {
            return;
        }
    });

}


function syllables(word, lang = "pl") {
    word = word.toString().toLowerCase();
    var match;
    word = word.replace(/\:\w\:/, "");

    word = word.replace(/\<\:[a-z\_]*\:\d*\>/i, "");

    word = word.replace(/1/, "jeden");
    word = word.replace(/2/, "dwa");
    word = word.replace(/3/, "trzy");
    word = word.replace(/4/, "cztery");
    word = word.replace(/5/, "pięć");
    word = word.replace(/6/, "sześć");
    word = word.replace(/7/, "siedem");
    word = word.replace(/8/, "osiem");
    word = word.replace(/9/, "dziewięć");
    word = word.replace(/10/, "dziesięć");
    word = word.replace(/11/, "jedenaście");
    word = word.replace(/12/, "dwanaście");
    word = word.replace(/13/, "trzynaście");
    word = word.replace(/14/, "czternaście");
    word = word.replace(/15/, "piętnaście");
    word = word.replace(/16/, "szesnaście");
    word = word.replace(/17/, "siedemnaście");
    word = word.replace(/18/, "osiemnaście");
    word = word.replace(/19/, "dziewiętnaście");
    word = word.replace(/20/, "dwadzieścia");

    if (lang == "en") {
        if (word.length <= 3) {
            return 1;
        }
        word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "");
        word = word.replace(/^y/, "");
        match = word.match(/[aeiouy]{1,2}/g);
    } else {
        match = word.match(/[aąeęioóuy]{1,2}/g);
    }

    return match != null ? match.length : 0; */
}

module.exports = haiku;