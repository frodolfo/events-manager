import create from 'zustand';
import moment from 'moment';
import EventsDB from '../db/EventsDB';

const useEventsStore = create((set, get) => ({
  events: EventsDB.events,
  domains: EventsDB.domains,
  subdomains: EventsDB.subdomains,
  owners: EventsDB.owners,
  statuses: EventsDB.statuses,

  addEvent: (newEvent) =>
    set((state) => {
      let events = state.events;
      events.push(newEvent);
      return { events: [...events] };
    }),

  deleteEvent: (eventId) =>
    set((state) => {
      let events = state.events;
      const eventIndex = events.findIndex((event) => event.id === eventId);
      events.splice(eventIndex, 1);
      return { events: [...events] };
    }),

  updateEventStatus: (eventId, newStatus) =>
    set((state) => {
      let events = state.events;
      let eventIndex = events.findIndex((event) => event.id === eventId);

      events[eventIndex].status = newStatus;
      events[eventIndex].updatedAt = moment();

      return { events: [...events] };
    }),
}));

export { useEventsStore };
