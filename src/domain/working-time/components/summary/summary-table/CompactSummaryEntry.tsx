import { Box, Stack, Text } from "@chakra-ui/layout"
import React from "react"
import { SummaryDay } from "../../../types/SummaryDay"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import { Checkbox } from "@chakra-ui/checkbox"
import TimePicker from "../../../../../application/components/common/TimePicker"
import { connect } from "react-redux"
import { AppState } from "../../../../../application/store"
import { Dispatch } from "redux"
import { updateSummaryEntryAction } from "../../../store/Actions"
import { Profile } from "../../../../application-profile/types/Profile"
import { Time } from "../../../../../application/types/Time"
import { InvalidWorkingHoursRange } from "../../../types/Errors"
import NoteInput from "./NoteInput"

type Props = {
    summaryDay: SummaryDay
    profile: Profile
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const CompactSummaryEntry: React.FC<Props> = ({ summaryDay, collectDataResult, updateEntry, profile }) => {
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
        <Box border="solid" borderRadius="md" marginY="1.5em" padding="0 1em 1em">
            <Box transform="translatey(-50%)" width="max-content" background="platinum" paddingX="0.15em">
                {format(summaryDay.date, "P", { locale: pl })} ({summaryDay.dayName})
            </Box>
            <Stack>
                <Box>
                    <Stack direction="row">
                        <Checkbox
                            defaultChecked={summaryDay.workingHours !== null}
                            onChange={(e) => {
                                const workingHours = e.target.checked
                                    ? { start: profile.defaultStartTime, end: profile.defaultEndTime }
                                    : null
                                updateEntry({ ...summaryDay, workingHours })
                            }}
                        />
                        {summaryDay.workingHours ? (
                            <TimePicker
                                containerProps={{ border: "1px" }}
                                defaultValue={summaryDay.workingHours.start}
                                onChange={(t) => onTimeChange(t, "start")}
                            />
                        ) : null}
                        {summaryDay.workingHours ? (
                            <TimePicker
                                containerProps={{ border: "1px" }}
                                defaultValue={summaryDay.workingHours.end}
                                onChange={(t) => onTimeChange(t, "end")}
                            />
                        ) : null}
                    </Stack>
                    {isInvalidTimeRange && (
                        <Text as="i" color="red.400" fontSize="xs">
                            Zakres godzin jest nieprawidłowy
                        </Text>
                    )}
                </Box>
                <NoteInput defaultValue={summaryDay.note} onChange={(note) => updateEntry({ ...summaryDay, note })} />
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => ({
    collectDataResult: state.workingHours.pdfReportResult,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateEntry: (newEntry: SummaryDay) => dispatch(updateSummaryEntryAction(newEntry)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompactSummaryEntry)
