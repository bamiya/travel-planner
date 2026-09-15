import styled from "styled-components";
import Slider from "react-slick";

export const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`

export const Video = styled.video`
    z-index: -2;
    position: absolute;
    width: auto;
    height: auto;
    min-height: 100%;
    min-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const VideoOverlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg, rgba(8, 12, 20, 0.35) 0%, rgba(8, 12, 20, 0.25) 45%, rgba(8, 12, 20, 0.7) 100%);
`

export const ContentBox = styled.div`
    width: 1000px;
    max-width: 92vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Eyebrow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    margin-bottom: 24px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: white;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    backdrop-filter: blur(8px);
`

export const Title = styled.div`
    font-size: 56px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: white;
    margin-bottom: 16px;
    text-align: center;
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25);

    @media (max-width: 480px) {
        font-size: 34px;
    }
`

export const Subtitle = styled.div`
    font-size: 17px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    margin-bottom: 36px;
    word-break: keep-all;

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 0 10px;
    }
`

export const InputBox = styled.div`
    width: 700px;
    max-width: 100%;
    height: 56px;
    border-radius: 999px;
    box-sizing: border-box;
    display: flex;
    background-color: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    position: relative;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
`

export const ChipRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 28px;
`

export const Chip = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;
    backdrop-filter: blur(6px);
`

export const InputPreView = styled.div`
    width: 650px;
    max-width: 100%;
    height: 330px;
    background-color: var(--color-white);
    position: absolute;
    top: 66px;
    border-radius: var(--radius-md);
    padding: 15px 30px 30px 30px;
    box-sizing: border-box;
    overflow-y: scroll;
    box-shadow: var(--shadow-hover);
    display: ${props => {
        return props.display ? "block" : "none"
    }};
`

export const InputPreItem = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 400;
    color: var(--color-text);
    :hover{
        color: var(--color-primary);
    }
`

export const Input = styled.input`
    margin: 0;
    padding: 0;
    border: 0;
    flex: 1;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 24px;
    font-weight: 450;
    background-color: transparent;
    color: var(--color-text);
    border-radius: 999px 0 0 999px;

    &::placeholder {
        color: var(--color-text-muted);
    }
`

export const Btn = styled.div`
    width: 44px;
    height: 44px;
    margin: 6px;
    border-radius: 999px;
    background-color: var(--color-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
`

export const Img = styled.img`
    width: 35px;
`

export const BottomBox = styled.div`
    width: 100%;
    background-color: ${props => {
        return props.color ? props.color : "white"
    }};
`

export const Section = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 100px 40px;

    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`

export const SectionHead = styled.div`
    text-align: center;
    margin-bottom: 56px;
`

export const SectionEyebrow = styled.div`
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 16px;
`

export const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 30px;
    color: var(--color-text);
    margin-bottom: 12px;

    @media (max-width: 480px) {
        font-size: 24px;
    }
`

export const SectionSubtitle = styled.div`
    font-size: 16px;
    color: var(--color-text-muted);
    word-break: keep-all;
`

export const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

export const FeatureCard = styled.div`
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: 36px 28px;
    box-sizing: border-box;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-4px);
    }
`

export const FeatureIconWrap = styled.div`
    width: 52px;
    height: 52px;
    border-radius: var(--radius-md);
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    svg {
        width: 26px;
        height: 26px;
    }
`

export const FeatureTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    color: var(--color-text);
    margin-bottom: 10px;
`

export const FeatureText = styled.div`
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);
    word-break: keep-all;
`

export const CTAPanel = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 64px 40px;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 480px) {
        padding: 48px 24px;
    }
`

export const CTATitle = styled.div`
    font-weight: 800;
    font-size: 26px;
    color: white;
    margin-bottom: 12px;

    @media (max-width: 480px) {
        font-size: 22px;
    }
`

export const CTAText = styled.div`
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
    word-break: keep-all;
`

export const BottomContentBtn = styled.div`
    background-color: white;
    color: var(--color-primary-dark);
    width: 200px;
    height: 48px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 28px;
    transition: var(--transition-base);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }
`

export const PrimaryButton = styled.div`
    background-color: var(--color-primary);
    color: white;
    width: 200px;
    height: 48px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 8px;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
    }
`

export const CarouselBox = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CarouselTitle = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 8px;
    text-align: center;
`

export const CarouselSubtitle = styled.div`
    font-size: 15px;
    color: var(--color-text-muted);
    margin-bottom: 32px;
    text-align: center;
`

export const SliderCustom = styled(Slider)`
    width: 930px;
    max-width: 100%;
    margin-bottom: 20px;
`

export const SliderBox = styled.div`
    height: 370px;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 25px;
    cursor: pointer;
`

export const SliderImg = styled.img`
    width: 240px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius-md);
`

export const SliderInfo = styled.div`
    width: 100%;
    height: 140px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 15px 15px 0;
    display: flex;
    flex-direction: column;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
    }
`

export const SliderInfoText = styled.div`
    font-weight: 700;
    color: var(--color-text);
    font-size: ${props => {
        return props.size ? props.size : "16px"
    }};
    margin-left: 5px;
`

export const SliderInfoBottomBox = styled.div`
    width: 100%;
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SliderInfoBox = styled.div`
    display: flex;
`

export const SliderInfoImg = styled.img`
    width: 25px;
    margin-right: 5px;
`

export const SliderArrow = styled.img`
    width: 20px;
    height: 40px;
    transform: ${props => {
        return props.prev ? "rotate( 180deg )" : ""
    }};
`