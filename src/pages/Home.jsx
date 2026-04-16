import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import FriendCard from '../components/FriendCard';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/friends.json')
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load friends:', err);
        setLoading(false);
      });
  }, []);

  // Calculate summary stats
  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === 'on-track').length;
  const needAttention = friends.filter(
    (f) => f.status === 'overdue' || f.status === 'almost due'
  ).length;
  const interactionsThisMonth = 12;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-gray-800">
            Loading your friends...
          </h3>
          <p className="mt-3 text-gray-500 max-w-xs mx-auto">
            Preparing your personal connection dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Banner */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-medium flex items-center gap-3 mx-auto transition-all active:scale-95 shadow-sm">
          <UserPlusIcon className="w-5 h-5" />
          Add a Friend
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="card p-6 text-center">
          <div className="text-4xl font-semibold text-gray-900 mb-1">
            {totalFriends}
          </div>
          <div className="text-sm text-gray-500">Total Friends</div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-4xl font-semibold text-emerald-600 mb-1">
            {onTrack}
          </div>
          <div className="text-sm text-gray-500">On Track</div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-4xl font-semibold text-red-600 mb-1">
            {needAttention}
          </div>
          <div className="text-sm text-gray-500">Need Attention</div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-4xl font-semibold text-gray-900 mb-1">
            {interactionsThisMonth}
          </div>
          <div className="text-sm text-gray-500">Interactions This Month</div>
        </div>
      </div>

      {/* Friends Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Your Friends</h2>
          <p className="text-sm text-gray-500">{friends.length} friends</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
