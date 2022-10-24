import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { EventDialog } from './EventDialog';
import FilterSelect from './shared/FilterSelect';

import EventsAPI from '../api/EventsAPI';
import { useEventsStore } from '../store/EventsStore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '1rem 1.4rem 0rem',
}));

export const EventsTable = () => {
  const allEvents = useEventsStore((state) => state.events);
  const allDomains = useEventsStore((state) => state.domains);
  const allSubdomains = useEventsStore((state) => state.subdomains);
  const allOwners = useEventsStore((state) => state.owners);
  const allStatuses = useEventsStore((state) => state.statuses);
  const updateEventStatus = useEventsStore((state) => state.updateEventStatus);
  // const getDomainById = useEventsStore((state) => state.getDomainById);

  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(0);
  const [selectedSubdomainId, setSelectedSubdomainId] = useState(0);
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredSubdomains, setFilteredSubdomains] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const getDomainById = useEventsStore((state) => state.getDomainById);
  // const getSubdomainById = useEventsStore((state) => state.getSubdomainById);

  useEffect(() => {
    if (allEvents.length > 0) {
      // Get all available domains
      let eventsWithDomains = allEvents.filter(
        (event) => event.domain_id !== null && event.domain_id !== undefined
      );

      let currentDomains = new Set();
      eventsWithDomains.forEach((event) => {
        // TODO: delete this
        // console.log(`event.domain_id: ${event.domain_id}`);
        // console.log(
        //   `getDomainById(event.domain_id): ${getDomainById(event.domain_id)}`
        // );
        // console.log(
        //   `getDomainById(event.domain_id): ${getDomainById(event.domain_id)}`
        // );
        currentDomains.add(
          EventsAPI.getDomainById(allDomains, event.domain_id)
          // getDomainById(event.domain_id)
        );
      });

      setDomains([...currentDomains]);
      // Get all available subdomains
      let currentSubdomains = new Set();
      allEvents.forEach((event) => {
        currentSubdomains.add(
          EventsAPI.getSubdomainById(allSubdomains, event.subdomain_id)
        );
      });
      setSubdomains([...currentSubdomains]);

      let currentOwners = new Set();
      allEvents.forEach((event) => {
        event.owners.forEach((owner) => {
          currentOwners.add(EventsAPI.getOwnerById(allOwners, owner));
        });
      });

      let currentStatuses = new Set();
      allEvents.forEach((event) => {
        currentStatuses.add(EventsAPI.getStatusById(allStatuses, event.status));
      });

      // setFilteredEvents([...EventsDB.events]);
      setFilteredEvents([...allEvents]);
      setFilteredSubdomains([...currentSubdomains]);
      setFilteredOwners([...currentOwners]);
      setFilteredStatuses([...currentStatuses]);
    }
  }, [allEvents, allDomains, allSubdomains, allOwners, allStatuses]);

  const changeDomain = (domainId) => {
    // let newDomains = domains.filter((domain) => domain.id === domainId);
    // setDomains([...newDomains]);
    // TODO: delete this
    console.log(`domainId: ${domainId}`);
    setSelectedDomainId(domainId);
    filterEvents('domain', domainId);
    filterSubdomains(domainId);
  };

  const changeSubdomain = (subdomainId) => {
    // TODO: delete this
    console.log(`subdomainId: ${subdomainId}`);
    setSelectedSubdomainId(subdomainId);
    filterEvents('subdomain', subdomainId);
  };

  const changeOwner = (ownerId) => {
    // TODO: delete this
    console.log(`ownerId: ${ownerId}`);
    setSelectedOwnerId(ownerId);
    filterEvents('owner', ownerId);
  };

  const changeStatus = (status) => {
    // TODO: delete this
    console.log(`status: ${status}`);
    setSelectedStatus(status);
    filterEvents('status', status);
  };

  const filterEvents = (filterType, id) => {
    let newEvents;

    if (!filterType) return;

    switch (filterType.toUpperCase()) {
      case 'DOMAIN':
        // TODO: delete This
        console.log(`domain id: ${id}`);

        if (id === 0) {
          newEvents = [...allEvents];
        } else {
          newEvents = allEvents.filter((event) => event.domain_id === id);
        }
        setFilteredEvents([...newEvents]);
        break;

      case 'SUBDOMAIN':
        // TODO: delete This
        console.log(`subdomain id: ${id}`);

        if (id === 0) {
          if (selectedDomainId === 0) {
            newEvents = [...allEvents];
          } else {
            newEvents = allEvents.filter(
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
        // TODO: delete This
        console.log(`owner id: ${id}`);

        if (id === 0) {
          newEvents = [...allEvents];
        } else {
          newEvents = allEvents.filter((event) => event.owners.includes(id));
        }
        setFilteredEvents([...newEvents]);
        break;

      case 'STATUS':
        // TODO: delete This
        console.log(`status id: ${id}`);

        if (id === 0) {
          newEvents = [...allEvents];
        } else {
          newEvents = allEvents.filter((event) => event.status === id);
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
      newSubdomains = [...domains];
    } else {
      newSubdomains = filteredSubdomains.filter(
        (subdomain) => subdomain.domain_id === domainId
      );
    }
    setFilteredSubdomains([...newSubdomains]);
  };

  const handleCompleteClick = (e) => {
    let eventId = e?.target?.dataset?.id;
    updateEventStatus(eventId, 2);
  };

  return (
    <Box sx={{ width: 'calc(100vw - 40px)' }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <StyledButton variant="contained" size="medium" onClick={handleOpen}>
          New Event
        </StyledButton>
      </Stack>
      <TableContainer component={Paper} sx={{ padding: '20px' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="events table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ maxWidth: '80px' }}>
                Report Date
              </StyledTableCell>
              <StyledTableCell
                component="th"
                align="left"
                style={{ maxWidth: '240px' }}
              >
                Description
              </StyledTableCell>
              <StyledTableCell align="left" style={{ maxWidth: '150px' }}>
                <FilterSelect
                  selectLabel={'Domain'}
                  values={domains}
                  selectChangeHandler={changeDomain}
                />
              </StyledTableCell>
              <StyledTableCell align="left" style={{ maxWidth: '150px' }}>
                <FilterSelect
                  selectLabel={'Subdomain'}
                  values={filteredSubdomains}
                  selectChangeHandler={changeSubdomain}
                />
              </StyledTableCell>
              <StyledTableCell align="left" style={{ maxWidth: '60px' }}>
                <FilterSelect
                  selectLabel={'Owners'}
                  values={filteredOwners}
                  selectChangeHandler={changeOwner}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <FilterSelect
                  selectLabel={'Status'}
                  values={filteredStatuses}
                  selectChangeHandler={changeStatus}
                />
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <StyledTableRow
                key={event.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="td" scope="row" align="center">
                  {event.createdAt}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ maxWidth: '80px' }}>
                  {event.description}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ maxWidth: '80px' }}>
                  {EventsAPI.getDomainById(allDomains, event.domain_id).name}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ maxWidth: '80px' }}>
                  {
                    EventsAPI.getSubdomainById(
                      allSubdomains,
                      event.subdomain_id
                    ).name
                  }
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ul>
                    {EventsAPI.getOwners(allOwners, event.owners).map(
                      (owner, ownerIndex) => (
                        <li key={ownerIndex}>{owner.name}</li>
                      )
                    )}
                  </ul>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {EventsAPI.getStatusById(allStatuses, event.status).name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {event.status === 1 ? (
                    <Button
                      variant="outlined"
                      size="small"
                      data-id={event.id}
                      onClick={handleCompleteClick}
                    >
                      Complete
                    </Button>
                  ) : (
                    'Done'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EventDialog
        dialogOpen={open}
        filteredSubdomains={filteredSubdomains}
        changeDomain={changeDomain}
        changeSubdomain={changeSubdomain}
        handleClose={handleClose}
        eventsStore={useEventsStore}
      />
    </Box>
  );
};
