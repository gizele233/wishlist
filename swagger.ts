
const swaggerAutogen = require('swagger-autogen')()
// import SwaggerJsdoc from 'swa'
const outputFile = 'src/swagger_output.json'
const endpointsFiles = ['src/router.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./dist/src/app')
})