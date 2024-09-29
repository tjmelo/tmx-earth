import { ICommonName } from "../interfaces"

const orderCondition = (B: { common: string }, A: { common: string }) => ((B.common > A.common) ? -1 : 0)

export const alphabeticalOrderData = (element: []): [] => {
    return element.sort(
        ({name: A}: ICommonName, {name: B}: ICommonName): number => (A.common > B.common) 
            ? 1 : orderCondition(B, A)
        )
}
