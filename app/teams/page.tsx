'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getTeams } from '../service';
import { Team } from '../types';


const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const teams = await getTeams();
    setTeams(teams.filter(team => team.division !== ''));
  };

  return (
    <div className='teams'>
      {
        teams && teams.map(team => (
          <Link key={team.id} className='team' href={`/teams/${team.id}`}>
            <Image
              src={`/logos/${team.abbreviation.toLowerCase()}.svg`}
              width={80}
              height={80}
              alt={`${team.abbreviation} Logo`}
            />
            <div>
              {team.full_name}
            </div>
          </Link>
        ))
      }
    </div>
  )
};

export default Teams;