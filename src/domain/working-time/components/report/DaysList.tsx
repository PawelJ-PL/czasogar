import { StyleSheet, Text, View } from "@react-pdf/renderer"
import React from "react"
import { WorkingTimeRecord } from "../../types/WorkingTimeStatement"
import sortBy from "ramda/src/sortBy"
import DayRecord from "./DayRecord"
import { dayFlex, hoursFlex, noteFlex, signatureFlex, workEndFlex, workStartFlex } from "./constants"

type Props = {
    records: WorkingTimeRecord[]
}

const styles = StyleSheet.create({
    view: {
        borderLeft: "2",
        borderRight: "2",
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "2",
        fontWeight: "semibold",
    },
    header: {
        backgroundColor: "#a0a0a0",
        textAlign: "center",
        paddingTop: "3",
        paddingBottom: "3",
    },
    dayNumberHeader: {
        flex: dayFlex,
        borderRight: "2",
    },
    workStartHeader: {
        flex: workStartFlex,
        borderRight: "2",
    },
    workEndHeader: {
        flex: workEndFlex,
        borderRight: "2",
    },
    hoursHeader: {
        flex: hoursFlex,
        borderRight: "2",
    },
    noteHeader: {
        flex: noteFlex,
        borderRight: "2",
    },
    signatureHeader: {
        flex: signatureFlex,
    },
})

const DaysList: React.FC<Props> = ({ records }) => (
    <View style={styles.view}>
        <View style={styles.headerView}>
            <View style={[styles.header, styles.dayNumberHeader]}>
                <Text>Dzień</Text>
            </View>
            <View style={[styles.header, styles.workStartHeader]}>
                <Text>Rozpoczęcie pracy</Text>
            </View>
            <View style={[styles.header, styles.workEndHeader]}>
                <Text>Zakończenie pracy</Text>
            </View>
            <View style={[styles.header, styles.hoursHeader]}>
                <Text>Liczba godzin</Text>
            </View>
            <View style={[styles.header, styles.noteHeader]}>
                <Text>Komentarz</Text>
            </View>
            <View style={[styles.header, styles.signatureHeader]}>
                <Text>Podpis pracownika</Text>
            </View>
        </View>
        <View>
            {sortBy<WorkingTimeRecord>((d) => d.dayNumber, records).map((r) => (
                <DayRecord key={r.dayNumber} record={r} />
            ))}
        </View>
    </View>
)

export default DaysList
