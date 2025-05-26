import { createTheme } from "@mantine/core"

export const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Inter, system-ui, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    Card: {
      defaultProps: {
        shadow: "sm",
        radius: "md",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
  },
})
