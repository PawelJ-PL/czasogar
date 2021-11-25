import { Time } from "../../../application/types/Time"

const numberWithZero = (n: number) => n.toString(10).padStart(2, "0")

export function formatTime(time: Time): string {
    return `${numberWithZero(time.hour)} : ${numberWithZero(time.minute)}`
}

export function formatMinutesAsHours(minutes: number): string {
    const hours = Math.trunc(minutes / 60)
    const mins = minutes % 60

    return mins > 0 ? `${hours.toString(10)} : ${numberWithZero(mins)}` : hours.toString(10)
}
