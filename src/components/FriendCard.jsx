import { Link } from 'react-router-dom';

const FriendCard = ({ friend }) => {
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
    <Link
      to={`/friend/${friend.id}`}
      className="card group block overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        {/* Profile Data */}
        <div className="flex justify-center mb-5">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-900 mb-1">
          {friend.name}
        </h3>

        <p className="text-center text-sm text-gray-500 mb-6">
          {friend.days_since_contact}d ago
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {friend.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-2xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <span
            className={`px-6 py-1.5 text-sm font-semibold rounded-3xl ${getStatusBadge(friend.status)}`}
          >
            {getStatusText(friend.status)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;
