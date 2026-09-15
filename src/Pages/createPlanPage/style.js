import styled from "styled-components";
import Modal from 'react-modal';
import Calendar from 'react-calendar';

export const ModalCustom = styled(Modal)`
    width: 600px;
    max-width: 90vw;
    background-color: var(--color-white);
    border: none;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-hover);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 28px 0;
    box-sizing: border-box;
    ${props => {
        if(props.filter){
            return {
                boxSizing: "border-box",
                padding: "20px"
            }
        }
    }}
`

export const BtnBox = styled.div`
    width: 100%;
    border-top: 1px solid var(--color-border);
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    margin: 0 -28px;
    padding: 0 28px;
`

export const Btn = styled.div`
    display: inline-flex;
    box-sizing: border-box;
    padding: 9px 18px;
    height: 38px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: ${(props) => (props.primary ? "var(--color-primary)" : "var(--color-bg)")};
    color: ${(props) => (props.primary ? "var(--color-white)" : "var(--color-text-muted)")};

    &:hover {
        background-color: ${(props) => (props.primary ? "var(--color-primary-dark)" : "var(--color-border)")};
    }
`

export const CalendarCustom = styled(Calendar)`
    width: 100%;
    background-color: var(--color-white);
    border: none;
    font-family: inherit;
    margin-bottom: 40px;

    /* ~~~ 상단 네비게이션(년/월, 이전·다음) ~~~ */
    .react-calendar__navigation {
        display: flex;
        margin-bottom: 12px;

        button {
            min-width: 40px;
            background: none;
            border-radius: var(--radius-sm);
            font-size: 15px;
            color: var(--color-text);

            &:disabled {
                color: var(--color-border);
            }
        }

        .react-calendar__navigation__label {
            font-weight: 800;
            font-size: 17px;
        }
        .react-calendar__navigation__arrow {
            flex-grow: 0.333;
            font-size: 20px;
            color: var(--color-text-muted);
        }
    }

    /* ~~~ 요일 라벨 ~~~ */
    .react-calendar__month-view__weekdays {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: var(--color-text-muted);
        margin-bottom: 6px;

        abbr {
            text-decoration: none;
        }
    }

    /* ~~~ 날짜 버튼 공통 ~~~ */
    button {
        background-color: var(--color-white);
        border: 0;
        border-radius: var(--radius-sm);
        color: var(--color-text);
        padding: 10px 0;
        transition: var(--transition-base);

        &:enabled:hover {
            background-color: var(--color-primary-light);
        }
    }

    /* ~~~ 날짜 그리드 ~~~ */
    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
        row-gap: 4px;

        .react-calendar__tile {
            position: relative;
        }

        /* 오늘 */
        .react-calendar__tile--now {
            background-color: var(--color-bg);
            font-weight: 800;
        }

        /* 선택 범위 안 */
        .react-calendar__tile--range {
            background-color: var(--color-primary-light);
            color: var(--color-primary-dark);
            border-radius: 0;
        }

        /* 범위의 시작/끝(실제 선택한 날짜) */
        .react-calendar__tile--rangeStart,
        .react-calendar__tile--rangeEnd,
        .react-calendar__tile--active {
            background-color: var(--color-primary) !important;
            color: var(--color-white) !important;
            font-weight: 800;
            border-radius: var(--radius-sm);
        }

        .react-calendar__month-view__days__day--neighboringMonth {
            color: var(--color-border);
        }
    }

    /* ~~~ 연/10년/세기 단위 뷰 ~~~ */
  .react-calendar__year-view__months, .react-calendar__decade-view__years, .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;
    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }
  }
  abbr{
    text-decoration: none;
  }
`

/////////////////////////////////////////////////////////////////

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

export const Map = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--color-bg);
    position: relative;
`

export const ControlBox = styled.div`
    width: 350px;
    max-width: 90vw;
    height: 100vh;
    background-color: white;
    position:fixed;
    top: 0;
    bottom:0;
    left: ${props => {
        return props.open ? "0" : "-350px"
    }};
    z-index: 2;
    transition: all .5s;
    overflow-y: scroll;
`

export const TravelBox = styled.div`
    width: 500px;
    max-width: 90vw;
    height: 100vh;
    background-color: white;
    top: 0;
    position:fixed;
    margin-right: ${props => {
        return props.open ? "0" : "-500px"
    }};
    right: 0;
    z-index: 1;
    transition: all .5s;
    overflow-y: scroll;

`

export const ContentBox = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    box-sizing: border-box;
    padding: 40px 20px;
`

export const OpenBtn = styled.div`
    width: 44px;
    height: 44px;
    background-color: var(--color-white);
    color: var(--color-text);
    position: absolute;
    left: 16px;
    top: 16px;
    border-radius: 50%;
    box-shadow: var(--shadow-hover);
    display: ${props => {
        return props.open ? "none" : "flex"
    }};
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-light);
        color: var(--color-primary-dark);
    }
`

export const DateBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
`

export const TravelDate = styled.div`
    font-size: 14px;
`

export const TravelCalendar = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
`

export const DayTitleRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
`

export const DayTitle = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: var(--color-text);
`

export const DayWeather = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    border-radius: 999px;
    white-space: nowrap;
