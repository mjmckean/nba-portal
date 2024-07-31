'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';

import { getPlayers } from '../../service';
import { Team } from '../../types';


const TeamInfo = ({ params }: { params: { id: number } }) => {
  const [roster, setRoster] = useState<any[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
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

  useEffect(() => {
    loadRoster();
  }, []);

  const router = useRouter();
  
  const loadRoster = async () => {
    const players = await getPlayers(undefined, [params.id]);

    const firstPlayer = players[0];
    firstPlayer && setTeam(firstPlayer.team);

    const reducedPlayers = players
      .sort((a, b) => a.last_name.localeCompare(b.last_name))
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
    setRoster(reducedPlayers);
  };

  return (
    <div>
      <div className='team-info'>
        <Image
          src={`/logos/${team?.abbreviation.toLowerCase()}.svg`}
          width={80}
          height={80}
          alt={`${team ? team?.abbreviation : 'Missing'} Logo`}
        />
        {
          team && <div>
            <p className='team-info-name'>{team?.full_name}</p>
            <p className='team-info-conference'>{team?.conference}ern Conference</p>
            <p className='team-info-division'>{team?.division} Division</p>
          </div>
        }
      </div>
      <div className='roster'>
        <div className='ag-theme-quartz-dark' style={{ height: 500, marginTop: 10 }}>
          <AgGridReact
            rowData={roster}
            columnDefs={colDefs}
            onRowClicked={(e) => router.push(`/players/${e.data[' ']}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
