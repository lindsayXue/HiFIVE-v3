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
  IconButton
} from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BonusService from '../../../services/user/Bonus'
import Pagination from '../../common/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import { addBonus, deleteBonus } from '../../../actions/bonus'
import { setErrors, clearError } from '../../../actions/error'
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
    page: 0
  }

  async componentDidMount() {
    try {
      const res = await BonusService.getBonuses()
      this.setState({ bonuses: res.data })
    } catch (err) {
      this.props.setErrors(err.response.data)
    }
  }

  async componentWillUpdate() {
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

    this.props.clearError([e.target.name])
  }

  onSubmit = e => {
    e.preventDefault()

    const newBonus = {
      name: this.state.name,
      points: this.state.points
    }

    this.props.addBonus(newBonus)
    this.setState({ name: '', points: '' })
  }

  onDelete = id => {
    this.props.deleteBonus(id)
  }

  onErrorClose = () => {
    this.props.clearError('server')
  }

  render() {
    const { bonuses, rowsPerPage, page, name, points } = this.state
    const { classes, style, errors } = this.props
    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Bonus
        </Typography>
        <hr />
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

        <form onSubmit={this.onSubmit}>
          <TextField
            label="Bonus name"
            name="name"
            value={name}
            onChange={this.onChange}
            error={!!errors.name ? true : false}
            fullWidth
          />
          {errors.name && (
            <Typography color="error">{errors.name.msg}</Typography>
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
            <Typography color="error">{errors.points.msg}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Add bonus
          </Button>
          {errors.server && (
            <ErrorInfo
              variant="error"
              message={errors.server}
              onClose={this.onErrorClose}
            />
          )}
        </form>
      </Paper>
    )
  }
}

Bonus.propTypes = {
  addBonus: PropTypes.func.isRequired,
  deleteBonus: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addBonus, deleteBonus, setErrors, clearError }
)(withStyles(styles)(Bonus))
