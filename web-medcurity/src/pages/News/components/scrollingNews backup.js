import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import "./scrollingNews.css"

/*
    Scrolling news functionality inspired from and learned off variety of reference sources:
    - https://www.youtube.com/watch?v=0wvrlOyGlq0 
    - https://www.youtube.com/watch?v=3Z780EOzIQs&t=21s
    - https://www.youtube.com/watch?v=sVZX0XvEBhk
    - https://ryanmulligan.dev/blog/css-marquee/
*/

const ScrollerContainer = styled.div`
  min-height: 30vh;
  display: grid;
  place-items: center;
  background-color: var(--darkbluebg);
`;

const Slider = styled.div`
  height: 250px;
  margin: auto;
  position: relative;
  width: 90%;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

const SlideTrack = styled.div`
    display: flex;
    width: calc(250px * 8);
    animation: ${({ scrollOffset }) => `scroll ${10}s linear infinite ${scrollOffset}s`};
`;

const KeyframesScroll = styled.div`
    display: flex;
    animation: scroll ${10}s linear infinite;
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-250px * 4));
        }
    }
`;

const Slide = styled.div`
  height: 200px;
  width: 250px;
  display: flex;
  align-items: center;
  padding: 15px;
`;

const ScrollingNews = () => {
    const [slideIndex, setSlideIndex] = useState(1);

    const handleButtonClick = (index) => {
      setSlideIndex(index);
    };
  
    useEffect(() => {
        console.log("Current center element on screen:", slideIndex);
    }, [slideIndex]);
    
    const getScrollOffset = () => {
        return -250 * (slideIndex - 4);
    };

    return (
    <>
        <ScrollerContainer>
            <Slider>
                <SlideTrack scrollOffset={getScrollOffset}>
                    <KeyframesScroll>
                    {/* Include 10 most recent article slides */}
                    <Slide>
                        {/* Our slide content goes here */}
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    {/* Double our slides to make it look seemless. */}
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    <Slide>
                        <div className="DummyContainer"/>
                    </Slide>
                    </KeyframesScroll>
                </SlideTrack>
            </Slider>
            <div className="buttonContainer">
                {/* Create a button for each slide */}
                {[...Array(4)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={`button ${index === slideIndex ? "active" : ""}`}
                >
                    Button {index + 1}
                </button>
                ))}
            </div>
        </ScrollerContainer>
    </>
    )
}
export default ScrollingNews;