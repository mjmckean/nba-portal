import Link from 'next/link';

const Home = () => {
  return (
    <div className="entry">
      <Link href="/players/search">Search Player</Link>
      <Link href="/teams">Teams</Link>
    </div>
  );
};

export default Home;
