import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { Provider } from "react-redux"
import DefaultLayout from "./application/components/layout/DefaultLayout"
import applicationStore from "./application/store"
import { theme } from "./application/theme"
import ProfilesContainer from "./domain/application-profile/components/ProfilesContainer"

function App(): JSX.Element {
    return (
        <Provider store={applicationStore}>
            <ChakraProvider theme={theme}>
                <DefaultLayout>
                    <ProfilesContainer />
                </DefaultLayout>
            </ChakraProvider>
        </Provider>
    )
}

export default App
