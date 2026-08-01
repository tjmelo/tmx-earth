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

    it('requests the migrated list endpoint and normalizes missing values from the provider', async () => {
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

        expect(mockedApiGet).toHaveBeenCalledWith('/countries')
        expect(result.data[0]).toMatchObject({
            name: { common: 'Brazil', official: 'Unavailable', nativeName: {} },
            flags: { svg: 'Unavailable' },
            capital: 'Unavailable',
            area: 'Unavailable',
            subregion: 'Unavailable',
            population: 'Unavailable',
            region: 'South America',
            cca3: 'BRA',
        })
    })

    it('preserves the existing UI-facing fields for list responses from the migrated endpoint', async () => {
        mockedApiGet.mockResolvedValueOnce({
            data: [{
                name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
                flags: { svg: 'https://flagcdn.com/br.svg' },
                population: 214000000,
                area: 8515767,
                region: 'South America',
                capital: ['Brasília'],
                cca3: 'BRA',
            }],
            status: 200,
        } as never)

        const result = await toRequestAll()

        expect(result.data[0]).toMatchObject({
            name: { common: 'Brazil', official: 'Federative Republic of Brazil', nativeName: {} },
            flags: { svg: 'https://flagcdn.com/br.svg' },
            population: 214000000,
            area: 8515767,
            region: 'South America',
            capital: 'Brasília',
            cca3: 'BRA',
        })
    })

    it('wraps a single country payload into a normalized array using the name-based lookup endpoint', async () => {
        mockedApiGet.mockResolvedValueOnce({
            data: { name: { common: 'Canada' } },
            status: 200,
        } as never)

        const result = await toRequestOne('Canada')

        expect(mockedApiGet).toHaveBeenCalledWith('/countries/name/Canada')
        expect(result.data[0].name.common).toBe('Canada')
        expect(result.data[0].flags.svg).toBe('Unavailable')
        expect(result.data[0].cca3).toBe('Unavailable')
    })
})