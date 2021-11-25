import { SummaryDay } from "./../types/SummaryDay"
import { Profile } from "./../../application-profile/types/Profile"
import { Absence, DateOrRange } from "./../types/Absence"
import { ActiveDateParams } from "../store/Actions"
import getDaysInMonth from "date-fns/getDaysInMonth"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import range from "ramda/src/range"
import isWeekend from "date-fns/isWeekend"
import isSameDay from "date-fns/isSameDay"
import isWithinInterval from "date-fns/isWithinInterval"

export function generateMonthSummary(
    summaryFor: ActiveDateParams,
    absences: Absence[],
    profile: Profile
): SummaryDay[] {
    const daysInMonth = getDaysInMonth(new Date(summaryFor.year, summaryFor.month - 1))
    const daysAsDates = range(1, daysInMonth + 1).map((d) => new Date(summaryFor.year, summaryFor.month - 1, d))
    return daysAsDates.map((d) => entryForDay(d, absences, profile))
}

const entryForDay = (day: Date, absences: Absence[], profile: Profile) => {
    const dayName = format(day, "EEEEEE", { locale: pl })
    const maybeAbsence = getAbsenceForDay(day, absences)
    const workingDay = !maybeAbsence && !isWeekend(day)
    const workingHours = workingDay
        ? {
              start: { hour: profile.defaultStartTime.hour, minute: profile.defaultStartTime.minute },
              end: { hour: profile.defaultEndTime.hour, minute: profile.defaultEndTime.minute },
          }
        : null

    return {
        date: day,
        dayName,
        note: maybeAbsence?.note,
        workingHours: workingHours,
    }
}

const getAbsenceForDay = (day: Date, absences: Absence[]) => {
    const publicHoliday = absences.filter((a) => a.type === "PublicHoliday").find((a) => isInDateOrRange(day, a.date))
    if (publicHoliday) {
        return publicHoliday
    }
    if (isWeekend(day)) {
        return null
    }
    const customAbsence = absences.filter((a) => a.type === "Custom").find((a) => isInDateOrRange(day, a.date))
    return customAbsence ?? null
}

const isInDateOrRange = (day: Date, dateOrRange: DateOrRange) => {
    if (dateOrRange instanceof Date) {
        return isSameDay(day, dateOrRange)
    } else {
        return isWithinInterval(day, { start: dateOrRange[0], end: dateOrRange[1] })
    }
}
