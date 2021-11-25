import React from "react"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import { Checkbox } from "@chakra-ui/checkbox"
import { Td, Tr } from "@chakra-ui/table"
import { SummaryDay } from "../../../types/SummaryDay"
import TimePicker from "../../../../../application/components/common/TimePicker"
import { Dispatch } from "redux"
import { updateSummaryEntryAction } from "../../../store/Actions"
import { connect } from "react-redux"
import { Profile } from "../../../../application-profile/types/Profile"
import { Time } from "../../../../../application/types/Time"
import { AppState } from "../../../../../application/store"
import { Box, Flex, Text } from "@chakra-ui/layout"
import { InvalidWorkingHoursRange } from "../../../types/Errors"
import NoteInput from "./NoteInput"

type Props = {
    summaryDay: SummaryDay
    profile: Profile
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const FullSizeSummaryEntry: React.FC<Props> = ({ summaryDay, updateEntry, profile, collectDataResult }) => {
    const onTimeChange = (newTime: Time, target: "start" | "end") => {
        if (!summaryDay.workingHours) {
            return
        }
        const start = target === "start" ? newTime : summaryDay.workingHours.start
        const end = target === "end" ? newTime : summaryDay.workingHours.end

        const updated: SummaryDay = { ...summaryDay, workingHours: { start, end } }
        updateEntry(updated)
    }

    const isInvalidTimeRange =
        collectDataResult.status === "FAILED" &&
        collectDataResult.error instanceof InvalidWorkingHoursRange &&
        collectDataResult.error.dayNumbers.includes(summaryDay.date.getDate())

    return (
        <>
            <Tr>
                <Td>
                    <Checkbox
                        size="lg"
                        defaultChecked={summaryDay.workingHours !== null}
                        onChange={(e) => {
                            const workingHours = e.target.checked
                                ? { start: profile.defaultStartTime, end: profile.defaultEndTime }
                                : null
                            updateEntry({ ...summaryDay, workingHours })
                        }}
                    />
                </Td>
                <Td>
                    {format(summaryDay.date, "P", { locale: pl })} ({summaryDay.dayName})
                </Td>
                <Td>
                    <NoteInput
                        defaultValue={summaryDay.note}
                        onChange={(note) => updateEntry({ ...summaryDay, note })}
                        inputProps={{ minWidth: "10rem" }}
                    />
                </Td>
                <Td>
                    <Box>
                        <Flex>
                            {summaryDay.workingHours ? (
                                <TimePicker
                                    containerProps={{ borderWidth: "1px" }}
                                    defaultValue={summaryDay.workingHours.start}
                                    onChange={(t) => onTimeChange(t, "start")}
                                />
                            ) : null}
                            {summaryDay.workingHours ? (
                                <TimePicker
                                    containerProps={{
                                        borderWidth: "1px",
                                        marginLeft: "0.2rem",
                                    }}
                                    defaultValue={summaryDay.workingHours.end}
                                    onChange={(t) => onTimeChange(t, "end")}
                                />
                            ) : null}
                        </Flex>
                        {isInvalidTimeRange && (
                            <Text as="i" color="red.400" fontSize="xs">
                                Zakres godzin jest nieprawidłowy
                            </Text>
                        )}
                    </Box>
                </Td>
            </Tr>
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    collectDataResult: state.workingHours.pdfReportResult,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateEntry: (newEntry: SummaryDay) => dispatch(updateSummaryEntryAction(newEntry)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FullSizeSummaryEntry)
