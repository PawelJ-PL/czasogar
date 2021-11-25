import { Box, Text, Wrap } from "@chakra-ui/layout"
import React from "react"
import { PublicHoliday } from "../../../types/PublicHoliday"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import { Checkbox } from "@chakra-ui/checkbox"
import { AppState } from "../../../../../application/store"
import { Dispatch } from "redux"
import { addAbsenceAction, removeAbsenceAction } from "../../../store/Actions"
import { connect } from "react-redux"

type Props = {
    entry: PublicHoliday
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const PublicHolidayEntry: React.FC<Props> = ({ entry, publicHolidaysAbsences, addAbsence, deleteAbsence }) => {
    return (
        <Wrap marginTop="1rem">
            <Checkbox
                isChecked={publicHolidaysAbsences.some((a) => a.id === entry.id)}
                onChange={(e) => (e.target.checked ? addAbsence(entry) : deleteAbsence(entry.id))}
            />
            <Box>{format(entry.date, "PP", { locale: pl })}</Box>
            <Box>
                <Text as="b">{entry.localName}</Text>
            </Box>
        </Wrap>
    )
}

const mapStateToProps = (state: AppState) => ({
    publicHolidaysAbsences: state.workingHours.absences.filter((a) => a.type === "PublicHoliday"),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addAbsence: (holiday: PublicHoliday) =>
        dispatch(
            addAbsenceAction({ id: holiday.id, date: holiday.date, note: holiday.localName, type: "PublicHoliday" })
        ),
    deleteAbsence: (id: string) => dispatch(removeAbsenceAction(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicHolidayEntry)
