var method = Team.prototype;

function Team(team_id,team,wins, losses, ties) {
    this._team_id = team_id;
    this._team = team;
    this._wins = wins;
    this._losses = losses;
    this._ties = ties;
}

method.getTeamId = function() {
    return this._team_id;
};
method.getTeamName = function() {
    return this._team;
};
method.getWins = function() {
    return this._wins;
};
method.getLosses = function() {
    return this._losses;
};

method.getTies = function() {
    return this._ties;
};

module.exports = Team;
