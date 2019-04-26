import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'

export default createMuiTheme({
  palette: {
    primary: {
      light: teal[200],
      main: teal[500],
      dark: teal[700],
      contrastText: '#fff'
    },
    secondary: {
      light: grey[100],
      main: grey[700],
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
})
