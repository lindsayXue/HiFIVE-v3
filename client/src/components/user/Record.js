import React, { Component } from 'react'
import RecordService from '../../services/user/RecordService'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import Pagination from '../common/Pagination'

class Record extends Component {
  state = {
    records: [],
    pageItem: 5,
    pagination: 1,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await RecordService.getUserRecord({
        googleId: this.props.auth.user._id,
        number: 10
      })
      this.setState({ records: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  prevClick = e => {
    this.setState({ pagination: this.state.pagination - 1 })
  }

  nextClick = e => {
    this.setState({
      pagination: this.state.pagination + 1
    })
  }

  render() {
    const { records, pagination, pageItem } = this.state

    const currentPage = records.filter(
      (record, index) =>
        index < pagination * pageItem && index >= (pagination - 1) * pageItem
    )

    const data = {
      labels: records
        .map(record => moment(record.date).format('MMM Do'))
        .reverse(),
      datasets: [
        {
          data: records.map(record => record.points).reverse(),
          borderColor: '#27a6bb',
          fill: false
        }
      ]
    }

    const chartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel
          }
        }
      },
      maintainAspectRatio: false
    }
    return (
      <div>
        <h5 className="card-header text-center text-primary">
          Exercise Records
          <Link to="/user/record/add">
            <button
              type="button"
              className="btn btn-sm btn-default float-right mr-2"
            >
              + Record
            </button>
          </Link>
        </h5>
        <div className="card-body">
          <p className="card-text">
            <Line width={400} height={300} data={data} options={chartOptions} />
          </p>
          <div className="card-text">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duraion</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {currentPage.map(record => {
                  return (
                    <tr key={record._id}>
                      <th scope="row" />
                      <td>{moment(record.date).format('MMM DD')}</td>
                      <td>{record.type}</td>
                      <td>{record.duration}</td>
                      <td>{record.points}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              pageItem={pageItem}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              currentPage={currentPage}
              totalNumber={records.length}
            />
          </div>
        </div>
      </div>
    )
  }
}

Record.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Record)
