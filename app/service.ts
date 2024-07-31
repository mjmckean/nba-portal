import {
    Game,
    Player,
    SeasonAverage,
    Stat,
    Team,
} from './types';

const baseUrl = 'https://api.balldontlie.io/v1';

const getUrl = async(url: string): Promise<any> => {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: `${process.env.NEXT_PUBLIC_BDL_API_KEY}`,
            },
        }
    );
    const data = await res.json();
    return data['data'];
};

const generateQueryFromList = (ids: number[] | string[], type: string): string => {
    return ids.map(id => `&${type}[]=${id}`).join();
};

export const getGames = async (
    gameId?: number,
    cursor?: number,
    perPage?: number,
    dates?: string[],
    teamIds?: number[],
    postseason?: boolean,
    startDate?: string,
    endDate?: string,
): Promise<Game[]> => {
    const gamesEndpoint: string = gameId ? `/games/${gameId}` : '/games';
    let gamesQuery: string = '?seasons[]=2023';
    if (cursor) gamesQuery += `&cursor=${cursor}`;
    if (perPage) gamesQuery += `&per_page=${perPage}`;
    if (dates) gamesQuery += generateQueryFromList(dates, 'dates');
    if (teamIds) gamesQuery += generateQueryFromList(teamIds, 'team_ids');
    if (postseason) gamesQuery += `&postseason=${postseason}`;
    if (startDate) gamesQuery += `&start_date=${startDate}`;
    if (endDate) gamesQuery += `&end_date=${endDate}`;
    const gamesUrl: string = baseUrl + gamesEndpoint + gamesQuery;
    const games: Promise<Game[]> = await getUrl(gamesUrl);
    return games;
};

export const getPlayer = async (
    playerId: number,
): Promise<Player> => {
    const playerEndpoint: string = `/players/${playerId}`;
    const playersUrl: string = baseUrl + playerEndpoint;
    const player: Promise<Player> = await getUrl(playersUrl);
    return player;
};

export const getPlayers = async (
    search?: string,
    teamIds?: number[],
    perPage?: number,
    playerId?: number,
    cursor?: number,
    firstName?: string,
    lastName?: string,
    playerIds?: number[],
): Promise<Player[]> => {
    const playersEndpoint: string = playerId ? `/players/${playerId}` : '/players';
    let playersQuery: string = '?';
    if (cursor) playersQuery += `&cursor=${cursor}`;
    if (perPage) playersQuery += `&per_page=${perPage}`;
    if (search) playersQuery += `&search=${search}`;
    if (firstName) playersQuery += `&first_name=${firstName}`;
    if (lastName) playersQuery += `&last_name=${lastName}`;
    if (teamIds) playersQuery += generateQueryFromList(teamIds, 'team_ids');
    if (playerIds) playersQuery += generateQueryFromList(playerIds, 'player_ids');
    const playersUrl: string = baseUrl + playersEndpoint + playersQuery;
    const players: Promise<Player[]> = await getUrl(playersUrl);
    return players;
};

export const getSeasonAverages = async (
    playerIds: number[],
): Promise<SeasonAverage[]> => {
    const seasonAveragesEndpoint: string = '/season_averages';
    const playerIdsQuery: string = generateQueryFromList(playerIds, 'player_ids');
    const seasonAveragesQuery: string = '?season=2023' + playerIdsQuery;
    const seasonAveragesUrl: string = baseUrl + seasonAveragesEndpoint + seasonAveragesQuery;
    const seasonAverages: Promise<SeasonAverage[]> = await getUrl(seasonAveragesUrl);
    return seasonAverages;
};

export const getStats = async (
    cursor?: number,
    perPage?: number,
    playerIds?: number[],
    gameIds?: number[],
    dates?: string[],
    postseason?: boolean,
    startDate?: string,
    endDate?: string,
): Promise<Stat[]> => {
    const statsEndpoint: string = '/stats';
    let statsQuery: string = '?seasons[]=2023';
    if (cursor) statsQuery += `&cursor=${cursor}`;
    if (perPage) statsQuery += `&per_page=${perPage}`;
    if (playerIds) statsQuery += generateQueryFromList(playerIds, 'player_ids');
    if (gameIds) statsQuery += generateQueryFromList(gameIds, 'game_ids');
    if (dates) statsQuery += generateQueryFromList(dates, 'dates');
    if (postseason) statsQuery += `&postseason=${postseason}`;
    if (startDate) statsQuery += `&start_date=${startDate}`;
    if (endDate) statsQuery += `&end_date=${endDate}`;
    const statsUrl: string = baseUrl + statsEndpoint + statsQuery;
    const stats: Promise<Stat[]> = await getUrl(statsUrl);
    return stats;
};

export const getTeams = async (
    teamId?: number,
    division?: string,
    conference?: string,
): Promise<Team[]> => {
    const teamsEndpoint: string = teamId ? `/teams/${teamId}` : '/teams';
    let teamsQuery: string = '?';
    if (division) teamsQuery += `&division=${division}`;
    if (conference) teamsQuery += `&conference=${conference}`;
    const teamsUrl: string = baseUrl + teamsEndpoint + teamsQuery;
    const teams: Promise<Team[]> = await getUrl(teamsUrl);
    return teams;
};
