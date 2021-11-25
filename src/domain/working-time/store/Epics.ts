import { filter, map } from "rxjs/operators"
import { WorkingTimeRecord } from "./../types/WorkingTimeStatement"
import { SummaryDay } from "./../types/SummaryDay"
import { Time } from "./../../../application/types/Time"
import { AppState, Deps } from "./../../../application/store/index"
import { combineEpics, Epic } from "redux-observable"
import { createEpic } from "./../../../application/store/async/AsyncActionEpic"
import {
    calculateSummaryAction,
    generatePdfReportAction,
    fetchPublicHolidaysAction,
    resetGeneratePdfReportAction,
    updateSummaryEntryAction,
} from "./Actions"
import { Action, AnyAction } from "redux"
import { generateMonthSummary } from "../utils/reportGenerator"
import { InvalidWorkingHoursRange } from "../types/Errors"
import { generateMonthlyReport } from "../components/report/MonthlyPdfReport"

const publicHolidaysEpic = createEpic(fetchPublicHolidaysAction, ({ year, month }, deps) =>
    deps.workingTimeApi.fetchPublicHolidays(year, month)
)

const summaryEpic = createEpic(calculateSummaryAction, ({ profile }, _, state) => {
    if (!state.workingHours.activeDate) {
        return Promise.reject(new Error("Period for summary not set"))
    }
    const absences = state.workingHours.absences
    const result = generateMonthSummary(state.workingHours.activeDate, absences, profile)
    return Promise.resolve(result)
})

const timeAsMinutesSinceDayStart = (time: Time) => {
    const hoursAsMinutes = time.hour * 60
    return hoursAsMinutes + time.minute
}

const parseRecord: (day: SummaryDay) => WorkingTimeRecord = (day: SummaryDay) => {
    const workedMinutes = day.workingHours
        ? timeAsMinutesSinceDayStart(day.workingHours.end) - timeAsMinutesSinceDayStart(day.workingHours.start)
        : undefined
    return {
        dayNumber: day.date.getDate(),
        workStart: day.workingHours?.start,
        workEnd: day.workingHours?.end,
        minutes: workedMinutes,
        note: day.note,
    }
}

const generateDocumentEpic = createEpic(generatePdfReportAction, ({ summary, profile, activeDate }) => {
    const records = summary.map(parseRecord)
    const invalidWorkTimeRecords = records.filter((r) => r.minutes !== undefined && r.minutes < 1)
    if (invalidWorkTimeRecords.length > 0) {
        return Promise.reject(new InvalidWorkingHoursRange(invalidWorkTimeRecords.map((r) => r.dayNumber)))
    }
    const totalMinutes = records.reduce((prev, current) => prev + (current.minutes ?? 0), 0)
    const reportInput = {
        year: activeDate.year,
        month: activeDate.month,
        firstName: profile.firstName,
        lastName: profile.lastName,
        position: profile.position,
        totalMinutes,
        records: records,
    }
    return generateMonthlyReport(reportInput)
})

const resetDocGenerationOnSummaryUpdateEpic: Epic<AnyAction, AnyAction, AppState, Deps> = (action$) =>
    action$.pipe(
        filter((a) => updateSummaryEntryAction.match(a) || calculateSummaryAction.done.match(a)),
        map(() => resetGeneratePdfReportAction())
    )

export const workingTimeEpics = combineEpics<Action, Action, AppState, Deps>(
    publicHolidaysEpic,
    summaryEpic,
    generateDocumentEpic,
    resetDocGenerationOnSummaryUpdateEpic
)
