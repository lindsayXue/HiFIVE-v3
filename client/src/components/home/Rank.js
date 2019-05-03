import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'

class Rank extends Component {
  render() {
    const { title, winner } = this.props

    let winnerBoard

    if (winner.length === 0) {
      winnerBoard = (
        <Typography component="p" color="secondary">
          No winner yet
        </Typography>
      )
    } else if (winner.length === 1) {
      winnerBoard = (
        <div>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#ffc107' }} />
            </ListItemIcon>
            <ListItemText primary={winner[0].name} />
            <ListItemText
              secondary={`${winner[0].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
          <Typography component="p" color="secondary">
            No other winner yet
          </Typography>
        </div>
      )
    } else if (winner.length === 2) {
      winnerBoard = (
        <div>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#ffc107' }} />
            </ListItemIcon>
            <ListItemText primary={winner[0].name} />
            <ListItemText
              secondary={`${winner[0].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#C0C0C0' }} />
            </ListItemIcon>
            <ListItemText primary={winner[1].name} />
            <ListItemText
              secondary={`${winner[1].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
          <Typography component="p" color="secondary">
            No other winner yet
          </Typography>
        </div>
      )
    } else {
      winnerBoard = (
        <div>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#ffc107' }} />
            </ListItemIcon>
            <ListItemText primary={winner[0].name} />
            <ListItemText
              secondary={`${winner[0].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#C0C0C0' }} />
            </ListItemIcon>
            <ListItemText primary={winner[1].name} />
            <ListItemText
              secondary={`${winner[1].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <i className="fas fa-trophy" style={{ color: '#964B00' }} />
            </ListItemIcon>
            <ListItemText primary={winner[2].name} />
            <ListItemText
              secondary={`${winner[2].points} points`}
              style={{ textAlign: 'right' }}
            />
          </ListItem>
        </div>
      )
    }

    return (
      <div>
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
        <List>{winnerBoard}</List>
      </div>
    )
  }
}

Rank.propTypes = {
  winner: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Rank
