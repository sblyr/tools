const { assert } = require('chai')
const parseJSON = require('./parseJSON')

describe('Utils', () => {

    describe('#parseJSON()', () => {

        it("should return json when it's a valid stringified object", () => {

            const input = { test: 123 }

            const result = parseJSON(
                JSON.stringify(input)
            )

            assert.deepEqual(result, input)
        })

        it("should return null when it's not a valid stringified object", () => {

            const result = parseJSON("invalid input")

            assert.equal(result, null)
        })
    })
})