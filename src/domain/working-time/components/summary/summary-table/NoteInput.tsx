import { Input, InputProps } from "@chakra-ui/input"
import React, { useState } from "react"

type PartialInputProps = Omit<InputProps, "value" | "defaultValue" | "onChange" | "onBlur">

type Props = {
    defaultValue?: string
    onChange: (note: string) => void
    inputProps?: PartialInputProps
}

const NoteInput: React.FC<Props> = ({ defaultValue, onChange, inputProps }) => {
    const [value, setValue] = useState<string>(defaultValue ?? "")
    const [lastUpdated, setLastUpdated] = useState<string>(defaultValue ?? "")

    const onBlur = () => {
        if (lastUpdated === value) {
            return
        }
        onChange(value)
        setLastUpdated(value)
    }

    return (
        <Input
            borderColor="darkLiver"
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            value={value}
            {...(inputProps ?? {})}
        />
    )
}

export default NoteInput
