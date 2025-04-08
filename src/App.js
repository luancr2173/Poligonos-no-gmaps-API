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
        center: { lat: -23.5505, lng: -46.6333 }, // São Paulo
        zoom: 10,
      });

      new window.google.maps({
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
