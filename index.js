const toggleKeyLight = require('./keylight');
const bonjour = require('bonjour')();

const optionsWeb = {"On": 1, "Temperature": 226, "Brightness": 30};
const optionsWhite = {"On": 1, "Temperature": 100, "Brightness": 80};

let args = process.argv.slice(2).map(a => a.toLowerCase());
let option = args.some(a => a === 'white') ? optionsWhite : args.some(a => a === 'web') ? optionsWeb : undefined;

const browser = bonjour.find({type: 'elg'}, function (service) {
    toggleKeyLight({
        ip: service['referer'].address,
        port: service.port
    }, option);
});

const counter = function (value = 6) {
    console.log(`… terminating program in ${value--} second(s)`);
    if (value > 0) {
        setTimeout(() => {
            counter(value)
        }, 1000);

    } else {
        bonjour.destroy();
    }
}
counter(5);


