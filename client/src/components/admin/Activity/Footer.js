import React, { Component } from 'react'
import {
  Typography,
  Paper,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { getFooter, addFooter } from '../../../actions/footer'
import { setErrors, clearErrors } from '../../../actions/error'
import ErrorInfo from '../../common/ErrorInfo'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '20px'
  },
  createBtn: {
    float: 'right'
  }
})

class Footer extends Component {
  state = {
    content: '',
    footerOrigin: this.props.footer.footer,
    creating: false,
    formLoading: false,
    noEditError: false
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })

    this.props.clearErrors([e.target.name])
  }

  clearForm = () => {
    this.setState({ content: '', creating: false, noEditError: false })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ formLoading: true })

    if (
      this.state.footerOrigin &&
      this.state.footerOrigin.content === this.state.content
    ) {
      return this.setState({ formLoading: false, noEditError: true })
    }

    const newFooter = {
      content: this.state.content
    }
    this.props.addFooter(newFooter).then(() => {
      this.setState({ formLoading: false })
      if (!this.props.errors.content) {
        this.clearForm()
      }
    })
  }

  onErrorClose = () => {
    this.props.clearErrors(['server'])
  }

  onCreate = e => {
    this.setState({ creating: true })
  }

  // Dialog close
  handleClose = e => {
    this.clearForm()
    this.props.clearErrors(['content', 'server'])
  }

  render() {
    const { content, formLoading, creating, noEditError } = this.state
    const { classes, style, errors, footer } = this.props

    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Footer
          <Button
            variant="contained"
            color="primary"
            className={classes.createBtn}
            onClick={this.onCreate}
          >
            <i className="fas fa-plus" />
          </Button>
        </Typography>

        {!footer.footer || !footer.footer.content ? (
          <Typography>
            Copyright &copy; {new Date().getFullYear()} HiFIVE
          </Typography>
        ) : (
          <Typography>{footer.footer.content}</Typography>
        )}
        <Dialog
          aria-labelledby="form-dialog-title"
          open={creating}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            Edit Footer
            <Button
              variant="contained"
              color="primary"
              className={classes.createBtn}
              onClick={this.handleClose}
            >
              <i className="fas fa-times" />
            </Button>
          </DialogTitle>
          <DialogContent>
            {noEditError && (
              <Typography color="error">Footer unedited</Typography>
            )}
            {formLoading && (
              <CircularProgress className={classes.progress} color="primary" />
            )}
            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                label="Footer content"
                name="content"
                value={content}
                onChange={this.onChange}
                error={!!errors.content ? true : false}
                fullWidth
              />
              {errors.content && (
                <Typography color="error">{errors.content.msg}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Add
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        {errors.server && (
          <ErrorInfo
            variant="error"
            message={errors.server}
            onClose={this.onErrorClose}
          />
        )}
      </Paper>
    )
  }
}

Footer.propTypes = {
  footer: PropTypes.object.isRequired,
  getFooter: PropTypes.func.isRequired,
  addFooter: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  footer: state.footer,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getFooter, addFooter, setErrors, clearErrors }
)(withStyles(styles)(Footer))
