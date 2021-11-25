import { StyleSheet, Text, View } from "@react-pdf/renderer"
import React from "react"
import { WorkingTimeRecord } from "../../types/WorkingTimeStatement"
import { formatMinutesAsHours, formatTime } from "../../utils/reportFormatters"
import { dayFlex, hoursFlex, noteFlex, signatureFlex, workEndFlex, workStartFlex } from "./constants"

type Props = {
    record: WorkingTimeRecord
}

const styles = StyleSheet.create({
    view: {
        borderBottom: "2",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
    },
    value: {
        paddingVertical: "2",
    },
    dayValue: {
        flex: dayFlex,
        borderRight: "2",
    },
    workStartValue: {
        flex: workStartFlex,
        borderRight: "2",
    },
    workEndValue: {
        flex: workEndFlex,
        borderRight: "2",
    },
    hoursValue: {
        flex: hoursFlex,
        borderRight: "2",
    },
    noteValue: {
        flex: noteFlex,
        borderRight: "2",
    },
    signatureValue: {
        flex: signatureFlex,
    },
})

const DayRecord: React.FC<Props> = ({ record }) => {
    return (
        <View style={[styles.view]}>
            <Text style={[styles.dayValue, styles.value]}>{record.dayNumber}</Text>
            <Text style={[styles.workStartValue, styles.value]}>
                {record.workStart ? formatTime(record.workStart) : "---"}
            </Text>
            <Text style={[styles.workEndValue, styles.value]}>
                {record.workEnd ? formatTime(record.workEnd) : "---"}
            </Text>
            <Text style={[styles.hoursValue, styles.value]}>
                {record.minutes ? formatMinutesAsHours(record.minutes) : "---"}
            </Text>
            <Text style={[styles.noteValue, styles.value]}>{record.note}</Text>
            <View style={[styles.signatureValue, styles.value]}></View>
        </View>
    )
}

export default DayRecord
