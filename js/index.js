function getRoomData(data) {
  // map.js createCluster 함수에서 데이터를 받아 옴
  const roomContainer = document.querySelector(".room__list");
  const roomListcounter = document.querySelector(".room__count");
  const listCount = data.reduce((a, c) => a + c.length, 0);
  roomContainer.textContent = "";
  roomListcounter.textContent = `지역 목록 ${listCount}개`;

  listCount
    ? data.forEach((data, type) => {
        roomContainer.appendChild(createRoomeListTypeContainer(type));
        const RoomeListTypeContainer = document.querySelectorAll(".room__item-container");

        if (data.length === 0) RoomeListTypeContainer[type].style.display = "none";

        data.forEach((item) => {
          getRoomItem(item).then((data) => {
            RoomeListTypeContainer[type].appendChild(createRoomListComponents(data));
          });
        });
      })
    : roomContainer.appendChild(createRoomEmptyComponents());
}

function createRoomeListTypeContainer(type) {
  // type 0 = 추천 리스트
  // type 1 = 일반 리스트
  // type 2 = 최신 리스트
  let typeText = "";
  if (type === 0) typeText = "이 지역 안심중개사 추천 방";
  if (type === 1) typeText = "이 지역 안심중개사 일반 방";
  if (type === 2) typeText = "이 지역 안심중개사 최신 방";

  const containerEle = document.createElement("div");
  containerEle.classList.add("room__item-container");

  const typeTextEle = document.createElement("p");
  typeTextEle.classList.add("room__item-container-type");
  typeTextEle.textContent = typeText;

  containerEle.appendChild(typeTextEle);
  return containerEle;
}

function createRoomListComponents(data) {
  const itemData = data.item;
  // console.log(itemData);

  const roomItemContainerEle = document.createElement("div");
  roomItemContainerEle.classList.add("room__items");
  roomItemContainerEle.dataset.data_id = itemData.item_id;

  const roomItemImgBoxEle = document.createElement("div");
  roomItemImgBoxEle.classList.add("room__item-img");
  roomItemImgBoxEle.style.backgroundImage = `url(${itemData.image_thumbnail}?w=3000)`;

  const roomItemInfo = (data) => {
    // 추천 - 방 타입, 보증/월세, 면적/층, 주소, title
    // service_type = 원룸 or 오피스텔 + room_type_code
    // sale_type + 보증금액 + 월세금액
    // 전용면적(소수점 버림) + floor
    // address
    // title

    const infoEle = document.createElement("div");
    infoEle.classList.add("room__item-info");

    const roomType = document.createElement("p");
    roomType.classList.add("room__item-info-type");
    if (data.room_type_code === "01") roomType.textContent = `${data.service_type}·오픈형 원룸`;
    if (data.room_type_code === "02") roomType.textContent = `${data.service_type}·분리형 원룸`;
    if (data.room_type_code === "03") roomType.textContent = `${data.service_type}·복층형 원룸`;

    const cost = document.createElement("p");
    cost.classList.add("room__item-info-cost");
    if (data.sales_type === "월세") cost.textContent = `${data.sales_type} ${data.보증금액} / ${data.월세금액}`;
    else cost.textContent = `${data.sales_type} ${data.보증금액}`;

    const area = document.createElement("p");
    area.classList.add("room__item-info-area");
    area.textContent = `${parseInt(data.전용면적_m2)}m² ${data.floor}층`;

    const address = document.createElement("p");
    address.classList.add("room__item-info-address");
    address.textContent = `${data.address}`;

    const title = document.createElement("p");
    title.classList.add("room__item-info-title");
    title.textContent = `${data.title}`;

    infoEle.appendChild(roomType);
    infoEle.appendChild(cost);
    infoEle.appendChild(area);
    infoEle.appendChild(address);
    infoEle.appendChild(title);
    return infoEle;
  };

  roomItemContainerEle.appendChild(roomItemImgBoxEle);
  roomItemContainerEle.appendChild(roomItemInfo(itemData));

  return roomItemContainerEle;
}

function createRoomEmptyComponents() {
  const container = document.createElement("div");
  container.classList.add("room__empty");

  const img = new Image();
  img.src = "./image/ic_content_empty.png";

  const text1 = document.createElement("p");
  text1.textContent = "검색조건에 맞는 매물이 없습니다.";

  const text2 = document.createElement("p");
  text2.textContent = "매매/전월세 설정과 필터값을 변경해보세요.";

  container.appendChild(img);
  container.appendChild(text1);
  container.appendChild(text2);

  return container;
}

function tt() {
  const test = document.querySelectorAll(".room__items");

  test.forEach((el) =>
    el.addEventListener("click", (e) => {
      console.log(e.currentTarget);
    })
  );
}
