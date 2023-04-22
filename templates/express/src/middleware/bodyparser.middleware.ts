import bodyParser from 'body-parser'

const options = [
    bodyParser.json(),
    bodyParser.urlencoded({extended: true})
]

export default options