import { Link } from 'react-router-dom';

const FriendCard = ({ friend }) => {
  const statusColor = {
    overdue: 'status-overdue',
    'almost due': 'status-almost',
    'on-track': 'status-ontrack',
  };

  const statusText = {
    overdue: 'Overdue',
    'almost due': 'Almost Due',
    'on-track': 'On Track',
  };

  return (
    <Link
      to={`/friend/${friend.id}`}
      className="card group block overflow-hidden"
    >
      <div className="p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-5">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:ring-emerald-100 transition-all"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-4 line-clamp-1">
          {friend.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {friend.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex justify-center">
          <span
            className={`px-5 py-1.5 text-sm font-medium rounded-2xl ${statusColor[friend.status]}`}
          >
            {statusText[friend.status]}
          </span>
        </div>
      </div>

      {/* Days Since Contact */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-center">
        <div className="text-xs text-gray-500">Last Contact</div>
        <div className="text-lg font-semibold text-gray-900">
          {friend.days_since_contact} days ago
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;
