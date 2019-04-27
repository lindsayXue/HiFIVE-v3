import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import capeReinga from '../../assets/capeReinga1.jpg'
import auckland from '../../assets/auckland.jpg'
import wellington from '../../assets/wellington.jpg'
import christchurch from '../../assets/christchurch.jpg'
import dunedin from '../../assets/dunedin.jpg'
import stirlingpoint from '../../assets/stirlingpoint.jpg'
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  LinearProgress
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    maxWidth: '100%'
  },
  media: {
    height: 300
  },
  textPrimary: {
    color: theme.palette.primary.main
  }
})

class Journey extends Component {
  state = {
    distanceNZ: 2122000
  }
  ß
  render() {
    const { activity, classes, style } = this.props
    const { distanceNZ } = this.state

    let percent = ((activity.points * 1000) / distanceNZ).toFixed(2)
    if (percent > 100) {
      percent = 100
    }

    let journeyImg = capeReinga

    if (percent >= 20 && percent < 40) {
      journeyImg = auckland
    }
    if (percent >= 40 && percent < 60) {
      journeyImg = wellington
    }
    if (percent >= 60 && percent < 80) {
      journeyImg = christchurch
    }
    if (percent >= 80 && percent < 100) {
      journeyImg = dunedin
    }
    if (percent === 100) {
      journeyImg = stirlingpoint
    }

    return (
      <Card className={classes.card} style={style}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={journeyImg}
            title="Journey image"
            alt="Journey image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              <Typography component="span" inline variant="h6" color="primary">
                {activity.points * 10}{' '}
              </Typography>
              meters NOW!
              <Typography inline color="secondary" style={{ float: 'right' }}>
                One point = Ten meters
              </Typography>
            </Typography>
            <hr />
            <Grid container justify="space-around">
              <Typography
                component="p"
                variant="caption"
                color={percent >= 0 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Cape Reinga
              </Typography>
              <Typography
                component="p"
                variant="caption"
                color={percent >= 20 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Auckland
              </Typography>
              <Typography
                component="p"
                variant="caption"
                color={percent >= 40 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Wellington
              </Typography>
              <Typography
                component="p"
                variant="caption"
                color={percent >= 60 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Christchurch
              </Typography>
              <Typography
                component="p"
                variant="caption"
                color={percent >= 80 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Dunedin
              </Typography>
              <Typography
                component="p"
                variant="caption"
                color={percent >= 100 ? 'primary' : 'secondary'}
              >
                <i className="fas fa-map-marker-alt" />
                Stirling point
              </Typography>
            </Grid>
            <LinearProgress value={Number(percent)} variant="determinate" />
            <Typography
              component="p"
              variant="h5"
              style={{ textAlign: 'center' }}
              color="secondary"
            >
              {percent} %
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

Journey.propTypes = {
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(mapStateToProps)(withStyles(styles)(Journey))
