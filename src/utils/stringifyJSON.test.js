const expect = require('expect')
const stringifyJSON = require('./stringifyJSON')

describe('Utils', () => {

    describe('#stringifyJSON()', () => {

        it("should return stringified json when it's a valid object", () => {

            const input = { test: 123 }
            const expected = JSON.stringify(input)

            const result = stringifyJSON(
                input
            )

            expect(result).toEqual(expected)
        })
    })
})