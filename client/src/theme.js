import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: grey[800]
    }
  },
  typography: {
    useNextVariants: true
  }
})
