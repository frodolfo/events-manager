import create from 'zustand';
import EventsDB from '../db/EventsDB';

const useEventsStore = create((set, get) => ({
  events: EventsDB.events,
  domains: EventsDB.domains,
  subdomains: EventsDB.subdomains,
  owners: EventsDB.owners,
  statuses: EventsDB.statuses,

  addEvent: (newEvent) =>
    set((state) => ({ events: state.events.push(newEvent) })),

  deleteEvent: (eventId) =>
    set((state) => {
      let events = state.events;
      const eventIndex = events.findByIndex((event) => event.id === eventId);
      return { events: state.events.splice(eventIndex, 1) };
    }),

  updateEventStatus: (eventId, newStatus) =>
    set((state) => {
      // TODO: delete this
      console.log(`newStatus: ${newStatus}`);
      let events = state.events;
      console.log(
        `BEFORE state.events[eventId].status: ${state.events[eventId].status}`
      );
      events[eventId].status = newStatus;
      console.log(`AFTER events[eventId].status: ${events[eventId].status}`);
      return { events: events };
    }),
}));

export { useEventsStore };
