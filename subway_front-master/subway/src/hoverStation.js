
// const hoverStation = () =>{
//     return(
//         stations.map((line) => (
//             <div key={line.line}>
//               <div className="line-stations">
//                 {line.stations.map((station) => (
//                   station.name === hoveredStation && (
//                     <div
//                       key={station.ID}
//                       className="station-label"
//                       style={{ ...hoveredStationPosition, position: 'absolute' }}
//                       onClick={() => hoverClick(station.name, line.line, station.left, station.top)}
//                     >
//                       <div className="content" onClick={(e) => e.stopPropagation()}></div>
//                       {hoveredStation}
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           ))
//     );
    
// }