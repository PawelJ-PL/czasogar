import { Absence } from "./../types/Absence"
import { combineReducers } from "redux"
import { reducerWithInitialState } from "typescript-fsa-reducers"
import { createReducer } from "../../../application/store/async/AsyncActionReducer"
import {
    ActiveDateParams,
    addAbsenceAction,
    calculateSummaryAction,
    generatePdfReportAction,
    fetchPublicHolidaysAction,
    removeAbsenceAction,
    resetGeneratePdfReportAction,
    setAbsencesAction,
    setActiveDateAction,
    updateSummaryEntryAction,
} from "./Actions"
import findIndex from "ramda/src/findIndex"
import { SummaryDay } from "../types/SummaryDay"
import { update } from "ramda"

const publicHolidaysReducer = createReducer(fetchPublicHolidaysAction).build()

const activeDateReducer = reducerWithInitialState<ActiveDateParams | null>(null)
    .case(setActiveDateAction, (_, action) => action)
    .build()

const absencesReducer = reducerWithInitialState<Absence[]>([])
    .case(addAbsenceAction, (state, action) => [...state, action])
    .case(removeAbsenceAction, (state, action) => state.filter((a) => a.id !== action))
    .case(setAbsencesAction, (_, action) => action)
    .case(setActiveDateAction, () => [])
    .build()

const summaryReducer = createReducer(calculateSummaryAction)
    .case(setActiveDateAction, () => ({ status: "NOT_STARTED" }))
    .case(updateSummaryEntryAction, (state, action) => {
        if (state.status === "FINISHED") {
            const index = findIndex<SummaryDay>((d) => d.date.getDate() === action.date.getDate())(state.data)
            if (index < 0) {
                return state
            }
            const updated = update(index, action)(state.data)
            return { ...state, data: updated }
        }
        return state
    })
    .build()

const generateDocumentReducer = createReducer(generatePdfReportAction, resetGeneratePdfReportAction).build()

export const workingTimeReducer = combineReducers({
    publicHolidays: publicHolidaysReducer,
    activeDate: activeDateReducer,
    absences: absencesReducer,
    monthSummary: summaryReducer,
    pdfReportResult: generateDocumentReducer,
})
