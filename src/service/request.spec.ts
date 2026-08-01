import { api } from "../model/api"
import { toRequestAll, toRequestOne } from "./request"

jest.mock("../model/api", () => ({
    api: {
        get: jest.fn(),
    },
}))

const mockedApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('country request handling', () => {
    beforeEach(() => {
        mockedApiGet.mockReset()
    })

    it('normalizes missing values in list responses', async () => {
        mockedApiGet.mockResolvedValueOnce({
            data: [{
                name: { common: 'Brazil' },
                flags: {},
                region: 'South America',
                cca3: 'BRA',
            }],
            status: 200,
        } as never)

        const result = await toRequestAll()

        expect(result.data[0]).toMatchObject({
            name: { common: 'Brazil', official: 'Unavailable', nativeName: {} },
            flags: { svg: 'Unavailable' },
            capital: 'Unavailable',
            area: 'Unavailable',
            subregion: 'Unavailable',
        })
    })

    it('wraps a single country payload into a normalized array', async () => {
        mockedApiGet.mockResolvedValueOnce({
            data: { name: { common: 'Canada' } },
            status: 200,
        } as never)

        const result = await toRequestOne('Canada')

        expect(mockedApiGet).toHaveBeenCalledWith('/countries/name/Canada')
        expect(result.data[0].name.common).toBe('Canada')
        expect(result.data[0].flags.svg).toBe('Unavailable')
    })
})