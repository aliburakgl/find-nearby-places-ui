import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Places() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[longitude,setlongitude]=useState('')
    const[latitude,setlatitude]=useState('')
    const[radius,setradius]=useState('')
    const[place,setPlace]=useState([])
    const[markers,setMarkers]=useState([])
     const classes = useStyles();
     const handleSetMarkers = (places) => {
      const markers = places.map((result, index) => `markers=color:red%7Clabel:${result.name}%7C${result.geometry.location.lat},${result.geometry.location.lng}`).join('&');
      return markers;
    }
    
    const handleClick = (e) => {
      e.preventDefault();
      const places = { longitude, latitude, radius };
      console.log(places);
    
      const queryParams = new URLSearchParams({
        longitude: places.longitude,
        latitude: places.latitude,
        radius: places.radius
      });
    
      fetch(`http://localhost:8070/api/places/get?${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.json())
      .then(data => {
        setPlace(data.results);
        console.log(data);
        const markers = handleSetMarkers(data.results);
        setMarkers(markers);
        console.log(markers);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}><u>FIND NEARBY PLACES</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Longitude" variant="outlined" fullWidth 
      value={longitude}
      onChange={(e)=>setlongitude(e.target.value)}
      />
      <TextField id="outlined-basic" label="Latitude" variant="outlined" fullWidth
      value={latitude}
      onChange={(e)=>setlatitude(e.target.value)}
      />
      <TextField id="outlined-basic" label="Radius" variant="outlined" fullWidth
      value={radius}
      onChange={(e)=>setradius(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Find
    </Button>
    </form>
   
    </Paper>
    <h1>Places</h1>
    <Paper elevation={3} style={paperStyle}>
        
    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
  {place && place.length > 0 ? (
    place.map((result, resultIndex) => (
      <div key={resultIndex}>
        Name: {result.name}<br />
      </div>
    ))
  ) : (
    <div>Kayıt bulunamadı</div>
  )}
</Paper>

    </Paper>
    <h1>MAP</h1>
    <Paper elevation={3} style={paperStyle}>
      <img 
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${longitude},${latitude}&zoom=11&size=400x400&${markers}&key=AIzaSyBOxTyi-rGThBKcFYdrVdbU8fDVIvqsVYk`} 
        alt="Harita Görüntüsü"
      />
    </Paper>
    </Container>
  );
  }
