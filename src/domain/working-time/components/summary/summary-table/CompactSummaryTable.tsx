import { Box } from "@chakra-ui/layout"
import React from "react"
import { Profile } from "../../../../application-profile/types/Profile"
import { SummaryDay } from "../../../types/SummaryDay"
import CompactSummaryEntry from "./CompactSummaryEntry"

type Props = {
    summary: SummaryDay[]
    profile: Profile
}

const CompactSummaryTable: React.FC<Props> = ({ summary, profile }) => (
    <Box>
        {summary.map((d) => (
            <CompactSummaryEntry key={d.date.getDate()} summaryDay={d} profile={profile} />
        ))}
    </Box>
)

export default CompactSummaryTable
