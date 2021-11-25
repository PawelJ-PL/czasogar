import { StyleSheet, Text, View } from "@react-pdf/renderer"
import React from "react"
import { WorkingTimeStatement } from "../../types/WorkingTimeStatement"

type Props = {
    data: WorkingTimeStatement
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        borderTop: "2",
        borderLeft: "2",
        borderRight: "2"
    },
    leftPart: {
        flex: "5",
        borderRight: "2",
    },
    rightPart: {
        flex: 14,
    },
    section: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "2",
    },
    sectionHeader: {
        backgroundColor: "#a0a0a0",
        borderRight: "2",
        textAlign: "center",
        paddingBottom: "3",
        paddingTop: "3",
        fontWeight: "semibold",
    },
    sectionValue: {
        textAlign: "center",
        paddingBottom: "3",
        paddingTop: "3",
    },
    leftSectionHeader: {
        flex: 2,
    },
    leftSectionValue: {
        flex: 3,
    },
    rightSectionHeader: {
        flex: 5,
    },
    rightSectionValue: {
        flex: 9,
    },
})

const Metric: React.FC<Props> = ({ data }) => (
    <View style={styles.view}>
        <View style={styles.leftPart}>
            <View style={styles.section}>
                <Text style={[styles.sectionHeader, styles.leftSectionHeader]}>Rok</Text>
                <Text style={[styles.sectionValue, styles.leftSectionValue]}>{data.year}</Text>
            </View>
            <View style={styles.section}>
                <Text style={[styles.sectionHeader, styles.leftSectionHeader]}>Miesiąc</Text>
                <Text style={[styles.sectionValue, styles.leftSectionValue]}>{data.month}</Text>
            </View>
        </View>
        <View style={styles.rightPart}>
            <View style={styles.section}>
                <Text style={[styles.sectionHeader, styles.rightSectionHeader]}>Imię i nazwisko</Text>
                <Text style={[styles.sectionValue, styles.rightSectionValue]}>
                    {data.firstName} {data.lastName}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={[styles.sectionHeader, styles.rightSectionHeader]}>Stanowisko</Text>
                <Text style={[styles.sectionValue, styles.rightSectionValue]}>{data.position}</Text>
            </View>
        </View>
    </View>
)

export default Metric
