const scalarTypes = {
    json: {
        serialize: value => {
            try {
                return value ? JSON.parse(value) : null
            } catch (e) {
                return null
            }
        },
        parseValue: value => {
            try {
                return value ? JSON.stringify(value) : null
            } catch (e) {
                return null
            }
        }
    }
}

module.exports = scalarTypes