import pl from "date-fns/locale/pl"
import format from "date-fns/format"

export type DateOrRange = Date | [Date, Date]

export const formatDateOrRange: (input: DateOrRange) => string = (input: DateOrRange) =>
    input instanceof Date
        ? format(input, "PP", { locale: pl })
        : `${formatDateOrRange(input[0])} - ${formatDateOrRange(input[1])}`

export type Absence = {
    id: string
    date: DateOrRange
    note?: string
    type: "PublicHoliday" | "Custom"
}
