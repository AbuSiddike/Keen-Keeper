import { useState } from 'react';
import useTimelineStore from '../store/timelineStore';
import {
  PhoneIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const Timeline = () => {
  const timeline = useTimelineStore((state) => state.timeline);
  const [filter, setFilter] = useState('All');

  const filteredTimeline = timeline.filter(
    (entry) => filter === 'All' || entry.type === filter.toLowerCase()
  );

  const getIcon = (type) => {
    switch (type) {
      case 'call':
        return <PhoneIcon className="w-6 h-6 text-blue-600" />;
      case 'text':
        return <ChatBubbleLeftIcon className="w-6 h-6 text-emerald-600" />;
      case 'video':
        return <VideoCameraIcon className="w-6 h-6 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Timeline</h1>
        <p className="text-gray-600">History of all your interactions</p>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-emerald-500"
        >
          <option value="All">All Interactions</option>
          <option value="Call">Call Only</option>
          <option value="Text">Text Only</option>
          <option value="Video">Video Only</option>
        </select>
      </div>

      {filteredTimeline.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-gray-500 text-lg">No interactions yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Use Quick Check-In on any friend detail page to start logging.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div key={entry.id} className="card p-6 flex gap-5 items-start">
              <div className="mt-1">{getIcon(entry.type)}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-lg">
                  {entry.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
