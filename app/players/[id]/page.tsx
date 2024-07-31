'use client';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { getPlayer, getSeasonAverages } from '../../service';
import { Player } from '../../types';


const PlayerInfo = ({ params }: { params: { id: number } }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [shootingStats, setShootingStats] = useState<any[]>([]);
  const [totalStats, setTotalStats] = useState<any[]>([]);
  const [totalShootingStats, setTotalShootingStats] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState<any[]>([
    { field: 'PTS', flex: 1 },
    { field: 'AST', flex: 1 },
    { field: 'TO', flex: 1 },
    { field: 'REB', flex: 1 },
    { field: 'OREB', flex: 1 },
    { field: 'DREB', flex: 1 },
    { field: 'STL', flex: 1 },
    { field: 'BLK', flex: 1 },
    { field: 'PF', flex: 1 },
    { field: 'MIN', flex: 1 },
  ]);
  const [shootingColDefs, setShootingColDefs] = useState<any[]>([
    { field: 'FGM', flex: 1 },
    { field: 'FGA', flex: 1 },
    { field: 'FG%', flex: 1 },
    { field: '3PM', flex: 1 },
    { field: '3PA', flex: 1 },
    { field: '3P%', flex: 1 },
    { field: 'FTM', flex: 1 },
    { field: 'FTA', flex: 1 },
    { field: 'FT%', flex: 1 },
  ]);

  useEffect(() => {
    loadPlayer();
    loadStats();
  }, []);

  const multiplyMinString = (mins: string, multiplier: number) => {
    const time = mins.split(':');
    const calculatedSeconds = Number(time[0]) * 60 + Number(time[1]);
    const totalSeconds = calculatedSeconds * multiplier;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const loadPlayer = async () => {
    const playerSearch = await getPlayer(params.id);
    setPlayer(playerSearch);
  };
  
  const loadStats = async () => {
    const stats = await getSeasonAverages([params.id]);

    const seasonAverage = stats.map(stat => (
      {
        'PTS': stat.pts,
        'AST': stat.ast,
        'TO': stat.turnover,
        'REB': stat.reb,
        'OREB': stat.oreb,
        'DREB': stat.dreb,
        'STL': stat.stl,
        'BLK': stat.blk,
        'PF': stat.pf,
        'MIN': stat.min,
      }
    ));
    const seasonShootingAverage = stats.map(stat => (
      {
        'FGM': stat.fgm,
        'FGA': stat.fga,
        'FG%': stat.fg_pct,
        '3PM': stat.fg3m,
        '3PA': stat.fg3a,
        '3P%': stat.fg3_pct,
        'FTM': stat.ftm,
        'FTA': stat.fta,
        'FT%': stat.ft_pct,
      }
    ));
    const totalSeasonAverage = stats.map(stat => (
      {
        'PTS': Math.round(stat.pts * stat.games_played),
        'AST': Math.round(stat.ast * stat.games_played),
        'TO': Math.round(stat.turnover * stat.games_played),
        'REB': Math.round(stat.reb * stat.games_played),
        'OREB': Math.round(stat.oreb * stat.games_played),
        'DREB': Math.round(stat.dreb * stat.games_played),
        'STL': Math.round(stat.stl * stat.games_played),
        'BLK': Math.round(stat.blk * stat.games_played),
        'PF': Math.round(stat.pf * stat.games_played),
        'MIN': multiplyMinString(stat.min, stat.games_played),
      }
    ));
    const totalSeasonShootingAverage = stats.map(stat => (
      {
        'FGM': Math.round(stat.fgm * stat.games_played),
        'FGA': Math.round(stat.fga * stat.games_played),
        'FG%': stat.fg_pct,
        '3PM': Math.round(stat.fg3m * stat.games_played),
        '3PA': Math.round(stat.fg3a * stat.games_played),
        '3P%': stat.fg3_pct,
        'FTM': Math.round(stat.ftm * stat.games_played),
        'FTA': Math.round(stat.fta * stat.games_played),
        'FT%': stat.ft_pct,
      }
    ));
    setStats(seasonAverage);
    setShootingStats(seasonShootingAverage);
    setTotalStats(totalSeasonAverage);
    setTotalShootingStats(totalSeasonShootingAverage);
  };

  return (
    <div>
      {
        player && <div className='player-info'>
          <div className='player-info-id'>
            <p className='player-info-jersey'>{player?.jersey_number}</p>
            <p className='player-info-name'>{player?.first_name} {player?.last_name}</p>
          </div>
          <div className='player-info-details'>
            <p className='player-info-height'>Height: {player?.height}</p>
            <p className='player-info-weight'>Weight: {player?.weight}</p>
            <p className='player-info-position'>Position: {player?.position}</p>
            <p className='player-info-college'>{player?.college ? 'College' : 'Country'}: {player?.college || player?.country}</p>
          </div>
        </div>
      }
      <div className='stats'>
        <p style={{ fontSize: 14, marginTop: 10 }}>Per Game:</p>
        <div className='ag-theme-quartz-dark' style={{ height: 100 }}>
          <AgGridReact
            rowData={stats}
            columnDefs={colDefs}
          />
        </div>
        <div className='ag-theme-quartz-dark' style={{ height: 100, marginTop: 4 }}>
          <AgGridReact
            rowData={shootingStats}
            columnDefs={shootingColDefs}
          />
        </div>
      </div>
      <div className='stats'>
        <p style={{ fontSize: 14, marginTop: 10 }}>Season Totals:</p>
        <div className='ag-theme-quartz-dark' style={{ height: 100 }}>
          <AgGridReact
            rowData={totalStats}
            columnDefs={colDefs}
          />
        </div>
        <div className='ag-theme-quartz-dark' style={{ height: 100, marginTop: 4 }}>
          <AgGridReact
            rowData={totalShootingStats}
            columnDefs={shootingColDefs}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
