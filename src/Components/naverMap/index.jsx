/*global naver*/
import React, { useEffect, useState } from 'react'
import './map.css'

const Map = (props) => {
  const lat = props.lat == null ? 35.87572504970846 : props.lat;
  const lon = props.lon == null ? 128.68151215551117 : props.lon;
  const path = props.path; // 이동 경로선을 그릴 [lat,lon] 좌표 배열 (선택)
  const markers = props.markers; // 방문 순서 번호 마커를 여러 개 찍을 [{lat,lon}] 배열 (선택)
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

    const overlays = [];

    if (markers && markers.length > 0) {
      // 하루 일정에 추가한 장소들을 방문 순서 번호로 표시 (동선 자동계산 경로선과 함께 사용)
      markers.forEach((m, idx) => {
        overlays.push(
          new naver.maps.Marker({
            position: new naver.maps.LatLng(m.lat, m.lon),
            map,
            icon: {
              content: `<div class="map_num_marker">${idx + 1}</div>`,
              anchor: new naver.maps.Point(14, 14),
            },
          })
        );
      });
    } else {
      overlays.push(
        new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lon),
          map,
        })
      );
    }

    if (path && path.length > 1) {
      overlays.push(
        new naver.maps.Polyline({
          map,
          path: path.map(([plat, plon]) => new naver.maps.LatLng(plat, plon)),
          strokeColor: "#2F9BFF",
          strokeWeight: 4,
          strokeOpacity: 0.85,
        })
      );

      const bounds = new naver.maps.LatLngBounds();
      path.forEach(([plat, plon]) => bounds.extend(new naver.maps.LatLng(plat, plon)));
      map.fitBounds(bounds, { top: 60, right: 40, bottom: 60, left: 40 });
    } else if (markers && markers.length > 0) {
      // path가 없어도(마커가 1개뿐이거나 동선 계산 전이어도) lat/lon prop을 안 주는
      // 호출부가 있어서, 그 경우 지도가 기본 좌표(대구)에 머물러 마커가 화면 밖으로
      // 벗어나 있었다. markers만 있어도 그 위치(들)로 중심을 맞춘다.
      if (markers.length > 1) {
        const bounds = new naver.maps.LatLngBounds();
        markers.forEach((m) => bounds.extend(new naver.maps.LatLng(m.lat, m.lon)));
        map.fitBounds(bounds, { top: 60, right: 40, bottom: 60, left: 40 });
      } else {
        map.setCenter(new naver.maps.LatLng(markers[0].lat, markers[0].lon));
      }
    }

    return () => {
      overlays.forEach((o) => o.setMap(null));
    };
  }, [lat, lon, path, markers]);

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
