export const parseNumber = (element: number) => {
    const number = element.toString().split(""),
        qtdeDivisor = Math.floor(number.length / 3),
        arr = []

    for (let i = 0; i < qtdeDivisor; i++) {
        const ind = number.length - 3 * (i + 1) - 1
        if (ind !== -1) arr.push(ind)
    }

    for (const element of arr)
        number.splice(element + 1, 0, ".")
    
    return number.join("")
}
