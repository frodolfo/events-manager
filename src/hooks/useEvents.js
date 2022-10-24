import { useEffect, useState } from 'react';
import { useEventsStore } from '../store/EventsStore';

const useEvents = () => {
  const [events, setEvents] = useState(useEventsStore((state) => state.events));

  useEffect(() => {}, []);

  return [events];
};

export default useEvents;
