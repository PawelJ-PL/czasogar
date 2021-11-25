import { z } from "zod"
import { isAfter, TimeSchema } from "../../../application/types/Time"

export const ProfileSchema = z
    .object({
        profileName: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        position: z.string(),
        defaultStartTime: TimeSchema,
        defaultEndTime: TimeSchema,
    })
    .refine((data) => isAfter(data.defaultEndTime, data.defaultStartTime), {
        message: "Czas zakończenia musi być późniejszy niż czas rozpoczęcia",
        path: ["defaultEndTime"],
    })

export type Profile = z.infer<typeof ProfileSchema>
