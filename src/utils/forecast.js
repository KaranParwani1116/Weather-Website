const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=51b8f0aa7cdc19994a97514894aa04e3&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url, json : true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, 'current temprature is ' + body.current.temperature + ' but feels like ' + body.current.feelslike + ' and has a humidity of ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast