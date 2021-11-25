import Icon from "@chakra-ui/icon"
import { Box, Link } from "@chakra-ui/layout"
import React from "react"
import { AiFillGithub } from "react-icons/ai"

const DefaultLayout: React.FC = ({ children }) => (
    <Box>
        <Box marginTop="1.5rem" overflow="auto">
            {children}
        </Box>
        <Box textAlign="center" width="100%" marginTop="1.5rem">
            <Link href="https://github.com/PawelJ-PL/czasogar" isExternal={true}>
                <Icon as={AiFillGithub} /> Odwiedź projekt w serwisie Github
            </Link>
        </Box>
    </Box>
)

export default DefaultLayout
