# Events Manager

This is a client-only application that uses a JSON file (`EventsDB.js`) as the data source.  The list of events, domains, subdomains, owners and statuses are defined in this file.   There are no dependencies on any external API or backend component.  The listing of events are sorted by status followed by the recency of the events.  You can filter the listing by domain name, subdomain name, owner or status by clicking on the corresponding header name and selecting an option from the dropdown.  Events with the `Ongoing` status are giving the highest priority on the list.  You can create new events by clicking on the `New Event` button located in the top left corner of the main interface.  

## Technologies utilized

This application uses the following libraries/frameworks

- [ReactJS](https://reactjs.org/) (UI component library)
- [momentJS](https://momentjs.com/) (date/time library)
- [MUI for React](https://mui.com/) (CSS framework)
- [Zustand](https://github.com/pmndrs/zustand) (application state manager)

## Prerequisits

- [NodeJS](https://nodejs.org/en/) (version 14 and up)
- Web browser (Chrome, Firefox, Safari, Edge)
- Terminal, bash-shell or powershell
- Basic knowledge of command-line interfaces/shells

  
## installation

To install this web application, simply follow these steps:

1. Unzip the file `events-manager.zip` to your local hard drive
2. Open a terminal/shell/cli window
3. Change directory (cd) to `events-manager` 
4. Run `npm i` to begin installing required NodeJS packages.

## Launch the Application

To run the application in a web browser, simply open a terminal/shell/cli and follow these steps:

* If you're continuing from the installation steps, type `npm run start`.  Otherwise, execute the commands below.

- Open a terminal/shell/cli window
- Change directory to the location where the application was unzipped
- Run `npm start` to launch the Events Manager Application
- Open the URL `http://localhost:3000` in a web browser


## Questions?

Contact Fred at [fred.rodolfo@gmail.com](mailto:fred.rodolfo@gmail.com)


### Project Repository

[Events Manager](https://github.com/frodolfo/events-manager)

