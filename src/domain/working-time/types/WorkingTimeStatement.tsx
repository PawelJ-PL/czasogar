import { Time } from "../../../application/types/Time"

export type WorkingTimeRecord = {
    dayNumber: number
    workStart?: Time
    workEnd?: Time
    minutes?: number
    note?: string
}

export type WorkingTimeStatement = {
    year: number
    month: number
    firstName: string
    lastName: string
    position: string
    totalMinutes: number
    records: WorkingTimeRecord[]
}
