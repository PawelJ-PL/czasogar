import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppState } from "../../../../application/store"
import { Profile } from "../../../application-profile/types/Profile"
import { fetchPublicHolidaysAction, setActiveDateAction } from "../../store/Actions"
import FullPageLoader from "../../../../application/components/common/FullPageLoader"
import AbsencesPage from "./AbsencesPage"
import { Box } from "@chakra-ui/layout"
import UnexpectedErrorMessage from "../../../../application/components/common/UnexpectedErrorMessage"
import MonthSummaryPage from "../summary/MonthSummaryPage"

type Props = {
    profile: Profile
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const AbsencesContainer: React.FC<Props> = ({
    profile,
    activeDate,
    setActiveDate,
    fetchPublicHolidays,
    publicHolidaysResult,
    monthSummaryResult,
}) => {
    useEffect(() => {
        if (!activeDate) {
            setActiveDate(new Date())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (activeDate) {
            fetchPublicHolidays(activeDate.month, activeDate.year)
        }
    }, [fetchPublicHolidays, activeDate])

    if (monthSummaryResult.status === "FINISHED" && activeDate) {
        return <MonthSummaryPage summary={monthSummaryResult.data} activeDate={activeDate} profile={profile} />
    }
    if (publicHolidaysResult.status === "FINISHED") {
        return (
            <AbsencesPage
                publicHolidays={publicHolidaysResult.data}
                profile={profile}
                activeDate={publicHolidaysResult.params}
            />
        )
    } else if (publicHolidaysResult.status === "FAILED") {
        return (
            <Box>
                <UnexpectedErrorMessage error={publicHolidaysResult.error} alertProps={{ marginBottom: "0.5rem" }} />
                <AbsencesPage publicHolidays={null} profile={profile} activeDate={publicHolidaysResult.params} />
            </Box>
        )
    }
    return <FullPageLoader text="Wczytywanie nieobecności" />
}

const mapStateToProps = (state: AppState) => ({
    activeDate: state.workingHours.activeDate,
    publicHolidaysResult: state.workingHours.publicHolidays,
    monthSummaryResult: state.workingHours.monthSummary,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setActiveDate: (date: Date) =>
        dispatch(setActiveDateAction({ month: date.getMonth() + 1, year: date.getFullYear() })),
    fetchPublicHolidays: (month: number, year: number) => dispatch(fetchPublicHolidaysAction.started({ month, year })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AbsencesContainer)
