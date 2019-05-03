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
import FooterService from '../../../services/user/Footer'
import { addFooter } from '../../../actions/footer'
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
    footer: {
      content: ''
    },
    rowsPerPage: 5,
    page: 0,
    creating: false,
    footerLoading: false,
    formLoading: false,
    noEditError: false
  }

  async componentDidMount() {
    try {
      const res = await FooterService.getFooter()
      if (!res.data) {
        return
      } else {
        this.setState({ footer: res.data, content: res.data.content })
      }
    } catch (err) {
      this.props.setErrors(err.response.data)
    }
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

    if (this.state.footer.content === this.state.content) {
      return this.setState({ formLoading: false, noEditError: true })
    }

    const newFooter = {
      content: this.state.content
    }
    this.props.addFooter(newFooter).then(async () => {
      this.setState({ formLoading: false })

      if (!this.props.errors.content) {
        try {
          this.setState({ footerLoading: true })
          const res = await FooterService.getFooter()
          this.setState({
            footer: res.data,
            footerLoading: false
          })
          this.clearForm()
        } catch (err) {
          this.setErrors(err.response.data)
          this.setState({ footerLoading: false })
        }
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
    const {
      content,
      footer,
      footerLoading,
      formLoading,
      creating,
      noEditError
    } = this.state
    const { classes, style, errors } = this.props

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

        {!footer || !footer.content ? (
          <Typography>
            Copyright &copy; {new Date().getFullYear()} HiFIVE
          </Typography>
        ) : (
          <Typography>{footer.content}</Typography>
        )}

        {footerLoading && (
          <CircularProgress className={classes.progress} color="primary" />
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
  addFooter: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addFooter, setErrors, clearErrors }
)(withStyles(styles)(Footer))
