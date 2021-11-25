import { Box, Text, Wrap } from "@chakra-ui/layout"
import React from "react"
import { Absence, formatDateOrRange } from "../../../types/Absence"
import { IconButton } from "@chakra-ui/button"
import { IoTrashOutline } from "react-icons/io5"
import { Dispatch } from "redux"
import { removeAbsenceAction } from "../../../store/Actions"
import { connect } from "react-redux"

type Props = {
    absence: Absence
} & ReturnType<typeof mapDispatchToProps>

const CustomAbsenceEntry: React.FC<Props> = ({ absence, deleteAbsence }) => {
    return (
        <Wrap>
            <IconButton
                aria-label="Skasuj"
                icon={<IoTrashOutline />}
                variant="ghost"
                size="xs"
                colorScheme="red"
                onClick={() => deleteAbsence(absence.id)}
            />
            <Box>{formatDateOrRange(absence.date)}</Box>
            <Box wordBreak="break-word">
                <Text as="b">{absence.note}</Text>
            </Box>
        </Wrap>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteAbsence: (id: string) => dispatch(removeAbsenceAction(id)),
})

export default connect(null, mapDispatchToProps)(CustomAbsenceEntry)
