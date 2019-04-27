import React, { Component } from 'react'
import TeamService from '../../services/user/TeamService'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination
} from '@material-ui/core'
import TablePaginationActionsWrapped from '../common/TablePaginationActions'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
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

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value })
  }

  render() {
    const { classes, style } = this.props
    const { members, rowsPerPage, page } = this.state

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, members.length - page * rowsPerPage)

    return (
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h5" component="h3" color="primary">
          Team members
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length === 0 && (
              <TableRow color="secondary">
                <TableCell>No team member yet</TableCell>
              </TableRow>
            )}
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(member => (
                <TableRow key={member._id}>
                  <TableCell component="th" scope="row">
                    {member.name}
                  </TableCell>
                  <TableCell align="right">{member.points}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={3}
                count={members.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
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
