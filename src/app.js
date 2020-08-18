const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname , '../public')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Karan Parwani'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Address Not Found'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
           return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData, 
                location : place
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Karan Parwani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Karan Parwani'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '',
        name : 'Karan Parwani',
        errorMessage : 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Karan Parwani',
        errorMessage : '404 Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})