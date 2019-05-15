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
import PostService from '../../../services/user/Post'
import Pagination from '../../common/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import { addPost, deletePost } from '../../../actions/post'
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

class Post extends Component {
  _isMounted = false
  state = {
    title: '',
    url: 'http://',
    posts: [],
    rowsPerPage: 5,
    page: 0,
    creating: false,
    postLoading: false,
    formLoading: false
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await PostService.getPosts()
      if (this._isMounted) {
        this.setState({ posts: res.data })
      }
    } catch (err) {
      this.props.setErrors(err.response.data)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })

    this.props.clearErrors([e.target.name])
  }

  clearForm = () => {
    this.setState({ title: '', url: 'http://', creating: false })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ formLoading: true })
    const newPost = {
      title: this.state.title,
      url: this.state.url
    }
    this.props.addPost(newPost).then(async () => {
      this.setState({ formLoading: false })

      if (!this.props.errors.title && !this.props.errors.url) {
        try {
          this.setState({ postLoading: true })
          const res = await PostService.getPosts()
          this.setState({
            posts: res.data,
            postLoading: false
          })
          this.clearForm()
        } catch (err) {
          this.setErrors(err.response.data)
          this.setState({ postLoading: false })
        }
      }
    })
  }

  onDelete = id => {
    this.setState({ postLoading: true })
    this.props.deletePost(id).then(async () => {
      try {
        const res = await PostService.getPosts()
        this.setState({ posts: res.data, postLoading: false })
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
    this.props.clearErrors(['title', 'url', 'server'])
  }

  render() {
    const {
      posts,
      rowsPerPage,
      page,
      title,
      url,
      postLoading,
      formLoading,
      creating
    } = this.state
    const { classes, style, errors } = this.props

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage)

    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Post
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
        {postLoading && (
          <CircularProgress className={classes.progress} color="primary" />
        )}
        <List>
          {posts.length === 0 && (
            <ListItem>
              <ListItemText secondary="No post yet" />
            </ListItem>
          )}
          {posts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(post => (
              <ListItem
                key={post._id}
                button
                component="a"
                href={post.url}
                target="_blank"
                variant="subtitle1"
                color="secondary"
              >
                <ListItemText primary={post.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={this.onDelete.bind(this, post._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          {emptyRows > 0 && <ListItem style={{ height: 48 * emptyRows }} />}
        </List>
        <Pagination
          data={posts}
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
            Add post
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
                label="Post title"
                name="title"
                value={title}
                onChange={this.onChange}
                error={!!errors.title ? true : false}
                fullWidth
              />
              {errors.title && (
                <Typography color="error">{errors.title.msg}</Typography>
              )}

              <TextField
                label="Post URL"
                name="url"
                type="url"
                value={url}
                onChange={this.onChange}
                error={!!errors.url ? true : false}
                fullWidth
              />
              {errors.url && (
                <Typography color="error">{errors.url.msg}</Typography>
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

Post.propTypes = {
  addPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addPost, deletePost, setErrors, clearErrors }
)(withStyles(styles)(Post))
