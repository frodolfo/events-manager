const getOwners = (allOwners, idArray) => {
  const owners = [];
  let owner;

  if (!owners) return null;

  if (Array.isArray(idArray) && idArray.length > 0) {
    for (const ownerId of idArray) {
      owner = allOwners.find((owner) => owner.id === ownerId);
      owner && owners.push(owner);
    }
  }
  return owners;
};

const getSubdomainsByDomainId = (subdomains, id) => {
  if (!id || !subdomains) return [];

  return subdomains.filter((subdomain) => subdomain.domain_id === id);
};

const getDomainById = (domains, id) => {
  if (!domains || !id) return null;

  return domains.find((domain) => domain.id === id);
};

const getSubdomainById = (subdomains, id) => {
  if (!subdomains || !id) return null;

  return subdomains.find((subdomain) => subdomain.id === id);
};

const getOwnerById = (owners, id) => {
  if (!owners || !id) return null;

  return owners.find((owner) => owner.id === id);
};

const getStatusById = (statuses, statusId) => {
  if (!statuses || !statusId) return null;

  return statuses.find((status) => status.id === statusId);
};

const EventsAPI = {
  getOwners,
  getSubdomainsByDomainId,
  getDomainById,
  getSubdomainById,
  getOwnerById,
  getStatusById,
};

export default EventsAPI;
