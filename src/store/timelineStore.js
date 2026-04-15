import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTimelineStore = create(
  persist(
    (set) => ({
      timeline: [],

      addEntry: (entry) =>
        set((state) => ({
          timeline: [entry, ...state.timeline],
        })),

      getFilteredTimeline: (filter) => {
        if (filter === 'All') return get().timeline;
        return get().timeline.filter(
          (entry) => entry.type === filter.toLowerCase()
        );
      },
    }),
    {
      name: 'keenkeeper-timeline',
    }
  )
);

export default useTimelineStore;
