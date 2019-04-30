import React, { Component } from 'react'
import PostService from '../../services/user/Post'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 20
  },
  backBtn: {
    float: 'right'
  }
})

class Post extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null
  }

  async componentDidMount() {
    const res = await PostService.getPosts()
    this.setState({ posts: res.data, isLoading: false })
    try {
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { posts, isLoading } = this.state
    const { classes } = this.props

    return (
      <Grid container justify="center">
        <Grid item md={6} xs={11}>
          <Paper className={classes.root} elevation={2}>
            <Typography variant="h5" color="primary">
              Posts board
              <Button
                component={RouterLink}
                to="/user/home"
                className={classes.backBtn}
                variant="contained"
                color="primary"
              >
                Back
              </Button>
            </Typography>
            <hr />
            {isLoading && <LinearProgress color="primary" />}
            {posts.length === 0 && (
              <Typography component="p" variant="subtitle1" color="secondary">
                No post yet
              </Typography>
            )}
            <List>
              {posts.map((post, index) => (
                <ListItem
                  key={index}
                  button
                  component="a"
                  href={post.url}
                  target="_blank"
                  variant="subtitle1"
                  color="secondary"
                >
                  <ListItemText primary={post.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Post)
