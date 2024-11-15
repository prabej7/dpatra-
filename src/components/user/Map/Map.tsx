import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import LocationUpdater, { Coords } from './LocationUpdater';
import Search from './Search';
import { useEffect, useState } from 'react';
import ClickHandler from './ClickHandler';
import { toast } from 'react-toastify';


interface Props {
    onLocationSelect: (coords: Coords) => void;
    coords?: Coords;
}

const Map: React.FC<Props> = ({ onLocationSelect, coords }) => {


    const [currentPosition, setCurrentPosition] = useState<Coords>({
        lat: coords?.lat || 27.7103,
        lng: coords?.lng || 85.3222
    });

    const [selectedPosition, setSelectedPosition] = useState<Coords>({
        lat: coords?.lat || 27.7103,
        lng: coords?.lng || 85.3222
    });

    const handleSearch = (coord: Coords) => {
        setCurrentPosition(coord);
    };

    const handleMapClick = (coord: Coords) => {
        setSelectedPosition(coord);
        onLocationSelect(coord);
    };

    const askLocationPermission = () => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setCurrentPosition({ lat, lng });
            }, (error) => {
                toast.error('Permission Denied.')
            })
        }
    }

    useEffect(() => {
        if (!coords)
            askLocationPermission();
    }, []);

    return (
        <>
            <Search onSearch={handleSearch} />
            <MapContainer className='z-0' center={[currentPosition.lat, currentPosition.lng]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
                    <Popup>
                        Selected Postion
                    </Popup>
                </Marker>

                <Marker position={[currentPosition.lat, currentPosition.lng]}>
                    <Popup>
                        You
                    </Popup>
                </Marker>
                <LocationUpdater location={currentPosition} />
                <ClickHandler onClick={handleMapClick} />
            </MapContainer>
        </>
    );
};

export default Map;
