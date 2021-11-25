import { Time } from "../../../application/types/Time"
export type SummaryDay = {
    date: Date
    dayName: string
    note?: string
    workingHours: { start: Time; end: Time } | null
}
