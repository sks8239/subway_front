import subwayMap from './img/subway_map.jpg';
const Map = () => {
    return(
<div style={{ position: 'relative' }}>
  <img src={subwayMap} alt="Subway Map" className=' ' style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0, zIndex:-999 }} />
</div>
    );
}

export default Map;