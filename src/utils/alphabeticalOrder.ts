import { ICommonName } from "../interfaces"

export const alphabeticalOrderData = (element: []): [] => {
    return element.sort(
        ({name: A}: ICommonName, {name: B}: ICommonName): number => (A.common > B.common) 
            ? 1 
            : ((B.common > A.common) 
                ? -1 
                : 0
            )
        )
}
