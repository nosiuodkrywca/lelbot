const en = {
    error: "Sorry, there's been an error. Please contact the developer if this persists.",
    known_bug: "Sorry, there's been an error. This is a known bug and it's being studied.",
    deletion: "This thread is going to be deleted.",

    error_message: "Error message from the server:"
}


const lang =  {
    error: (error) => {
        return en.error + " " + en.error_message + " **" + error + "** " + en.deletion;
    },
    deletion: () => {
        return en.deletion;
    }
}


module.exports = lang;