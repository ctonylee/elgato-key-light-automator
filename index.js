const toggleKeyLight = require('./keylight');
const bonjour = require('bonjour')();

const browser = bonjour.find({type: 'elg'}, function (service) {
    toggleKeyLight({
      ip: service['referer'].address,
      port: service.port
    });
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
counter(3);


