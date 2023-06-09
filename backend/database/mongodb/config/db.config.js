require('dotenv').config();

const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const clusterName = process.env.MONGO_CLUSTER_NAME
const databaseName = process.env.MONGO_DATABASE_NAME

module.exports = {
    url: `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`
}