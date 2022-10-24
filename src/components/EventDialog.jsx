import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// import EventsAPI from '../api/EventsAPI';
// import EventsDB from '../db/EventsDB';
import FilterSelect from './shared/FilterSelect';
import MultipleSelect from './shared/MultiSelect';

export const EventDialog = ({
  dialogOpen,
  filteredSubdomains,
  changeDomain,
  changeSubdomain,
  handleClose,
  eventsStore,
}) => {
  const [domain, setDomain] = useState(0);
  const [subdomain, setSubdomain] = useState(0);
  const [eventOwners, setEventOwners] = useState([]);
  const [description, setDescription] = useState('');

  const domains = eventsStore((state) => state.domains);
  //   const subdomains = eventsStore((state) => state.subdomains);
  const owners = eventsStore((state) => state.owners);
  const addEvent = eventsStore((state) => state.addEvent);

  const onDomainChange = (domainId) => {
    setDomain(domainId);
    changeDomain(domainId);
  };

  const onSubdomainChange = (subdomainId) => {
    setSubdomain(subdomainId);
    changeSubdomain(subdomainId);
  };

  const onOwnerChange = (owners) => {
    setEventOwners([...owners]);
  };

  const onTextChange = (event) => {
    const val = event?.target?.value;
    setDescription(val);
  };

  const submitForm = () => {
    addEvent({
      description,
      domain_id: domain,
      subdomain_id: subdomain,
      eventOwners,
    });
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
