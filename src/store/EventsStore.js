import create from 'zustand';
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
      // TODO: deleete this
      console.log(`newEvent: ${JSON.stringify(newEvent)}`);
      console.log(`BEFORE PUSH events: ${JSON.stringify(events)}`);
      events.push(newEvent);
      console.log(`AFTER PUSH events: ${JSON.stringify(events)}`);
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
      let eventIndex = events.findIndex(
        (event) => event.status === parseInt(eventId)
      );
      events[eventIndex].status = newStatus;
      return { events: [...events] };
    }),
}));

export { useEventsStore };
