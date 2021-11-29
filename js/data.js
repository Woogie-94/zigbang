const getItemList = async (geo, ...args) => {
  try {
    return await fetch(
      `https://apis.zigbang.com/v2/items?deposit_gteq=0&domain=zigbang&geohash=${geo}&rent_gteq=0&sales_type_in=%EC%A0%84%EC%84%B8%7C%EC%9B%94%EC%84%B8&service_type_eq=%EC%9B%90%EB%A3%B8`
    ) //
      .then((res) => res.json())
      .then((data) => {
        createCluster(data);
        return data;
      });
  } catch (err) {
    console.error(err);
  }
};

const getRoomItem = async (itemId) => {
  try {
    return await fetch(`https://apis.zigbang.com/v2/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => data);
  } catch (err) {
    console.error(err);
  }
};

getItemList("wydm9");
