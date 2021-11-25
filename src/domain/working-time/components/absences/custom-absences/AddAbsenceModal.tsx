import React, { useState } from "react"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal"
import getDaysInMonth from "date-fns/getDaysInMonth"
import { ActiveDateParams, addAbsenceAction } from "../../../store/Actions"
import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import DatePicker from "react-datepicker"
import { pl } from "date-fns/locale"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { v4 as uuidv4 } from "uuid"
import { Dispatch } from "redux"
import { Absence, DateOrRange } from "../../../types/Absence"
import { connect } from "react-redux"

type Props = {
    isOpen: boolean
    onClose: () => void
    activeDate: ActiveDateParams
} & ReturnType<typeof mapDispatchToProps>

const AddAbsenceModal: React.FC<Props> = ({ isOpen, onClose, activeDate, addAbsence }) => {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [note, setNote] = useState<string>("")

    const daysInMonth = getDaysInMonth(new Date(activeDate.year, activeDate.month - 1))

    const minDate = new Date(activeDate.year, activeDate.month - 1, 1)
    const maxDate = new Date(activeDate.year, activeDate.month - 1, daysInMonth)

    const handleClose = () => {
        setStartDate(null)
        setEndDate(null)
        setNote("")
        onClose()
    }

    const onDateUpdate = (update: Date | [Date | null, Date | null] | null) => {
        if (update === null) {
            return
        } else if (update instanceof Date) {
            setStartDate(update)
            setEndDate(null)
        } else {
            const [start, end] = update
            setStartDate(start ?? null)
            setEndDate(end ?? null)
        }
    }

    const confirm = () => {
        if (startDate && endDate) {
            const date: DateOrRange = endDate.getDate() > startDate.getDate() ? [startDate, endDate] : startDate
            const id = uuidv4()
            const maybeNote = note.trim().length > 0 ? note.trim() : undefined
            const absence: Absence = { id, date, note: maybeNote, type: "Custom" }
            addAbsence(absence)
            handleClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Dodaj nieobecność</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DatePicker
                        onChange={onDateUpdate}
                        locale={pl}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectsRange={true}
                        inline={true}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <FormControl id="note">
                        <FormLabel fontSize="sm">Notatka</FormLabel>
                        <Input value={note} onChange={(e) => setNote(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={handleClose} marginRight="0.5rem">
                        Anuluj
                    </Button>

                    <Button colorScheme="blue" disabled={!startDate || !endDate} onClick={confirm}>
                        Dodaj
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addAbsence: (absence: Absence) => dispatch(addAbsenceAction(absence)),
})

export default connect(null, mapDispatchToProps)(AddAbsenceModal)
