export class InvalidWorkingHoursRange extends Error {
    readonly dayNumbers: number[]

    constructor(dayNumbers: number[]) {
        super(`Time range for days ${dayNumbers.join(", ")} is invalid`)
        this.name = new.target.name
        Object.setPrototypeOf(this, new.target.prototype)
        this.dayNumbers = dayNumbers
    }
}
