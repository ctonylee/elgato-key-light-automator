const axios = require('axios').default;

async function getKeylight(url) {
    return await axios.get(url);
}

async function turnKeyLightOn(keylightService, option) {
    const keylightUrl = `http://${keylightService.ip}:${keylightService.port}/elgato/lights`;
    return await turnLightOn(keylightUrl, option);
}

async function toggleKeyLight(keylightService) {
    const keylightUrl = `http://${keylightService.ip}:${keylightService.port}/elgato/lights`;
    const keylightData = await getKeylight(keylightUrl);
    const light = keylightData.data.lights[0];

    return light.on ? await turnLightOff(keylightUrl) : await turnLightOn(keylightUrl);
}

async function turnLightOff(url) {
    return await axios.put(url, {
        "Lights": [
            {
                "On": 0
            }
        ]
    });
}

async function turnLightOn(url, options) {
    return await axios.put(url, {
        "Lights": [
            {
                "On": 1,
                ...options,
            }
        ]
    });
}

module.exports = {
    toggleKeyLight: toggleKeyLight,
    turnKeyLightOn: turnKeyLightOn
};
