import { pdf, Document, Page, View, Font, StyleSheet } from "@react-pdf/renderer"
import React from "react"
import { WorkingTimeStatement } from "../../types/WorkingTimeStatement"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import Metric from "./Metric"
import DaysList from "./DaysList"
import HoursSummary from "./HoursSummary"

type Props = {
    input: WorkingTimeStatement
}

Font.register({
    family: "Morrison",
    fonts: [
        {
            src: "https://fontlibrary.org/assets/fonts/morrison/1e1a3a73d93a8835577ca88b61fc66a8/b4db25fa6cea642d69e7398dd2a46414/18Franklin18Regular.ttf",
            fontStyle: "normal",
            fontWeight: "normal",
        },
        {
            src: "https://fontlibrary.org/assets/fonts/morrison/1e1a3a73d93a8835577ca88b61fc66a8/b162751cd23f047b9105c56a845be167/18Franklin18SemiBold.ttf",
            fontStyle: "normal",
            fontWeight: "semibold",
        },
    ],
})

const styles = StyleSheet.create({
    page: {
        fontFamily: "Morrison",
        padding: "2cm",
    },
    reportView: {
        width: "100%",
        fontSize: "11",
    },
})

const MonthlyPdfReport: React.FC<Props> = ({ input }) => (
    <Document
        title={`Ewidencja czasu pracy dla ${input.firstName} ${input.lastName} za ${format(
            new Date(input.year, input.month - 1, 1),
            "LLLL y",
            { locale: pl }
        )} `}
        creator={`Czasogar (${window.location.href})`}
        producer={`Czasogar (${window.location.href})`}
    >
        <Page size="A4" orientation="portrait" style={styles.page}>
            <View style={styles.reportView}>
                <Metric data={input} />
                <DaysList records={input.records} />
                <HoursSummary workedMinutes={input.totalMinutes} />
            </View>
        </Page>
    </Document>
)

export const generateMonthlyReport: (input: WorkingTimeStatement) => Promise<Blob> = (input: WorkingTimeStatement) =>
    pdf(<MonthlyPdfReport input={input} />).toBlob()
