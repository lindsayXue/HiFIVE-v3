import React, { Component } from 'react'
import {
  Typography,
  Paper,
  CircularProgress,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BonusService from '../../../services/user/Bonus'
import Pagination from '../../common/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import { addBonus, deleteBonus } from '../../../actions/bonus'
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

class Bonus extends Component {
  state = {
    name: '',
    points: '',
    bonuses: [],
    rowsPerPage: 5,
    page: 0,
    creating: false,
    bonusLoading: false,
    formLoading: false
  }

  async componentDidMount() {
    try {
      const res = await BonusService.getBonuses()
      this.setState({ bonuses: res.data })
    } catch (err) {
      this.props.setErrors(err.response.data)
    }
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })

    this.props.clearErrors([e.target.name])
  }

  clearForm = () => {
    this.setState({ name: '', points: '', creating: false })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ formLoading: true })
    const newBonus = {
      name: this.state.name,
      points: this.state.points
    }
    this.props.addBonus(newBonus).then(async () => {
      this.setState({ formLoading: false })

      if (!this.props.errors.name && !this.props.errors.points) {
        try {
          this.setState({ bonusLoading: true })
          const res = await BonusService.getBonuses()
          this.setState({
            bonuses: res.data,
            bonusLoading: false
          })
          this.clearForm()
        } catch (err) {
          this.setErrors(err.response.data)
          this.setState({ bonusLoading: false })
        }
      }
    })
  }

  onDelete = id => {
    this.setState({ bonusLoading: true })
    this.props.deleteBonus(id).then(async () => {
      try {
        const res = await BonusService.getBonuses()
        this.setState({ bonuses: res.data, bonusLoading: false })
      } catch (err) {
        this.setErrors(err.response.data)
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
    this.props.clearErrors(['name', 'points', 'server'])
  }

  render() {
    const {
      bonuses,
      rowsPerPage,
      page,
      name,
      points,
      bonusLoading,
      formLoading,
      creating
    } = this.state
    const { classes, style, errors } = this.props
    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Bonus
          <Button
            variant="contained"
            color="primary"
            className={classes.createBtn}
            onClick={this.onCreate}
          >
            <i className="fas fa-plus" />
          </Button>
        </Typography>
        <hr />
        {bonusLoading && (
          <CircularProgress className={classes.progress} color="primary" />
        )}
        <List>
          {bonuses.length === 0 && (
            <ListItem>
              <ListItemText secondary="No bonus yet" />
            </ListItem>
          )}
          {bonuses
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(bonus => (
              <ListItem key={bonus._id}>
                <ListItemText primary={bonus.name} />
                <ListItemText secondary={`${bonus.points} points`} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={this.onDelete.bind(this, bonus._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Pagination
          data={bonuses}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={this.handleChangePage}
        />
        <Dialog
          aria-labelledby="form-dialog-title"
          open={creating}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            Add bonus
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
            {formLoading && (
              <CircularProgress className={classes.progress} color="primary" />
            )}
            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                label="Bonus name"
                name="name"
                value={name}
                onChange={this.onChange}
                error={!!errors.name ? true : false}
                fullWidth
              />
              {errors.name && (
                <Typography color="error" style={{ width: '100%' }}>
                  {errors.name.msg}
                </Typography>
              )}

              <TextField
                label="Bonus points"
                name="points"
                type="number"
                value={points}
                onChange={this.onChange}
                error={!!errors.points ? true : false}
                fullWidth
              />
              {errors.points && (
                <Typography color="error" style={{ width: '100%' }}>
                  {errors.points.msg}
                </Typography>
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

Bonus.propTypes = {
  addBonus: PropTypes.func.isRequired,
  deleteBonus: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addBonus, deleteBonus, setErrors, clearErrors }
)(withStyles(styles)(Bonus))
