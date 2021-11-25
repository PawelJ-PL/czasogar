import { Input, InputProps } from "@chakra-ui/input"
import { Box, BoxProps, Stack } from "@chakra-ui/layout"
import React, { useState } from "react"
import { Time } from "../../types/Time"

const baseInputProps = {
    width: "3rem",
    borderWidth: "0",
}

type PartialInputProps = Omit<
    InputProps,
    "value" | "defaultValue" | "onChange" | "onBlur" | keyof typeof baseInputProps
>

type Props = {
    defaultValue?: Time
    onChange: (time: Time) => void
    inputProps?: PartialInputProps
    containerProps?: BoxProps
}

const TimePicker: React.FC<Props> = ({ inputProps, containerProps, defaultValue, onChange }) => {
    const defaults: Time = defaultValue ?? { hour: 0, minute: 0 }
    const defaultHour = defaults.hour < 0 || defaults.hour > 23 ? 0 : Math.trunc(defaults.hour)
    const defaultMinute = defaults.minute < 0 || defaults.minute > 59 ? 0 : Math.trunc(defaults.minute)

    const [hour, setHour] = useState<string>(defaultHour.toString(10))
    const [minute, setMinute] = useState<string>(defaultMinute.toString(10))
    const [lastValues, setLastValues] = useState<Time>({ hour: defaultHour, minute: defaultMinute })

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, fn: (n: string) => void) => {
        const asNumber = Math.trunc(Number(event.target.value))
        if (Number.isNaN(asNumber) || event.target.value.length > 2) {
            return
        }
        fn(event.target.value.replace(".", ""))
    }

    const onBlur = () => {
        const hourNumber = Number(hour)
        const minuteNumber = Number(minute)
        let h = hourNumber
        let m = minuteNumber

        if (h < 0 || h > 23) {
            h = defaultHour
            setHour(defaultHour.toString(10))
        }
        if (m < 0 || m > 59) {
            m = defaultMinute
            setMinute(defaultMinute.toString(10))
        }
        if (lastValues.hour !== h || lastValues.minute !== m) {
            onChange({ hour: h, minute: m })
            setLastValues({ hour: h, minute: m })
        }
    }

    return (
        <Box borderWidth="2px" borderColor="darkLiver" padding="2px" borderRadius="md" {...(containerProps ?? {})}>
            <Stack direction="row">
                <Input
                    size="sm"
                    {...(inputProps ?? {})}
                    {...baseInputProps}
                    value={hour}
                    onChange={(e) => onInputChange(e, setHour)}
                    onBlur={onBlur}
                />
                <Input
                    size="sm"
                    {...(inputProps ?? {})}
                    {...baseInputProps}
                    value={minute}
                    onChange={(e) => onInputChange(e, setMinute)}
                    onBlur={onBlur}
                />
            </Stack>
        </Box>
    )
}

export default TimePicker
