import Api from '../Api'

export default {
  getTeams() {
    return Api().get('teams')
  },
  getUserTeam(teamId) {
    return Api().get(`teams/${teamId}`)
  },
  getTeamWinner() {
    return Api().get('teams/winner')
  }
}
