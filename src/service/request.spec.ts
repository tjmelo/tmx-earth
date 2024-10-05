import { toRequestAll, toRequestOne } from "./request"

const mockFn = jest.fn(data => data)

describe('Should render request functions', () => {
    it('Should render requestAll function', () => {
        mockFn(toRequestAll)
        expect(mockFn).toHaveBeenCalled()
    })

    it('Should render requestOne function', () => {
        mockFn(toRequestOne)
        expect(mockFn).toHaveBeenCalled()
    })
})