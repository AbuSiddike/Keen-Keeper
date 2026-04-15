import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useTimelineStore from '../store/timelineStore';
import {
  PhoneIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import {
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
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('/src/data/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        if (found) {
          setFriend(found);
        } else {
          navigate('/404');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, navigate]);

  const addEntry = useTimelineStore((state) => state.addEntry);

  const handleQuickCheckIn = (type) => {
    const actionTitle = `${type} with ${friend.name}`;

    const newEntry = {
      id: Date.now(),
      type: type.toLowerCase(),
      title: actionTitle,
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
      duration: 2500,
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading friend details...</p>
        </div>
      </div>
    );
  }

  if (!friend) return null;

  const statusColor = {
    overdue: 'bg-red-100 text-red-700',
    'almost due': 'bg-yellow-100 text-yellow-700',
    'on-track': 'bg-green-100 text-green-700',
  };

  const statusText = {
    overdue: 'Overdue',
    'almost due': 'Almost Due',
    'on-track': 'On Track',
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
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {friend.name}
              </h1>

              <span
                className={`px-6 py-2 text-sm font-medium rounded-2xl ${statusColor[friend.status]}`}
              >
                {statusText[friend.status]}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {friend.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
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
              <div className="text-4xl font-semibold text-gray-900 mb-2">
                {friend.days_since_contact}
              </div>
              <div className="text-sm text-gray-500">Days Since Contact</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-semibold text-emerald-600 mb-2">
                {friend.goal}
              </div>
              <div className="text-sm text-gray-500">Goal (Days)</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {friend.next_due_date}
              </div>
              <div className="text-sm text-gray-500">Next Due Date</div>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="card p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Relationship Goal
                </h3>
                <p className="text-gray-600">
                  Connect every{' '}
                  <span className="font-semibold text-emerald-600">
                    {friend.goal} days
                  </span>
                </p>
              </div>
              <button className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-6">Quick Check-In</h3>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleQuickCheckIn('Call')}
                className="flex flex-col items-center gap-3 py-8 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all active:scale-95"
              >
                <PhoneIcon className="w-10 h-10 text-emerald-600" />
                <span className="font-medium">Call</span>
              </button>

              <button
                onClick={() => handleQuickCheckIn('Text')}
                className="flex flex-col items-center gap-3 py-8 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all active:scale-95"
              >
                <ChatBubbleLeftIcon className="w-10 h-10 text-emerald-600" />
                <span className="font-medium">Text</span>
              </button>

              <button
                onClick={() => handleQuickCheckIn('Video')}
                className="flex flex-col items-center gap-3 py-8 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all active:scale-95"
              >
                <VideoCameraIcon className="w-10 h-10 text-emerald-600" />
                <span className="font-medium">Video</span>
              </button>
            </div>
          </div>

          {/* Recent Interactions (local for this page) */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl">Recent Interactions</h3>
              <button className="text-sm text-emerald-600 hover:underline">
                Full History →
              </button>
            </div>

            {timeline.length > 0 ? (
              <div className="space-y-4">
                {timeline.slice(0, 4).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-none"
                  >
                    <div className="text-2xl">
                      {entry.type === 'call'
                        ? '📞'
                        : entry.type === 'text'
                          ? '💬'
                          : '🎥'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{entry.title}</p>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-8 text-center">
                No recent interactions yet. Use Quick Check-In above.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
