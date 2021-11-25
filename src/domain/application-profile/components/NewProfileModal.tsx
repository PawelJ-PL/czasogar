import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Profile, ProfileSchema } from "../types/Profile"
import { Stack } from "@chakra-ui/layout"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import { Button } from "@chakra-ui/button"
import { AppState } from "../../../application/store"
import { Dispatch } from "redux"
import { addOrUpdateProfileAction } from "../store/Actions"
import { connect } from "react-redux"
import range from "ramda/src/range"

const DEFAULT_START_HOUR = 8
const DEFAULT_START_MINUTE = 30
const DEFAULT_END_HOUR = 16
const DEFAULT_END_MINUTE = 30

type Props = {
    isOpen: boolean
    onClose: () => void
    canClose: boolean
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const NewProfileModal: React.FC<Props> = ({ isOpen, onClose, canClose, saveProfile, saveProfileResult }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating },
        setValue,
    } = useForm<Profile>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            defaultStartTime: { hour: DEFAULT_START_HOUR, minute: DEFAULT_START_MINUTE },
            defaultEndTime: { hour: DEFAULT_END_HOUR, minute: DEFAULT_END_MINUTE },
        },
    })

    const onSubmit = (data: Profile) => {
        saveProfile(data)
    }

    const hourValues = range(0, 24)
    const minuteValues = range(0, 12).map((n) => n * 5)

    const onDateChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        field: "defaultStartTime.hour" | "defaultStartTime.minute" | "defaultEndTime.hour" | "defaultEndTime.minute"
    ) => {
        const newValue = Number.parseInt(event.target.value)
        setValue(field, newValue)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Nowy profil użytkownika</ModalHeader>
                {canClose && <ModalCloseButton />}
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} id="new-profile-form">
                        <Stack spacing="0.5rem">
                            <FormControl
                                id="profile-name"
                                isRequired={true}
                                isInvalid={errors.profileName !== undefined}
                            >
                                <FormLabel fontSize="sm">Nazwa profilu</FormLabel>
                                <Input {...register("profileName")} />
                                <FormErrorMessage>{errors.profileName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="first-name" isRequired={true} isInvalid={errors.firstName !== undefined}>
                                <FormLabel fontSize="sm">Imię</FormLabel>
                                <Input {...register("firstName")} />
                                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="last-name" isRequired={true} isInvalid={errors.lastName !== undefined}>
                                <FormLabel fontSize="sm">Nazwisko</FormLabel>
                                <Input {...register("lastName")} />
                                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="position" isRequired={true} isInvalid={errors.position !== undefined}>
                                <FormLabel fontSize="sm">Stanowisko</FormLabel>
                                <Input {...register("position")} />
                                <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
                            </FormControl>

                            <Stack>
                                <FormControl
                                    id="default-start-time"
                                    isRequired={true}
                                    isInvalid={errors.defaultStartTime !== undefined}
                                >
                                    <FormLabel fontSize="sm">Domyślna godzina rozpoczęcia pracy</FormLabel>
                                    <Stack direction="row">
                                        <Select
                                            defaultValue={DEFAULT_START_HOUR}
                                            onChange={(e) => onDateChange(e, "defaultStartTime.hour")}
                                        >
                                            {hourValues.map((h) => (
                                                <option key={h} value={h}>
                                                    {h}
                                                </option>
                                            ))}
                                        </Select>
                                        <Select
                                            defaultValue={DEFAULT_START_MINUTE}
                                            onChange={(e) => onDateChange(e, "defaultStartTime.minute")}
                                        >
                                            {minuteValues.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </Select>
                                        <FormErrorMessage>
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {(errors.defaultStartTime as any | undefined)?.message}
                                        </FormErrorMessage>
                                    </Stack>
                                    <FormErrorMessage>{errors.defaultStartTime?.hour?.message}</FormErrorMessage>
                                    <FormErrorMessage>{errors.defaultStartTime?.minute?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    id="default-end-time"
                                    isRequired={true}
                                    isInvalid={errors.defaultEndTime !== undefined}
                                >
                                    <FormLabel fontSize="sm">Domyślna godzina zakończenia pracy</FormLabel>
                                    <Stack direction="row">
                                        <Select
                                            defaultValue={DEFAULT_END_HOUR}
                                            onChange={(e) => onDateChange(e, "defaultEndTime.hour")}
                                        >
                                            {hourValues.map((h) => (
                                                <option key={h} value={h}>
                                                    {h}
                                                </option>
                                            ))}
                                        </Select>
                                        <Select
                                            defaultValue={DEFAULT_END_MINUTE}
                                            onChange={(e) => {
                                                onDateChange(e, "defaultEndTime.minute")
                                            }}
                                        >
                                            {minuteValues.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <FormErrorMessage>
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {(errors.defaultEndTime as any | undefined)?.message}
                                    </FormErrorMessage>
                                    <FormErrorMessage>{errors.defaultEndTime?.hour?.message}</FormErrorMessage>
                                    <FormErrorMessage>{errors.defaultEndTime?.minute?.message}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    {canClose && (
                        <Button onClick={onClose} marginRight="0.5rem">
                            Anuluj
                        </Button>
                    )}
                    <Button
                        type="submit"
                        form="new-profile-form"
                        loadingText="Stwórz"
                        isLoading={isValidating || saveProfileResult.status === "PENDING"}
                        colorScheme="blue"
                    >
                        Stwórz
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => ({
    saveProfileResult: state.profile.updateProfileResult,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveProfile: (profile: Profile) => dispatch(addOrUpdateProfileAction.started(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProfileModal)
