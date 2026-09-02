import { ICommonName } from "../interfaces"

const getDisplayName = (name: { common?: string; official?: string } | undefined) => {
    return name?.common || name?.official || 'Unavailable'
}

const orderCondition = (B: { common: string }, A: { common: string }) => ((B.common > A.common) ? -1 : 0)

export const alphabeticalOrderData = <T extends ICommonName>(element: T[]): T[] => {
    return [...element].sort((itemA: T, itemB: T): number => {
        const nameA = getDisplayName(itemA?.name)
        const nameB = getDisplayName(itemB?.name)

        if (nameA === nameB) {
            return 0
        }

        return nameA > nameB ? 1 : -1
    })
}
