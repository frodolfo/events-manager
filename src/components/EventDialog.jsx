import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import FilterSelect from './shared/FilterSelect';
import MultipleSelect from './shared/MultiSelect';

export const EventDialog = ({ dialogOpen, handleClose, eventsStore }) => {
  const events = eventsStore((state) => state.events);
  const domains = eventsStore((state) => state.domains);
  const subdomains = eventsStore((state) => state.subdomains);
  const owners = eventsStore((state) => state.owners);
  const addEvent = eventsStore((state) => state.addEvent);

  const [domain, setDomain] = useState(0);
  const [subdomain, setSubdomain] = useState(0);
  const [filteredSubdomains, setFilteredSubdomains] = useState([]);
  const [eventOwners, setEventOwners] = useState([]);
  const [description, setDescription] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  const filterEvents = (filterType, id) => {
    let newEvents;

    if (!filterType) return;

    switch (filterType.toUpperCase()) {
      case 'DOMAIN':
        if (id === 0) {
          newEvents = [...events];
        } else {
          newEvents = events.filter((event) => event.domain_id === id);
        }
        setFilteredEvents([...newEvents]);
        break;

      case 'SUBDOMAIN':
        if (id === 0) {
          if (selectedDomainId === 0) {
            newEvents = [...events];
          } else {
            newEvents = events.filter(
              (event) => event.domain_id === selectedDomainId
            );
          }
        } else {
          newEvents = filteredEvents.filter(
            (event) => event.subdomain_id === id
          );
        }
        setFilteredEvents([...newEvents]);
        break;

      case 'OWNER':
        if (id === 0) {
          newEvents = [...events];
        } else {
          newEvents = events.filter((event) => event.owners.includes(id));
        }
        setFilteredEvents([...newEvents]);
        break;

      case 'STATUS':
        if (id === 0) {
          newEvents = [...events];
        } else {
          newEvents = events.filter((event) => event.status === id);
        }
        setFilteredEvents([...newEvents]);
        break;

      default:
    }

    setFilteredEvents([...newEvents]);
  };

  const filterSubdomains = (domainId) => {
    let newSubdomains;

    if (domainId === 0) {
      newSubdomains = [...subdomains];
    } else {
      newSubdomains = subdomains.filter(
        (subdomain) => subdomain.domain_id === domainId
      );
    }
    setFilteredSubdomains([...newSubdomains]);
  };

  const onDomainChange = (domainId) => {
    setDomain(domainId);
    setSelectedDomainId(domainId);
    console.log(`domainId: ${domainId}`);
    filterEvents('domain', domainId);
    filterSubdomains(domainId);
  };

  const onSubdomainChange = (subdomainId) => {
    setSubdomain(subdomainId);
    console.log(`subdomainId: ${subdomainId}`);
    // setSelectedSubdomainId(subdomainId);
    filterEvents('subdomain', subdomainId);
  };

  const onOwnerChange = (owners) => {
    setEventOwners([...owners]);
  };

  const onTextChange = (event) => {
    const val = event?.target?.value;
    setDescription(val);
  };

  const submitForm = () => {
    const newEvent = {
      id: uuidv4(),
      description: description,
      domain_id: domain,
      subdomain_id: subdomain,
      owners: [...eventOwners],
      status: 1,
      createdAt: moment(),
      updatedAt: moment(),
    };

    addEvent(newEvent);
    handleClose();
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingBottom: '30px' }}>
          Fill in all the necessary fields below
        </DialogContentText>
        <FilterSelect
          selectLabel={'Domain'}
          values={domains}
          selectChangeHandler={onDomainChange}
          defaultTheme={true}
        />
        <FilterSelect
          selectLabel={'Subdomain'}
          values={filteredSubdomains}
          selectChangeHandler={onSubdomainChange}
          defaultTheme={true}
        />
        <MultipleSelect
          label={'Owners'}
          values={owners}
          selectChangeHandler={onOwnerChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={onTextChange}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: '5px', marginRight: '15px' }}>
        <Button variant="outlined" size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={submitForm}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
