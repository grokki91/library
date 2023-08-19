const textDecoder = new TextDecoder('utf-8')

const postCounter = (id) => {
    try {
        return fetch(`http://counter:3001/counter/${id}/incr`, {method: 'POST'})
            .then(response => response.body.getReader().read())
            .then(({value, done}) => JSON.parse(textDecoder.decode(value)).count)
            .catch(err => console.log({'error': err}))
    } catch (error) {
        console.log(error)
    }
}

module.exports = postCounter