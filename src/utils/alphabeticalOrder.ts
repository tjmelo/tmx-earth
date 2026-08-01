import { ICommonName } from "../interfaces"

const orderCondition = (B: { common: string }, A: { common: string }) => ((B.common > A.common) ? -1 : 0)

export const alphabeticalOrderData = <T extends ICommonName>(element: T[]): T[] => {
    return [...element].sort(
        ({name: A}: T, {name: B}: T): number => (A.common > B.common)
            ? 1 : orderCondition(B, A)
        )
}
