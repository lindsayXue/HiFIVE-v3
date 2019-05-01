import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import FooterService from '../../services/user/Footer'

const styles = theme => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    /* Set the fixed height of the footer here */
    height: '40px'
  }
})

class Footer extends Component {
  state = {
    footer: null
  }
  async componentDidMount() {
    try {
      const res = await FooterService.getFooter()
      this.setState({ footer: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { classes } = this.props
    const { footer } = this.state
    return (
      <Grid
        container
        className={classes.footer}
        component="footer"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          {!footer ? (
            <Typography>
              Copyright &copy; {new Date().getFullYear()} HiFIVE
            </Typography>
          ) : (
            <Typography>{footer.content}</Typography>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Footer)
