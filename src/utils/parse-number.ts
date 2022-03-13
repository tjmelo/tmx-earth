export const parseNumber = (element: number) => {
    let number = element.toString().split(""),
        qtdeDivisor = Math.floor(number.length / 3),
        arr = []

    for (let i = 0; i < qtdeDivisor; i++) {
        let ind = number.length - 3 * (i + 1) - 1
        if (ind !== -1) arr.push(ind)
    }

    for (let i = 0; i < arr.length; i++)
        number.splice(arr[i] + 1, 0, ".")
    return number.join("")
}
