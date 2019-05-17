import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVE'
import PropTypes from 'prop-types'
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Pagination from '../common/Pagination'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: '20px'
  }
})

class HiFIVE extends Component {
  _isMounted = false

  state = {
    hifives: [],
    page: 0,
    rowsPerPage: 5,
    error: null
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await HiFIVEService.getUserHiFIVE()
      if (this._isMounted) {
        this.setState({
          hifives: res.data
        })
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({ error: err.response.data })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  render() {
    const { classes, style } = this.props
    const { hifives, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h6" color="primary" gutterBottom>
          Guess who gave you a HiFIVE
        </Typography>
        <div className={classes.demo}>
          <List style={{ overflow: 'overlay' }}>
            {hifives.length === 0 && (
              <ListItem>
                <ListItemText secondary="No one gave you a HiFIVE yet" />
              </ListItem>
            )}
            {hifives
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(hi => (
                <ListItem key={hi._id}>
                  <ListItemText primary={hi.sender.name} />
                  <ListItemText
                    secondary={hi.reason}
                    style={{ textAlign: 'right' }}
                  />
                </ListItem>
              ))}
          </List>
          <Pagination
            data={hifives}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={this.handleChangePage}
          />
        </div>
      </Paper>
    )
  }
}

HiFIVE.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withStyles(styles)(HiFIVE))
