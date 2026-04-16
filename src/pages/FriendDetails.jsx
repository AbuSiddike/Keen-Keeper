import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useTimelineStore from '../store/timelineStore';
import {
  PhoneIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
  ClockIcon,
  TrashIcon,
  ArchiveBoxIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeline = useTimelineStore((state) => state.timeline);
  const addEntry = useTimelineStore((state) => state.addEntry);

  const friendInteractions = timeline
    .filter((entry) => entry.friendId === parseInt(id))
    .slice(0, 5);

  useEffect(() => {
    fetch('/data/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => f.id === parseInt(id));
        if (foundFriend) {
          setFriend(foundFriend);
        } else {
          navigate('/404');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleQuickCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type: type.toLowerCase(),
      title: `${type} with ${friend.name}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      friendId: parseInt(id),
      friendName: friend.name,
    };

    addEntry(newEntry);

    toast.success(`${type} with ${friend.name} logged!`, {
      icon: type === 'Call' ? '📞' : type === 'Text' ? '💬' : '🎥',
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading friend details...</p>
        </div>
      </div>
    );
  }

  if (!friend) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-500 text-white';
      case 'almost due':
        return 'bg-amber-500 text-white';
      case 'on-track':
        return 'bg-emerald-700 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'overdue':
        return 'Overdue';
      case 'almost due':
        return 'Almost Due';
      case 'on-track':
        return 'On-Track';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-5">
          <div className="card p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-32 h-32 rounded-3xl object-cover shadow-lg mb-6"
              />
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                {friend.name}
              </h1>

              <span
                className={`px-7 py-2 text-sm font-semibold rounded-3xl ${getStatusBadge(friend.status)}`}
              >
                {getStatusText(friend.status)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {friend.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-2xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Bio</p>
                <p className="text-gray-700 leading-relaxed">{friend.bio}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-800">{friend.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 space-y-3">
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3.5 rounded-2xl font-medium transition-colors">
                <ClockIcon className="w-5 h-5" /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3.5 rounded-2xl font-medium transition-colors">
                <ArchiveBoxIcon className="w-5 h-5" /> Archive
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this friend?')) {
                    toast.error('Friend deleted (demo)');
                    navigate('/');
                  }
                }}
                className="w-full flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 py-3.5 rounded-2xl font-medium transition-colors"
              >
                <TrashIcon className="w-5 h-5" /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-4xl font-semibold text-gray-900">
                {friend.days_since_contact}
              </div>
              <div className="text-sm text-gray-500">Days Since Contact</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-semibold text-emerald-600">
                {friend.goal}
              </div>
              <div className="text-sm text-gray-500">Goal (Days)</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-xl font-semibold text-gray-900">
                {friend.next_due_date}
              </div>
              <div className="text-sm text-gray-500">Next Due Date</div>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="card p-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl mb-1">
                  Relationship Goal
                </h3>
                <p className="text-gray-600">
                  Connect every{' '}
                  <span className="font-semibold text-emerald-600">
                    {friend.goal} days
                  </span>
                </p>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm">
                <PencilIcon className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Call', 'Text', 'Video'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleQuickCheckIn(type)}
                  className="flex flex-col items-center gap-3 py-8 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-3xl transition-all active:scale-95"
                >
                  {type === 'Call' && (
                    <PhoneIcon className="w-10 h-10 text-emerald-600" />
                  )}
                  {type === 'Text' && (
                    <ChatBubbleLeftIcon className="w-10 h-10 text-emerald-600" />
                  )}
                  {type === 'Video' && (
                    <VideoCameraIcon className="w-10 h-10 text-emerald-600" />
                  )}
                  <span className="font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Interactions */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl">Recent Interactions</h3>
              <button
                onClick={() => navigate('/timeline')}
                className="text-emerald-600 hover:underline text-sm"
              >
                Full History →
              </button>
            </div>

            {friendInteractions.length > 0 ? (
              <div className="space-y-4">
                {friendInteractions.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex gap-4 py-3 border-b last:border-none"
                  >
                    <div className="text-2xl mt-0.5">
                      {entry.type === 'call'
                        ? '📞'
                        : entry.type === 'text'
                          ? '💬'
                          : '🎥'}
                    </div>
                    <div>
                      <p className="font-medium">{entry.title}</p>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-12 text-center">
                No interactions logged yet with {friend.name}.<br />
                Use the Quick Check-In buttons above.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
