import { z } from "zod"

export const TimeSchema = z.object({
    hour: z.number().min(0).max(23),
    minute: z.number().min(0).max(59),
})

export type Time = z.infer<typeof TimeSchema>

export function timeEqual(time: Time, otherTime: Time): boolean {
    if (time.hour === otherTime.hour && time.minute === otherTime.minute) {
        return true
    } else {
        return false
    }
}

export function isBefore(time: Time, otherTime: Time): boolean {
    if (time.hour < otherTime.hour) {
        return true
    } else if (time.hour === otherTime.hour && time.minute < otherTime.minute) {
        return true
    } else {
        return false
    }
}

export function isAfter(time: Time, otherTime: Time): boolean {
    if (timeEqual(time, otherTime)) {
        return false
    } else if (isBefore(time, otherTime)) {
        return false
    } else {
        return true
    }
}
