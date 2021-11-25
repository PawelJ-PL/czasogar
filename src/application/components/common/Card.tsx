import { Box, BoxProps, Divider, Heading } from "@chakra-ui/layout"
import React from "react"

type Props = {
    header: string
    containerProps?: BoxProps
}

const Card: React.FC<Props> = ({ children, header, containerProps }) => (
    <Box {...(containerProps ?? {})}>
        <Box
            shadow="lg"
            rounded="lg"
            paddingX="2rem"
            paddingY="1.5rem"
            backgroundColor="periwinkleCrayola"
            width={["2xs", "md", "lg", "3xl"]}
        >
            <Box>
                <Heading as="h3" size="lg">
                    {header}
                </Heading>
                <Divider borderColor="darkLiver" />
            </Box>
            <Box marginTop="0.2rem">{children}</Box>
        </Box>
    </Box>
)

export default Card
