import { useEffect } from "react";
import './App.css';

function App() {
  useEffect(() => {
    // Verifica se o script já foi carregado
    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -15.793889, lng: -47.882778 }, // Brasília centro Oeste
        zoom: 12,
      });

      const polygonCoords = [
        { lat: -15.7445, lng: -47.9116 }, // canto superior esquerdo
        { lat: -15.7445, lng: -47.8700 }, // canto superior direito
        { lat: -15.8035, lng: -47.8700 }, // canto inferior direito
        { lat: -15.8035, lng: -47.9116 }, // canto inferior esquerdo
        { lat: -15.7445, lng: -47.9116 }, // fecha o polígono
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

      const PolygonCoords1 = [
        { lat: -15.8315, lng: -47.9985 }, // ponto A - Guará I (lado esquerdo)
        { lat: -15.8315, lng: -47.9545 }, // ponto B - Guará II (lado direito)
        { lat: -15.8625, lng: -47.9765 }, // ponto C - ponta inferior do triângulo
        { lat: -15.8315, lng: -47.9985 }, // fecha o triângulo
      ];

      const polygon1 = new window.google.maps.Polygon({
        paths: PolygonCoords1,
        strokeColor: "#f0f0f0",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff0000",
        fillOpacity: 0.35,
      });
      polygon1.setMap(map);

      const sia = { lat: -15.8016, lng: -47.9480 }; // SIA

      const siaCircle = new window.google.maps.Circle({
        center: sia,
        radius: 2000, // raio em metros
        strokeColor: "#f0f0f0",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00ff00",
        map: map,
        fillOpacity: 0.35,
      });


      new window.google.maps.Marker({
        position: { lat: -23.5505, lng: -46.6333 },
        map,
        title: "São Paulo",
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">

      <div className="sideLeft">
        <h3 style={{ color: 'white', textAlign: 'center' }}>My Google Maps</h3>
        <div id="map"></div>
      </div>

      <div className="sideRight">
        {/* input de coordenadas aqui */}
        <input type="text" placeholder="Latitude" />
        <input type="text" placeholder="Longitude" />
        <button>click me</button>
      </div>

    </div>
  );
}

export default App;
