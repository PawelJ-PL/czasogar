import { checkbox } from "./components/checkbox"
import { button } from "./components/button"
import { colors } from "./colors"
import { styles } from "./styles"
import { extendTheme } from "@chakra-ui/react"
import { select } from "./components/select"

const overrides = {
    colors,
    styles,
    components: {
        Select: select,
        Button: button,
        Checkbox: checkbox,
    },
}

export const theme = extendTheme(overrides)
