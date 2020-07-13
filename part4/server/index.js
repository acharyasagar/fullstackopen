const http = require('http')

const app = require('./app')
const { PORT } = require('./utils/constants')

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))