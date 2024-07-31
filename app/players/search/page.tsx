'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';

import { getPlayers } from '../../service';


const Search = () => {
  const [playerSearchString, setPlayerSearchString] = useState<string>('');
  const [players, setPlayers] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState<any[]>([
    { field: ' ', flex: 1 },
    { field: 'Name', flex: 3 },
    { field: 'Team', flex: 3 },
    { field: '#', flex: 1 },
    { field: 'Pos', flex: 1 },
    { field: 'Ht', flex: 1 },
    { field: 'Wt', flex: 1 },
    { field: 'College', flex: 3 },
    { field: 'Draft', flex: 1 },
  ]);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPlayerSearchString(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      searchPlayers();
    }
  };

  const searchPlayers = async () => {
    const playerSearch = await getPlayers(playerSearchString);
    const reducedPlayers = playerSearch
      .sort(player => player.draft_year)
      .map(player => (
      {
        ' ': player.id,
        'Name': player.first_name + ' ' + player.last_name,
        'Team': player.team.full_name,
        '#': player.jersey_number,
        'Pos': player.position,
        'Ht': player.height,
        'Wt': player.weight,
        'College': player.college || player.country,
        'Draft': player.draft_year,
      }
    ));
    setPlayers(reducedPlayers);
  };

  return (
    <div className='search'>
      <div className='search-bar'>
        <input className='search-input' type='text' placeholder='Search Player' onChange={handleChange} onKeyDown={handleKeyDown} value={playerSearchString}/>
        <button className='search-button' onClick={() => searchPlayers()} disabled={!playerSearchString}>Search</button>
      </div>
      <div className='search-results'>
        <div className='ag-theme-quartz-dark' style={{ height: 500 }}>
          <AgGridReact
            rowData={players}
            columnDefs={colDefs}
            onRowClicked={(e) => router.push(`/players/${e.data[' ']}`)}
          />
        </div>
      </div>
    </div>
  )
};

export default Search;