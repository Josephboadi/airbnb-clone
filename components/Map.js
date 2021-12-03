
import { getCenter } from 'geolib';
import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';



function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    //   Transform searchReasults object into
    // Latitude: 52.51111, Longitude: 13.374522 object

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    // The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
      });

    

    return (
        <ReactMapGL
        mapStyle='mapbox://styles/boadijoseph/ckwhk0uhv1cr014lhg90l5emf'
        mapboxApiAccessToken={'pk.eyJ1IjoiYm9hZGlqb3NlcGgiLCJhIjoiY2t3cTdiMDRkMGp2ZzJ3bzJmcGR4NThoNyJ9.e6jED_Ygfn8AcZIjKsV3eg'}
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker 
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p 
                        onClick={() => setSelectedLocation(result)}
                        className="cursor-pointer text-2xl animate-bounce">
                            📍
                        </p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ): (false)}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
