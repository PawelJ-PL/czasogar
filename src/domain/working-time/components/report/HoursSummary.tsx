import { StyleSheet, Text, View } from "@react-pdf/renderer"
import React from "react"
import { formatMinutesAsHours } from "../../utils/reportFormatters"
import { dayFlex, hoursFlex, noteFlex, signatureFlex, workEndFlex, workStartFlex } from "./constants"

type Props = {
    workedMinutes: number
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
    },
    header: {
        flex: dayFlex + workStartFlex + workEndFlex,
        fontWeight: "semibold",
        backgroundColor: "#a0a0a0",
        borderRight: 2,
        borderLeft: 2,
        borderBottom: 2,
        paddingVertical: 2,
        paddingRight: 1,
    },
    value: {
        flex: hoursFlex,
        borderBottom: 2,
        borderRight: 2,
        paddingVertical: 2,
    },
    emptyRight: {
        flex: noteFlex + signatureFlex,
    },
})

const HoursSummary: React.FC<Props> = ({ workedMinutes }) => (
    <View style={styles.view}>
        <View style={styles.header}>
            <Text>Razem</Text>
        </View>
        <View style={styles.value}>
            <Text>{formatMinutesAsHours(workedMinutes)}</Text>
        </View>
        <View style={styles.emptyRight}></View>
    </View>
)

export default HoursSummary
