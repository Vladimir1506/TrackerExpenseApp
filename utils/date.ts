export const getFormattedDate = (date: Date) => `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
export const getDateMinusDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
export const getDateFromString = (date: string) => {
    const dateArr = date.match(/\d+/g)
    const d = dateArr?.[0]
    const m = dateArr?.[1]
    const y = dateArr?.[2]
    if (d && m && y) {
        return new Date(+y, +m - 1, +d)
    } else return new Date()

}
