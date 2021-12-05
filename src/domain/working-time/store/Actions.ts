import { Profile } from "./../../application-profile/types/Profile"
import { Absence } from "./../types/Absence"
import { PublicHoliday } from "./../types/PublicHoliday"
import actionCreatorFactory from "typescript-fsa"
import { SummaryDay } from "../types/SummaryDay"

const actionCreator = actionCreatorFactory("WORKING_TIME")

export type PublicHolidaysParams = { year: number; month: number }

export type ActiveDateParams = { year: number; month: number }

export const fetchPublicHolidaysAction = actionCreator.async<PublicHolidaysParams, PublicHoliday[], Error>(
    "FETCH_PUBLIC_HOLIDAYS"
)

export const setActiveDateAction = actionCreator<ActiveDateParams | null>("SET_ACTIVE_DATE")

export const addAbsenceAction = actionCreator<Absence>("ADD_ABSENCE")

export const removeAbsenceAction = actionCreator<string>("REMOVE_ABSENCE")

export const setAbsencesAction = actionCreator<Absence[]>("SET_ABSENCES")

export const calculateSummaryAction = actionCreator.async<{ profile: Profile }, SummaryDay[], Error>(
    "CALCULATE_SUMMARY"
)

export const updateSummaryEntryAction = actionCreator<SummaryDay>("UPDATE_SUMMARY_ENTRY")

export const generatePdfReportAction = actionCreator.async<
    { summary: SummaryDay[]; profile: Profile; activeDate: ActiveDateParams },
    Blob,
    Error
>("GENERATE_PDF_REPORT")

export const resetGeneratePdfReportAction = actionCreator("RESET_GENERATE_PDF_REPORT")
