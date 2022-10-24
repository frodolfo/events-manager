const EventsDB = {
  events: [
    {
      id: 1,
      description: 'Blown beaker needs replacement',
      domain_id: 1,
      subdomain_id: 1,
      owners: [1, 2],
      status: 1,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      description: 'Wire needs replacement',
      domain_id: 1,
      subdomain_id: 2,
      owners: [4, 6],
      status: 2,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 3,
      description: 'Replace insulation',
      domain_id: 1,
      subdomain_id: 3,
      owners: [7, 3],
      status: 1,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 4,
      description: 'Upgrade Dashboard Software',
      domain_id: 3,
      subdomain_id: 7,
      owners: [2, 4, 6],
      status: 2,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 5,
      description: 'Upgrade Dashboard Software',
      domain_id: 3,
      subdomain_id: 7,
      owners: [1, 3, 5],
      status: 2,
      createdAt: '',
      updatedAt: '',
    },
  ],
  domains: [
    {
      id: 1,
      name: 'Electrical',
    },
    {
      id: 2,
      name: 'Mechanical',
    },
    {
      id: 3,
      name: 'Software',
    },
  ],
  subdomains: [
    {
      id: 1,
      name: 'Blown Beaker',
      domain_id: 1,
    },
    {
      id: 2,
      name: 'Damaged Wire',
      domain_id: 1,
    },
    {
      id: 3,
      name: 'Water Damange',
      domain_id: 1,
    },
    {
      id: 4,
      name: 'Crank Damage',
      domain_id: 2,
    },
    {
      id: 5,
      name: 'Belt Damage',
      domain_is: 2,
    },
    {
      id: 6,
      name: 'Application Crash',
      domain_id: 3,
    },
    {
      id: 6,
      name: 'Driver Update',
      domain_id: 3,
    },
    {
      id: 7,
      name: 'Upgrade installation',
      domain_id: 3,
    },
    {
      id: 8,
      name: 'Hotfix Patch',
      domain_id: 3,
    },
  ],
  owners: [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Eric Munoz',
    },
    {
      id: 3,
      name: 'Maria Guevara',
    },
    {
      id: 4,
      name: 'Richard Blackburn',
    },
    {
      id: 5,
      name: 'Mario Gomez',
    },
    {
      id: 6,
      name: 'Jeff Sato',
    },
    {
      id: 7,
      name: 'Dan Nguyen',
    },
  ],
  statuses: [
    {
      id: 1,
      name: 'Ongoing',
    },
    {
      id: 2,
      name: 'Completed',
    },
  ],
};

export default EventsDB;
