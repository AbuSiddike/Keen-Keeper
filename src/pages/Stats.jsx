import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useTimelineStore from '../store/timelineStore';

const Stats = () => {
  const timeline = useTimelineStore((state) => state.timeline);

  const interactionCounts = useMemo(() => {
    const counts = { Call: 0, Text: 0, Video: 0 };

    timeline.forEach((entry) => {
      const type = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);
      if (counts[type] !== undefined) counts[type]++;
    });

    return [
      { name: 'Call', value: counts.Call, color: '#3b82f6' },
      { name: 'Text', value: counts.Text, color: '#10b981' },
      { name: 'Video', value: counts.Video, color: '#8b5cf6' },
    ];
  }, [timeline]);

  const totalInteractions = interactionCounts.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          Friendship Analytics
        </h1>
        <p className="text-gray-600">Understand your interaction patterns</p>
      </div>

      <div className="card p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Chart Container */}
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-[320px] sm:max-w-[380px] aspect-square">
              {' '}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interactionCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="85%"
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {interactionCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ paddingTop: '25px', fontSize: '14px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex-1 w-full space-y-8 pt-4 lg:pt-0">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
                By Interaction Type
              </h3>

              <div className="space-y-6">
                {interactionCounts.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-lg">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-semibold text-gray-900">
                        {item.value}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">times</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                {totalInteractions}
              </div>
              <p className="text-gray-500">Total Interactions Logged</p>
            </div>
          </div>
        </div>
      </div>

      {totalInteractions === 0 && (
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg">No interactions logged yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Use Quick Check-In on any friend’s detail page to see the chart.
          </p>
        </div>
      )}
    </div>
  );
};

export default Stats;
