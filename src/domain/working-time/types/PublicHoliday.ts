import { z } from "zod"

export const PublicHolidaySchema = z.object({
    id: z.string(),
    date: z
        .string()
        .refine((data) => !Number.isNaN(Date.parse(data)), { message: "Invalid date" })
        .transform((data) => new Date(data)),
    localName: z.string(),
})

export type PublicHoliday = z.infer<typeof PublicHolidaySchema>
