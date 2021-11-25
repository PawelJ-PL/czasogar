import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/select"
import React from "react"
import { PublicHolidaysParams, setActiveDateAction } from "../../store/Actions"
import { pl } from "date-fns/locale"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { IconButton } from "@chakra-ui/button"
import { BsCalendarEvent } from "react-icons/bs"
import { Tooltip } from "@chakra-ui/tooltip"
import range from "ramda/src/range"

type Props = {
    activeDate: PublicHolidaysParams
} & ReturnType<typeof mapDispatchToProps>

const stepValues = (count: number, baseValue: number, multiplier: number) =>
    range(0, count).map((v) => baseValue + (v + 1) * multiplier)

const ActiveDateSelect: React.FC<Props> = ({ activeDate, updateActiveDate }) => {
    const months = range(0, 12).map((m) => m + 1)

    const prevYears = stepValues(3, activeDate.year, -1).reverse()
    const nextYears = stepValues(3, activeDate.year, 1)
    const years = [...prevYears, activeDate.year].concat(nextYears)

    return (
        <Flex direction="column" alignItems="center">
            <Heading as="h5" size="sm">
                Zestawienie za miesiąc
            </Heading>
            <Flex>
                <Box marginX="0.2rem">
                    <Select
                        defaultValue={activeDate.month}
                        onChange={(e) => updateActiveDate(Number.parseInt(e.target.value, 10), activeDate.year)}
                    >
                        {months.map((m) => (
                            <option key={m} value={m}>
                                {pl.localize?.month(m - 1)}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box marginX="0.2rem">
                    <Select
                        defaultValue={activeDate.year}
                        onChange={(e) => updateActiveDate(activeDate.month, Number.parseInt(e.target.value, 10))}
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <Tooltip label="Przejdź do bieżącego miesiąca">
                        <IconButton
                            aria-label="Przejdź do bieżącego miesiąca"
                            variant="outline"
                            icon={<BsCalendarEvent />}
                            onClick={() => {
                                const now = new Date()
                                updateActiveDate(now.getMonth() + 1, now.getFullYear())
                            }}
                        />
                    </Tooltip>
                </Box>
            </Flex>
        </Flex>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateActiveDate: (month: number, year: number) => dispatch(setActiveDateAction({ month, year })),
})

export default connect(null, mapDispatchToProps)(ActiveDateSelect)
