import stations from '../stations';

const apiFetch = (startStation, endStation) => {

    return fetch(`http://subwaymap.ddns.net:30/path/?start=${startStation}&end=${endStation}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);

      const pathData = {
        currentTime: data[0].dptTm.split("T")[1].slice(0, 5),
        estimatedTime: data[0].duration,
        estimatedTime2: data[1].duration

      };
      // data[0]에 대한 처리
      const pathIds = data[0].path.slice(1).map((path) => path.split(":")[0].trim());
      const hasTransfer = data[0].path.slice(1).map((item) => item.includes("환승") ? 1 : 0);
  
      const selectedStations = pathIds.flatMap((pathId) =>
        stations.flatMap((line) =>
          line.stations
            .filter((station) => station.ID === pathId)
            .map((station) => ({
              line: line.line,
              station: station.name,
              time: data[0].path
                .slice(1)
                .find((path) => path.split(":")[0].trim() === pathId)
                .split(" ")[7]  
                .slice(0, 5),
                hasTransfer: hasTransfer[pathIds.indexOf(pathId)]
            }))
        )
      );
            console.log(selectedStations);
      pathData.selectedStations = selectedStations;

      // data[1]에 대한 처리
      const pathIds2 = data[1].path.slice(1).map((path) => path.split(":")[0].trim());
      const hasTransfer2 = data[1].path.slice(1).map((item) => item.includes("환승") ? 1 : 0);
      const selectedStations2 = pathIds2.flatMap((pathId) =>
        stations.flatMap((line) =>
          line.stations
            .filter((station) => station.ID === pathId)
            .map((station) => ({
              line: line.line,
              station: station.name,
              time: data[1].path
                .slice(1)
                .find((path) => path.split(":")[0].trim() === pathId)
                .split(" ")[7]
                .slice(0, 5),
                hasTransfer: hasTransfer2[pathIds2.indexOf(pathId)]
            }))
        )
      );
      console.log(selectedStations2)
      pathData.selectedStations2 = selectedStations2;
      return pathData;
    })
    .catch((error) => console.error(error));
}

export default apiFetch;