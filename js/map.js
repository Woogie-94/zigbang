const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567),
  level: 4,
  maxLevel: 5,
};
const map = new kakao.maps.Map(container, options);
const clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 1,
  minClusterSize: 1,
  gridSize: 100,
  calculator: [10, 30, 50, 100],
  styles: [
    { width: "40px", height: "40px", color: "#fff", textAlign: "center", fontSize: "1.5rem", lineHeight: "40px", fontWeight: "bold", background: "rgba(250, 149, 11, 0.9)", borderRadius: "50%" },
    { width: "50px", height: "50px", lineHeight: "50px" },
    { width: "60px", height: "60px", lineHeight: "60px" },
    { width: "70px", height: "70px", lineHeight: "70px", fontSize: "1.7rem" },
    { width: "80px", height: "80px", lineHeight: "80px" },
  ],
});

// kakao map event
kakao.maps.event.addListener(map, "center_changed", debounce(mapCenterChangeEvent, 300));

// 지도의 위치를 변경할 때 위치 정보를 가져오는 함수입니다.
function getCenterPosition() {
  const latlng = map.getCenter();

  return [latlng, 5];
}

// 지도의 위치를 변경할 때의 로직을 담은 함수입니다.
function mapCenterChangeEvent() {
  const geohash = new Geohash();
  const position = getCenterPosition();
  const transGeohash = geohash.encode(position[0].Ma, position[0].La, position[1]);

  getItemList(transGeohash);
}

// 지도에 클러스터를 생성하는 함수입니다.
function createCluster(data) {
  // ha, oa = lng
  // qa,pq = lat
  // data.items = 범위 내 매물 리스트
  // data.sections = 범위 내 추천, 일반, 최신 매물 리스트
  console.log(data);
  const sectionsData = data.sections.map((section) => section.item_ids.map((el) => el));
  const bounds = map.getBounds();
  const boundsFilterList = data.items.filter((el) => bounds.ha < el.lng && bounds.oa > el.lng && bounds.qa < el.lat && bounds.pa > el.lat);
  const boundsFilterRecommendData = [];
  const boundsFilterNomalData = [];
  const boundsFilterUptoData = [];

  boundsFilterList.forEach((listData) => {
    if (sectionsData[1].includes(listData.item_id)) boundsFilterRecommendData.push(listData.item_id);
    if (sectionsData[2].includes(listData.item_id)) boundsFilterNomalData.push(listData.item_id);
    if (sectionsData[3].includes(listData.item_id)) boundsFilterUptoData.push(listData.item_id);
  });

  const markers = boundsFilterList.map((position) => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    return new kakao.maps.Marker({ position: latlng });
  });

  clusterer.clear();
  clusterer.addMarkers(markers);

  // index.js로 data 전달
  getRoomData([boundsFilterRecommendData, boundsFilterNomalData, boundsFilterUptoData]);
}
