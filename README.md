

# Tollguru


## API Reference

-Use Tollguru APi 

## Demo

https://illustrious-klepon-fc3816.netlify.app/


## Deployment

To deploy this project run

```bash
  npm run build
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_API_KEY`



## Documentation



## Features


User Education 
Implement a feature that educates users on how toll calculations are performed.
Create an interactive guide or tooltip system within the application to explain the factors affecting toll costs.
Route Visualization
Implement route visualization using React-Leaflet.
Display the calculated route by sending a polyline to the TollGuru API (using only Route Encoded Polyline) [Note*: Using any endpoint other than the one mentioned will result in the cancellation of the submission].
Integrate markers along the route with details of toll information.

Polyline Decoding 
Utilize the @googlemaps/polyline-codec library to decode polylines received from the TollGuru API.
Ensure accurate decoding for route visualization.

Toll Details Display 
Integrate toll details on the markers along the route.
Display relevant toll information, such as cost and additional details.


## Feedback

If you have any feedback, please reach out to us at sd769113@gmail.com


## Installation



```bash
- Clone the repositroy.
- Go to the project directory in the terminal & install the required dependencies by using:
- npm install
- npm start


Note - use cors origin extension 

```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```



## Tech Stack

**Client:** React,,Chakra UI,TollguruAPI


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

