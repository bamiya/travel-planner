import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// "T"(관광지) 또는 "P"(플랜) 좋아요 목록 조회 + 토글을 한 곳으로 모은 훅.
// tourInfoPage/calendarPage/mainPage/travelPage/sharedPlanPage에 거의 똑같이
// 복붙되어 있던 getLikes/addLikes/removeLikes를 대체한다.
//
// 사용 예:
//   const { likes, isLiked, toggleLike, reloadLikes } = useLikes("T");
//   useEffect(() => { reloadLikes(); }, []);
//   ...
//   {isLiked(tour.contentid) ? <HeartFilled onClick={() => toggleLike(tour.contentid)} /> : <HeartOutlined onClick={() => toggleLike(tour.contentid)} />}
//
// 토글 성공 후 페이지마다 추가로 해야 할 일(카운트 갱신, 목록 새로고침 등)이 있으면
// toggleLike(id, wasLiked => { ... }) 두 번째 인자로 넘기면 된다.
export const useLikes = (type) => {
  const [likes, setLikes] = useState([]);

  const reloadLikes = useCallback(async () => {
    try {
      const res = await axios.post("/getLikes");
      setLikes(res.data.data.filter((e) => e.type === type));
    } catch (e) {
      setLikes([]);
    }
  }, [type]);

  const isLiked = useCallback((id) => likes.some((e) => String(e.id) === String(id)), [likes]);

  const toggleLike = useCallback(
    async (id, onToggled) => {
      try {
        const wasLiked = isLiked(id);
        if (wasLiked) {
          await axios.delete(`/removeLikes/${id}?type=${type}`);
        } else {
          await axios.post("/addLikes", { id, type });
        }
        onToggled?.(wasLiked);
        await reloadLikes();
      } catch (e) {
        toast.info("로그인 후 이용해 주세요.");
      }
    },
    [isLiked, reloadLikes, type]
  );

  return { likes, isLiked, toggleLike, reloadLikes };
};
