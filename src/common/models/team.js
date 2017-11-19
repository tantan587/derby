var method = Team.prototype;

function Team(team_id,key,city,name,wins,losses,ties) {
    this.team_id = team_id;
    this.key = key;
    this.team = city+ " " + name;
    this.wins = wins;
    this.losses = losses;
    this.ties = ties;
}

method.getTeamId = function() {
    return this.team_id;
};
method.getKey = function() {
    return this.key;
};
method.getTeamName = function() {
    return this.team;
};
method.getWins = function() {
    return this.wins;
};
method.getLosses = function() {
    return this.losses;
};
method.getTies = function() {
    return this.ties;
};

module.exports = Team;
