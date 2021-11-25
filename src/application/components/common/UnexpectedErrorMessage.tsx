import React from "react"
import AlertBox from "./AlertBox"
import { AlertProps } from "@chakra-ui/alert"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion"
import { Box, Heading } from "@chakra-ui/layout"
import { ZodError } from "zod"

type Props = {
    error: Error
    onClose?: () => void
    alertProps?: AlertProps
}

const UnexpectedErrorMessage: React.FC<Props> = ({ error, alertProps, onClose }) => {
    let detailsContent: JSX.Element

    if (error instanceof ZodError) {
        detailsContent = (
            <Box>
                <Box>
                    <b>Schema Error</b>
                </Box>
                <Box>{JSON.stringify(error.issues)}</Box>
            </Box>
        )
    } else {
        detailsContent = (
            <Box>
                <Box>
                    <b>Generic Error</b>
                </Box>
                <Box>{error.message}</Box>
            </Box>
        )
    }

    const details =
        detailsContent === undefined ? undefined : (
            <Accordion allowToggle={true}>
                <AccordionItem isFocusable={false}>
                    <AccordionButton>
                        <Heading as="h6" size="xs">
                            Szczegóły
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>{detailsContent}</AccordionPanel>
                </AccordionItem>
            </Accordion>
        )

    return (
        <AlertBox
            alertProps={{ ...(alertProps ?? {}), flexDirection: "column", alignItems: "flex-start" }}
            descriptionProps={{ width: "100%" }}
            onClose={onClose}
            title="Nieoczekowany błąd"
            description={details}
            status="error"
            icon={false}
        />
    )
}

export default UnexpectedErrorMessage
