import { useEffect, useRef, useState } from "react";
import './App.css';

function App() {
  const mapRef = useRef(null);
  const polygonRef = useRef(null);
  const [path, setPath] = useState([]);
  const [latitude, setLatitude] = useState(""); // Estado para Latitude
  const [longitude, setLongitude] = useState(""); // Estado para Longitude

  useEffect(() => {
    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=`; // coloque sua chave
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -15.793889, lng: -47.882778 },
        zoom: 12,
      });

      mapRef.current = map;

      // Desenho do polígono via clique
      map.addListener("click", (e) => {
        const newCoord = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setPath((prevPath) => [...prevPath, newCoord]);
      });

      // Polígonos e marcador fixos
      desenharElementosFixos(map);
    };

    document.body.appendChild(script);
  }, []);

  // Atualiza o polígono desenhado pelo usuário
  useEffect(() => {
    if (!mapRef.current || path.length === 0) return;

    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    const newPolygon = new window.google.maps.Polygon({
      paths: path,
      strokeColor: "#0000ff",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#0000ff",
      fillOpacity: 0.35,
    });

    newPolygon.setMap(mapRef.current);
    polygonRef.current = newPolygon;
  }, [path]);

  // Limpa o polígono do usuário e restaura os elementos fixos
  const handleClear = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }

    setPath([]);
    if (mapRef.current) {
      desenharElementosFixos(mapRef.current);
    }
  };

  // Função para desenhar os elementos padrão
  const desenharElementosFixos = (map) => {
    const polygonCoords = [
      { lat: -15.7445, lng: -47.9116 },
      { lat: -15.7445, lng: -47.8700 },
      { lat: -15.8035, lng: -47.8700 },
      { lat: -15.8035, lng: -47.9116 },
      { lat: -15.7445, lng: -47.9116 },
    ];

    const polygon1Coords = [
      { lat: -15.8315, lng: -47.9985 },
      { lat: -15.8315, lng: -47.9545 },
      { lat: -15.8625, lng: -47.9765 },
      { lat: -15.8315, lng: -47.9985 },
    ];

    const polygon = new window.google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: "#f0f0f0",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#f0f000",
      fillOpacity: 0.35,
    });
    polygon.setMap(map);

    const polygon1 = new window.google.maps.Polygon({
      paths: polygon1Coords,
      strokeColor: "#f0f0f0",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#ff0000",
      fillOpacity: 0.35,
      map: map
    });
   // polygon1.setMap(map);

    const sia = { lat: -15.8016, lng: -47.9480 };
    const circle = new window.google.maps.Circle({
      center: sia,
      radius: 2000,
      strokeColor: "#f0f0f0",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00ff00",
      fillOpacity: 0.35,
      map: map,
    });

    new window.google.maps.Marker({
      position: { lat: -23.5505, lng: -46.6333 },
      map,
      title: "São Paulo",
    });
  };

  // Função para adicionar marcador no mapa com base nas coordenadas inseridas
  const addMarker = () => {
    if (latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      new window.google.maps.Marker({
        position,
        map: mapRef.current,
        title: "Novo marcador",
      });
    }
  };

  return (
    <div className="App">
      <div className="sideLeft">
        <h3 style={{ color: 'white', textAlign: 'center' }}>My Google Maps</h3>
        <div id="map" style={{ width: '100%', height: '600px' }}></div>
      </div>

      <div className="sideRight">
        <button onClick={handleClear} id='btn_limpar'>Limpar Polígono</button>

        <div>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <button onClick={addMarker}>Adicionar Marcador</button>
      </div>
    </div>
  );
}

export default App;
