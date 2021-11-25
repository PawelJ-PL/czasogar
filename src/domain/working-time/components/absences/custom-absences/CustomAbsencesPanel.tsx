import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box } from "@chakra-ui/layout"
import React from "react"
import { GoDiffAdded } from "react-icons/go"
import { connect } from "react-redux"
import { AppState } from "../../../../../application/store"
import { ActiveDateParams } from "../../../store/Actions"
import AddAbsenceModal from "./AddAbsenceModal"
import CustomAbsenceEntry from "./CustomAbsenceEntry"
import sortBy from "ramda/src/sortBy"
import { Absence } from "../../../types/Absence"

type Props = {
    activeDate: ActiveDateParams
} & ReturnType<typeof mapStateToProps>

const CustomAbsencesPanel: React.FC<Props> = ({ activeDate, customAbsences }) => {
    const addAbsenceModal = useDisclosure()

    const sortAbsenceByDate = sortBy<Absence>((a) => (a.date instanceof Date ? a.date.getTime() : a.date[0].getTime()))

    return (
        <Box marginTop="1rem">
            <AddAbsenceModal
                isOpen={addAbsenceModal.isOpen}
                onClose={addAbsenceModal.onClose}
                activeDate={activeDate}
            />
            <Button size="sm" colorScheme="blue" leftIcon={<GoDiffAdded />} onClick={addAbsenceModal.onOpen}>
                Dodaj nieobencość
            </Button>
            <Box marginTop="1rem">
                {sortAbsenceByDate(customAbsences).map((a) => (
                    <CustomAbsenceEntry key={a.id} absence={a} />
                ))}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => ({
    customAbsences: state.workingHours.absences.filter((a) => a.type === "Custom"),
})

export default connect(mapStateToProps)(CustomAbsencesPanel)
