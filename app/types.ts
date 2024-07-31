type BaseGame = {
    'date': string,
    'season': number,
    'status': string,
    'period': number,
    'time': string,
    'postseason': boolean,
    'home_team_score': number,
    'visitor_team_score': number,
}

type BasePlayer = {
    'id': number,
    'first_name': string,
    'last_name': string,
    'position': string,
    'height': string,
    'weight': string,
    'jersey_number': string,
    'college': string,
    'country': string,
    'draft_year': number,
    'draft_round': number,
    'draft_number': number,
}

type BaseStat = {
    'pts': number,
    'ast': number,
    'turnover': number,
    'pf': number,
    'fga': number,
    'fgm': number,
    'fta': number,
    'ftm': number,
    'fg3a': number,
    'fg3m': number,
    'reb': number,
    'oreb': number,
    'dreb': number,
    'stl': number,
    'blk': number,
    'fg_pct': number,
    'fg3_pct': number,
    'ft_pct': number,
    'min': string,
}

export type Game = BaseGame & {
    'id': number,
    'home_team': Team,
    'visitor_team': Team,
}

type GameWithTeamId = BaseGame & {
    'id': number,
    'home_team_id': number,
    'visitor_team_id': number,
}

export type Player = BasePlayer & {
    'team': Team,
}

type PlayerWithTeamId = BasePlayer & {
    'team_id': number,
}

export type SeasonAverage = BaseStat & {
    'games_played': number,
    'player_id': number,
    'season': number,
}

export type Stat = BaseStat & {
    'id': number,
    'player': PlayerWithTeamId,
    'team': Team,
    'game': GameWithTeamId,
}

export type Team = {
    'id': number,
    'conference': string,
    'division': string,
    'city': string,
    'name': string,
    'full_name': string,
    'abbreviation': string,
};
