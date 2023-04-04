import { main } from '.'

describe(`index.ts`, () => {
    describe('main', () => {
        it('should print hello world', () => {
            console.log = jest.fn()
            main()
            expect(console.log).toHaveBeenCalledWith('hello world')
        })
    })
})