`

export const RouteInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 2px 0 6px 30px;
    padding: 4px 10px;
    width: fit-content;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    border-radius: var(--radius-sm);
`

export const DayItem = styled.div`
    height: 70px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    display: flex;
    align-items: center;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    margin-bottom: 8px;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-bg);
        border-color: var(--color-primary);
    }
`

export const DayItemImg = styled.img`
    cursor: pointer;
    height: 100%;
    width: 60px;
    border-radius: var(--radius-sm);
    object-fit: cover;
    margin-right: 10px;
    flex-shrink: 0;
    background-color: var(--color-bg);
`
export const DayItemSubTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DayItemTextBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: ${props => {
        return props.notcolumn ? "column" : ""
    }};;
    justify-content: space-between;
`

export const DayItemTitle = styled.div`
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const DayItemText = styled.div`
    font-size: 12px;
    flex: 1;
`

export const PlanAddBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
`

export const PlanAddBtn = styled.div`
    width: 104px;
    height: 32px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    background-color: ${props => {
        return props.updated ? "var(--color-accent)" : "var(--color-success)"
    }};

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 20px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.94);
    }
`

export const CloseBtn = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 14px;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: var(--transition-base);
    z-index: 1;

    &:hover {
        background-color: var(--color-bg);
        color: var(--color-text);
    }

    ${props => {
        if(props.right) return "right: 16px;"
        if(props.left) return "left: 16px;"
    }}
`

export const TravelInputBox = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 30px;
`

export const CategoryTabBox = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
`
export const CategoryTab = styled.div`
    padding: 6px 14px;
    border-radius: var(--radius-lg);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-bg)")};
    color: ${(props) => (props.active ? "white" : "var(--color-text-muted)")};

    &:hover {
        background-color: ${(props) => (props.active ? "var(--color-primary-dark)" : "var(--color-primary-light)")};
    }
`

export const TravelInput = styled.input`
    width: 100%;
    height: 40px;
    flex: 1;
    border: 1px solid var(--color-border);
    outline: 0;
    font-size: 15px;
    box-sizing: border-box;
    padding-left: 14px;
    border-radius: 999px 0 0 999px;
    border-right: 0;
    background-color: var(--color-bg);
    color: var(--color-text);
    transition: var(--transition-base);

    &:focus {
        background-color: var(--color-white);
        border-color: var(--color-primary);
    }

    &::placeholder {
        color: var(--color-text-muted);
    }
`

export const TravelInputBtn = styled.div`
    width: 60px;
    height: 40px;
    background-color: var(--color-primary);
    border-radius: 0 999px 999px 0;
    display: flex;
    cursor: pointer;
    transition: var(--transition-base);
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: white;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`

export const ListBox = styled.div`
    width: 100%;
    height: 650px;
    /* background-color: azure; */
    margin-bottom: 50px;
    box-sizing: border-box;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
`

export const ScrollBox = styled.div`
    box-sizing: border-box;
    padding: 0 10px;
`

export const ListTitleBox = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--color-border);
    box-sizing: border-box;
    padding-bottom: 10px;
`

export const ListTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 800;
    color: var(--color-text);
`

export const ListFilter = styled.div`
    padding: 6px 14px;
    border-radius: var(--radius-lg);
    background-color: var(--color-bg);
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-light);
        color: var(--color-primary-dark);
    }
`

export const ItemBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

export const ItemBtn = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 999px;
    background-color: ${props => {
        return props.remove ? "var(--color-accent)" : "var(--color-success)"
    }};
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-left: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.94);
    }
`

export const ListItemBox = styled.div`
`

export const FilterItemBox = styled.div`
    border-radius: var(--radius-sm);
    display: flex;
    width: 110px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 7px 4px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-border);
    cursor: pointer;
    font-size: 13px;
    transition: var(--transition-base);

    &:hover {
        border-color: var(--color-primary);
    }
`

export const FilterBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    row-gap: 15px;
    column-gap: 5px;
    margin-bottom: 15px;

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const FilterCheckBox = styled.input`
    margin-right: 7px;
`

export const FilterItemText = styled.div`
`

export const FilterBtnBox = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`

export const FilterBtn = styled.div`
    margin: 0 15px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-primary-dark);
    :hover{
        text-decoration: underline;
    }
`

export const PlanApplyBtn = styled.button`
    border:  none;
    outline: none;
    width: 180px;
    height: 50px;
    background-color: var(--color-primary);
    color: white;
    position: absolute;
    z-index: 2;
    bottom: 50px;
    left: 50%;
    margin-left: -90px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`

const pinSvg = (color) =>
    `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C8.13 2 5 5.24 5 9.2 5 14.6 12 22 12 22s7-7.4 7-12.8C19 5.24 15.87 2 12 2zm0 9.7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`
    )}`

export const LocationImg = styled.button`
    border: none;
    outline: none;
    border-radius: 50%;
    cursor: pointer;
    flex-shrink: 0;
    background: ${props => (props.open ? "var(--color-primary-light)" : "transparent")} url(${props => (props.open ? pinSvg("#2F9BFF") : pinSvg("#A6ACB8"))}) no-repeat center / 16px 16px;
    width: 26px;
    height: 26px;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-light);
    }
`