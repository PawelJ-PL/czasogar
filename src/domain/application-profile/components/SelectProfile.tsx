import { Box, Flex, IconButton, Select, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Profile } from "../types/Profile"
import { FaUserPlus } from "react-icons/fa"
import { FaUserMinus } from "react-icons/fa"
import NewProfileModal from "./NewProfileModal"
import { Dispatch } from "redux"
import { deleteProfileAction, setDefaultProfileAction } from "../store/Actions"
import { connect } from "react-redux"
type Props = {
    profiles: Record<string, Profile>
    defaultProfile: string
} & ReturnType<typeof mapDispatchToProps>

const SelectProfile: React.FC<Props> = ({ profiles, defaultProfile, deleteProfile, setDefaultProfile }) => {
    const newProfileModalDisclosure = useDisclosure()

    return (
        <Flex
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            marginBottom="0.2rem"
            marginTop="0.1rem"
        >
            <NewProfileModal
                isOpen={newProfileModalDisclosure.isOpen}
                canClose={true}
                onClose={newProfileModalDisclosure.onClose}
            />
            <Box>
                <Select defaultValue={defaultProfile} size="sm" onChange={(e) => setDefaultProfile(e.target.value)}>
                    {Object.values(profiles).map((p) => (
                        <option key={p.profileName} value={p.profileName}>
                            {p.profileName}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box marginX="0.2rem">
                <IconButton
                    aria-label="Dodaj profil"
                    icon={<FaUserPlus />}
                    variant="ghost"
                    onClick={newProfileModalDisclosure.onOpen}
                />
            </Box>
            <Box>
                <IconButton
                    aria-label="Skasuj profil"
                    icon={<FaUserMinus />}
                    variant="ghost"
                    onClick={() => deleteProfile(defaultProfile)}
                />
            </Box>
        </Flex>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteProfile: (profileName: string) => dispatch(deleteProfileAction.started(profileName)),
    setDefaultProfile: (profileName: string) => dispatch(setDefaultProfileAction.started(profileName)),
})

export default connect(null, mapDispatchToProps)(SelectProfile)
