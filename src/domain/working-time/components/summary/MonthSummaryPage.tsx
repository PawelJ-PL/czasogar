import { Button } from "@chakra-ui/button"
import { Box, Flex } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FullPageLoader from "../../../../application/components/common/FullPageLoader"
import UnexpectedErrorMessage from "../../../../application/components/common/UnexpectedErrorMessage"
import { AppState } from "../../../../application/store"
import { Profile } from "../../../application-profile/types/Profile"
import { ActiveDateParams, generatePdfReportAction, resetGeneratePdfReportAction } from "../../store/Actions"
import { SummaryDay } from "../../types/SummaryDay"
import ActiveDateSelect from "../absences/ActiveDateSelect"
import CompactSummaryTable from "./summary-table/CompactSummaryTable"
import StandardSummaryTable from "./summary-table/FullSizeSummaryTable"
import FileSaver from "file-saver"

type Props = {
    summary: SummaryDay[]
    activeDate: ActiveDateParams
    profile: Profile
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const MonthSummaryPage: React.FC<Props> = ({
    summary,
    activeDate,
    profile,
    generateReport,
    generateReportResult,
    resetReportStatus,
}) => {
    const fullSize = useBreakpointValue({ base: false, md: true })

    useEffect(() => {
        if (generateReportResult.status === "FINISHED") {
            const year = generateReportResult.params.activeDate.year
            const month = generateReportResult.params.activeDate.month
            const lastName = generateReportResult.params.profile.lastName
            const firstName = generateReportResult.params.profile.firstName
            const fileName = `ewidencja_czasu_pracy_${year}_${month}_${lastName}_${firstName}.pdf`
            const blob = generateReportResult.data
            resetReportStatus()
            FileSaver.saveAs(blob, fileName)
        }
    })

    if (generateReportResult.status === "PENDING") {
        return <FullPageLoader text="Generowanie dokumentu" />
    } else {
        return (
            <Flex alignItems="center" direction="column">
                <ActiveDateSelect activeDate={activeDate} />
                {generateReportResult.status === "FAILED" && (
                    <UnexpectedErrorMessage
                        error={generateReportResult.error}
                        alertProps={{ maxWidth: "3xl", marginTop: "0.5rem" }}
                    />
                )}
                <Box marginTop="0.5rem">
                    {fullSize ? (
                        <StandardSummaryTable summary={summary} profile={profile} />
                    ) : (
                        <CompactSummaryTable summary={summary} profile={profile} />
                    )}
                </Box>
                <Button
                    marginTop="0.5rem"
                    colorScheme="blue"
                    size="lg"
                    onClick={() => generateReport(summary, profile, activeDate)}
                >
                    Przygotuj wydruk
                </Button>
            </Flex>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    generateReportResult: state.workingHours.pdfReportResult,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    generateReport: (summary: SummaryDay[], profile: Profile, activeDate: ActiveDateParams) =>
        dispatch(generatePdfReportAction.started({ summary, profile, activeDate })),
    resetReportStatus: () => dispatch(resetGeneratePdfReportAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MonthSummaryPage)
