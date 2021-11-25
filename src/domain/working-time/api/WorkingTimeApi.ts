import ky from "ky"
import { PublicHoliday, PublicHolidaySchema } from "./../types/PublicHoliday"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

const PublicHolidayErrorSchema = z.object({
    status: z.object({
        error: z.object({}).passthrough(),
    }),
})

const PublicHolidayResponseSchema = PublicHolidaySchema.omit({ id: true })

const workingTimeApi = {
    fetchPublicHolidays(year: number, month: number): Promise<PublicHoliday[]> {
        return ky
            .get("https://api.allorigins.win/raw", {
                searchParams: { url: `https://date.nager.at/api/v3/publicholidays/${year}/PL` },
            })
            .json()
            .then((data) => {
                const maybeError = PublicHolidayErrorSchema.safeParse(data)
                if (maybeError.success) {
                    return Promise.reject(
                        new Error(`Request failed with ${JSON.stringify(maybeError.data.status.error)}`)
                    )
                } else {
                    return data
                }
            })
            .then((data) => PublicHolidayResponseSchema.array().parse(data))
            .then((holidays) => holidays.filter((h) => h.date.getMonth() + 1 === month))
            .then((holidays) => holidays.map((h) => ({ ...h, id: uuidv4() })))
    },
}

export default workingTimeApi
