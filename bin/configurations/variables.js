const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb://admin:no-food225@ds149034.mlab.com:49034/nofood_dev'
    },
    Security: {
        secretKey: 'd41d8cd98f00b204e9800998ecf8427e'
    }
}

module.exports = variables;