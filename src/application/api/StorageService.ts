import { ZodSchema } from "zod"

const storageService = {
    saveObject: <T extends unknown>(key: string, element: T): Promise<void> => {
        const json = JSON.stringify(element)
        return Promise.resolve(localStorage.setItem(key, json))
    },
    getObject: async <T>(key: string, schema: ZodSchema<T>): Promise<T | null> => {
        const serialized = localStorage.getItem(key)
        if (!serialized) {
            return Promise.resolve(null)
        }
        let object

        try {
            object = JSON.parse(serialized)
        } catch (e) {
            return Promise.reject(new Error(`Value ${serialized} is not valid JSON`))
        }
        const result = await schema.safeParseAsync(object)

        if (result.success) {
            return result.data
        } else {
            return Promise.reject(result.error)
        }
    },
    deleteItem(key: string): Promise<void> {
        return Promise.resolve(localStorage.removeItem(key))
    },
}

export default storageService
