const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb://admin:no-food225@ds149034.mlab.com:49034/nofood_dev'
    }
}

module.exports = variables;