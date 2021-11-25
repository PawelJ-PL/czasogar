import { Box, Flex } from "@chakra-ui/layout"
import React from "react"
import Spinner from "react-spinkit"

type Props = {
    text: string
}

const FullPageLoader: React.FC<Props> = ({ text }) => {
    return (
        <Flex alignItems="center" direction="column" marginTop="30vh">
            <Box>
                <Spinner name="pacman" color="#584b53" />
            </Box>
            <Box>{text}</Box>
        </Flex>
    )
}

export default FullPageLoader
