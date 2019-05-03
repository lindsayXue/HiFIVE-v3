import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getFooter } from '../../actions/footer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const styles = theme => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    /* Set the fixed height of the footer here */
    height: '40px'
  }
})

const Footer = ({ classes, footer, getFooter }) => {
  useEffect(() => {
    getFooter()
  }, [])

  return (
    <Grid
      container
      className={classes.footer}
      component="footer"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        {!footer.footer || !footer.footer.content ? (
          <Typography>
            Copyright &copy; {new Date().getFullYear()} HiFIVE
          </Typography>
        ) : (
          <Typography>{footer.footer.content}</Typography>
        )}
      </Grid>
    </Grid>
  )
}
Footer.propTypes = {
  footer: PropTypes.object.isRequired,
  getFooter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  footer: state.footer
})

export default connect(
  mapStateToProps,
  { getFooter }
)(withStyles(styles)(Footer))
