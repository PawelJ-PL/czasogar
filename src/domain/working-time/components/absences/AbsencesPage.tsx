import { Button } from "@chakra-ui/button"
import { Flex } from "@chakra-ui/layout"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Card from "../../../../application/components/common/Card"
import UnexpectedErrorMessage from "../../../../application/components/common/UnexpectedErrorMessage"
import { AppState } from "../../../../application/store"
import { Profile } from "../../../application-profile/types/Profile"
import { ActiveDateParams, calculateSummaryAction } from "../../store/Actions"
import { PublicHoliday } from "../../types/PublicHoliday"
import ActiveDateSelect from "./ActiveDateSelect"
import CustomAbsencesPanel from "./custom-absences/CustomAbsencesPanel"
import PublicHolidaysPanel from "./public-holidays/PublicHolidaysPanel"

type Props = {
    publicHolidays: PublicHoliday[] | null
    profile: Profile
    activeDate: ActiveDateParams
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const AbsencesPage: React.FC<Props> = ({ publicHolidays, profile, activeDate, calculateSummary, summaryResult }) => (
    <Flex alignItems="center" direction="column">
        <ActiveDateSelect activeDate={activeDate} />
        {summaryResult.status === "FAILED" && (
            <UnexpectedErrorMessage error={summaryResult.error} alertProps={{ maxWidth: "3xl", marginTop: "0.5rem" }} />
        )}
        <Card header="Dni wolne" containerProps={{ marginTop: "0.5rem" }}>
            <PublicHolidaysPanel availablePublicHolidays={publicHolidays} />
        </Card>
        <Card header="Nieobecności" containerProps={{ marginTop: "1rem" }}>
            <CustomAbsencesPanel activeDate={activeDate} />
        </Card>
        <Button
            marginTop="1rem"
            colorScheme="blue"
            size="lg"
            onClick={() => calculateSummary(profile)}
            loadingText="Generuję"
            isLoading={summaryResult.status === "PENDING"}
        >
            Wygeneruj
        </Button>
    </Flex>
)

const mapStateToProps = (state: AppState) => ({
    summaryResult: state.workingHours.monthSummary,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    calculateSummary: (profile: Profile) => dispatch(calculateSummaryAction.started({ profile })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AbsencesPage)
