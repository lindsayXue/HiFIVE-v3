import React, { Component } from 'react'
import TeamService from '../../services/user/Team'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Pagination from '../common/Pagination'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: '20px'
  }
})

class Member extends Component {
  state = {
    members: [],
    page: 0,
    rowsPerPage: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await TeamService.getTeamMember(this.props.auth.user.team)
      this.setState({
        members: res.data.filter(
          member => member._id !== this.props.auth.user._id
        )
      })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  render() {
    const { classes, style } = this.props
    const { members, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h5" color="primary" gutterBottom>
          Team members
        </Typography>
        <List>
          {members.length === 0 && (
            <ListItem>
              <ListItemText secondary="No team member yet" />
            </ListItem>
          )}
          {members
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(member => (
              <ListItem key={member._id}>
                <ListItemText primary={member.name} />
                <ListItemText secondary={`${member.points} points`} />
              </ListItem>
            ))}
        </List>
        <Pagination
          data={members}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={this.handleChangePage}
        />
      </Paper>
    )
  }
}

Member.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withStyles(styles)(Member))
