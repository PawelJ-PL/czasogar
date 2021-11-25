import { Table, Tbody } from "@chakra-ui/table"
import React from "react"
import { Profile } from "../../../../application-profile/types/Profile"
import { SummaryDay } from "../../../types/SummaryDay"
import FullSizeSummaryEntry from "./FullSizeSummaryEntry"

type Props = { summary: SummaryDay[]; profile: Profile }

const StandardSummaryTable: React.FC<Props> = ({ summary, profile }) => (
    <Table colorScheme="blue" size="sm">
        <Tbody>
            {summary.map((d) => (
                <FullSizeSummaryEntry key={d.date.getDate()} summaryDay={d} profile={profile} />
            ))}
        </Tbody>
    </Table>
)

export default StandardSummaryTable
