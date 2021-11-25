import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import AlertBox from "../../../../../application/components/common/AlertBox"
import { setAbsencesAction } from "../../../store/Actions"
import { Absence } from "../../../types/Absence"
import { PublicHoliday } from "../../../types/PublicHoliday"
import PublicHolidayEntry from "./PublicHolidayEntry"

type Props = {
    availablePublicHolidays: PublicHoliday[] | null
} & ReturnType<typeof mapDispatchToProps>

const PublicHolidaysPanel: React.FC<Props> = ({ availablePublicHolidays, setAbsences }) => {
    useEffect(() => {
        const absences: Absence[] = (availablePublicHolidays ?? []).map((h) => ({
            id: h.id,
            date: h.date,
            note: h.localName,
            type: "PublicHoliday",
        }))
        setAbsences(absences)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            {availablePublicHolidays === null && (
                <AlertBox
                    icon={true}
                    title="Nie udało się pobrać informacji o dniach wolnych. Dodaj te informacje ręcznie lub spróbuj odświeżyć stronę."
                    status="warning"
                />
            )}
            {(availablePublicHolidays ?? []).map((h) => (
                <PublicHolidayEntry key={h.id} entry={h} />
            ))}
        </Box>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAbsences: (absences: Absence[]) => dispatch(setAbsencesAction(absences)),
})

export default connect(null, mapDispatchToProps)(PublicHolidaysPanel)
