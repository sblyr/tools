const expect = require('expect')
const createTransaction = require('./createTransaction')

describe('Transaction', () => {

    describe('#createTransaction()', () => {

        it("should throw exception transaction type not found", () => {

            expect(() => {
                createTransaction({
                    type: 'unknown'
                })
            }).toThrowError('transaction type not found')

        })
    })
})