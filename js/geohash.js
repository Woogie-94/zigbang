class Geohash {
  constructor() {
    this.base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
  }

  encode(lat, lon, precision) {
    if (typeof precision == "undefined") {
      for (let p = 1; p <= 12; p++) {
        const hash = Geohash.encode(lat, lon, p);
        const posn = Geohash.decode(hash);
        if (posn.lat == lat && posn.lon == lon) return hash;
      }
      precision = 12;
    }

    lat = Number(lat);
    lon = Number(lon);
    precision = Number(precision);

    if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error("Invalid geohash");

    let idx = 0; // index into base32 map
    let bit = 0; // each char holds 5 bits
    let evenBit = true;
    let geohash = "";

    let latMin = -90,
      latMax = 90;
    let lonMin = -180,
      lonMax = 180;

    while (geohash.length < precision) {
      if (evenBit) {
        const lonMid = (lonMin + lonMax) / 2;
        if (lon >= lonMid) {
          idx = idx * 2 + 1;
          lonMin = lonMid;
        } else {
          idx = idx * 2;
          lonMax = lonMid;
        }
      } else {
        const latMid = (latMin + latMax) / 2;
        if (lat >= latMid) {
          idx = idx * 2 + 1;
          latMin = latMid;
        } else {
          idx = idx * 2;
          latMax = latMid;
        }
      }
      evenBit = !evenBit;

      if (++bit == 5) {
        geohash += this.base32.charAt(idx);
        bit = 0;
        idx = 0;
      }
    }
    return geohash;
  }
}
