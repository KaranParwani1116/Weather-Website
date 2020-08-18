const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FyYW4xMTE2IiwiYSI6ImNrZDIxb3MydzE4enEzMXBnd3Q0anEzb3cifQ.k1-VPV5uVyYwAr9ohlVNKg&limit=1'
    request({url, json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services')
        } else if(body.features.length === 0) {
            callback('Unable to find the location')
        } else {
            const data = {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                place : body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = {
    geocode : geocode
}