/*global naver*/
import React, { useEffect, useState } from 'react'
import './map.css'

const Map = (props) => {
  const lat = props.lat == null ? 35.87572504970846 : props.lat;
  const lon = props.lon == null ? 128.68151215551117 : props.lon;
  const [mapFailed, setMapFailed] = useState(false);

  useEffect(() => {
    // 네이버맵 API 키가 없거나 SDK 로딩이 실패하면 전역 naver 객체 자체가
    // 없어서 아래 코드가 그대로 ReferenceError를 던진다. 에러 경계가 없는
    // 리액트 트리에서는 이 에러 하나로 화면 전체가 흰 화면이 되어버리므로,
    // 지도 없이도 나머지 페이지는 정상적으로 보이도록 방어한다.
    if (typeof naver === 'undefined' || !naver.maps) {
      setMapFailed(true);
      return;
    }
    const container = document.getElementById('map');
    const map = new naver.maps.Map(container, {
      center: new naver.maps.LatLng(lat, lon),
      zoom: 15,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lon),
      map,
    });
  }, [lat, lon]);

  if (mapFailed) {
    return (
      <div
        className="map_wrap"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
          color: "var(--color-text-muted)",
          borderRadius: "var(--radius-md)",
        }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.24 5 9.2 5 14.6 12 22 12 22s7-7.4 7-12.8C19 5.24 15.87 2 12 2zm0 9.7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>지도를 불러올 수 없습니다</span>
      </div>
    );
  }

  return (
    <div className="map_wrap">
      <div id="map" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}></div>
    </div>
  );
};
export default React.memo(Map);
