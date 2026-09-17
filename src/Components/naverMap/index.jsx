/*global naver*/
import React, { useEffect, useRef, useState } from 'react'
import './map.css'

const Map = (props) => {
  const lat = props.lat == null ? 35.87572504970846 : props.lat;
  const lon = props.lon == null ? 128.68151215551117 : props.lon;
  const path = props.path; // 이동 경로선을 그릴 [lat,lon] 좌표 배열 (선택)
  const markers = props.markers; // 방문 순서 번호 마커를 여러 개 찍을 [{lat,lon,id}] 배열 (선택, id는 focus 강조 매칭용)
  const focus = props.focus; // 마커/경로선은 그대로 둔 채 특정 지점으로만 중심을 옮기고 싶을 때 {lat, lon, contentid} (선택)
  const [mapFailed, setMapFailed] = useState(false);
  const mapRef = useRef(null);
  const markerObjsRef = useRef([]); // [{ marker, id }] - focus에 맞춰 강조 아이콘만 바꿀 때 다시 그리지 않고 재사용

  const buildMarkerIcon = (number, isActive) => ({
    content: `<div class="map_num_marker${isActive ? ' map_num_marker--active' : ''}">${number}</div>`,
    anchor: new naver.maps.Point(isActive ? 17 : 14, isActive ? 17 : 14),
  });

  // 지도 인스턴스는 마운트될 때 한 번만 만든다. path/markers가 바뀔 때마다(경로 계산이
  // 끝나는 대로 여러 번 오는 OSRM 응답 등) 지도를 통째로 새로 만들면, 이전 인스턴스의
  // 스케일바/저작권 같은 기본 컨트롤 DOM이 정리되지 않고 계속 쌓이는 문제가 있었다.
  // 이제 지도 자체는 그대로 두고 마커/경로선만 별도 effect에서 갈아끼운다.
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
    mapRef.current = map;
    return () => {
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 마커/경로선 - path/markers(또는 마커 없는 단일 좌표 호출의 lat/lon)가 바뀔 때만
  // 다시 그린다. 지도 인스턴스 자체는 위 effect에서 한 번만 만든 걸 그대로 쓴다.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const overlays = [];
    const markerObjs = [];

    if (markers && markers.length > 0) {
      // 하루 일정에 추가한 장소들을 방문 순서 번호로 표시 (동선 자동계산 경로선과 함께 사용)
      markers.forEach((m, idx) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(m.lat, m.lon),
          map,
          icon: buildMarkerIcon(idx + 1, focus && m.id != null && m.id === focus.contentid),
        });
        overlays.push(marker);
        markerObjs.push({ marker, id: m.id, number: idx + 1 });
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
    }

    markerObjsRef.current = markerObjs;

    return () => {
      overlays.forEach((o) => o.setMap(null));
      markerObjsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, path, markers]);

  // 마커 강조 - 위 effect가 마커/경로선을 다시 그릴 때만 반응하고, focus만 바뀔 때는
  // 이미 그려둔 마커 객체의 아이콘만 바꿔치기한다 (다시 그리지 않아 깜빡임이 없다).
  useEffect(() => {
    markerObjsRef.current.forEach(({ marker, id, number }) => {
      const isActive = focus && id != null && id === focus.contentid;
      marker.setIcon(buildMarkerIcon(number, isActive));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  // 지도의 중심/줌만 담당하는 별도 effect - 마커/경로선을 그리는 위 effect와 분리해둬야,
  // 특정 스팟에 포커스를 줄 때(focus prop) 마커·경로선을 다시 그리지(=한 번 지웠다 켜지) 않는다.
  // 이전엔 focus 전환마다 지도를 통째로 새로 만들어서, 클릭할 때마다 경로선이 사라지고
  // 지도가 초기화되는 문제가 있었다.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (focus) {
      map.setCenter(new naver.maps.LatLng(focus.lat, focus.lon));
      map.setZoom(17);
    } else if (path && path.length > 1) {
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
    } else {
      // markers/path 둘 다 없는 단일 좌표 호출(예: 관광지 상세페이지) - lat/lon 자체가
      // 나중에 바뀔 때(비동기로 데이터가 늦게 들어오는 경우 등) 그 위치로 중심을 옮긴다.
      map.setCenter(new naver.maps.LatLng(lat, lon));
    }
  }, [focus, path, markers, lat, lon]);

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
