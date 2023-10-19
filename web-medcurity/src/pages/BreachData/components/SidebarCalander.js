import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';

import './SidebarCalander.css';

// Main container for the calendar component
const MainContainer = styled.div`
background-color: var(--lightblue);
    display: flex;
    flex-direction: column;
    height: 240px;
    z-index: 7;
`;
// The flexbox containing start & end dates
const DateSelectTab = styled.div`
    height: 45px;
    display: flex;
    font-family: Lato,sans-serif;
`;
// style for the startdate tab element
const StartdateTab = styled.div`
    background-color: var(--lightblue);
    flex: 1 0;
    align-items: center;
`;
// style for the enddate tab element
const EnddateTab = styled.div`
    background-color: var(--lightblue);
    flex: 1 0;
    align-items: center;
`;
// the flexbox area containing the calander used for minDate selection
const CalanderStartSection = styled.div`
    background-color: var(--lightblue);
    display: flex;
    height: 100%;
    padding: 5px 10px 0px 10px;
`;
// the flexbox area containing the calander used for maxDate selection
const CalanderEndSection = styled.div`
background-color: var(--lightblue);
display: flex;
height: 100%;
padding: 5px 10px 0px 10px;
`;

const DateTabText = styled.div`
    color: var(--white);
    font-size: 1.3rem;
    font-weight: 400;
    text-align: center;
    margin: auto;
`;

const SidebarCalander = ({setStartDate, setEndDate, startDate, endDate}) => {
    /* A state variable to keep track of if the minDate calendar or maxDate calendar is displayed */
    const [isEndDate, setEnddateState] = useState(true);

    // State variable to track date selected
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    // update date on change
    // const onStartChange = startDate => { setStartDate(startDate);};
    // const onEndChange = endDate => { setEndDate(endDate);};
    // These need to be turned into a unix timestamp in the relivent graphs via [ const unixTimestamp = startDate.getTime() / 1000; ]
    // or maybe not / 1000 if our other timestamps dont use that.

    return (
        <>
            {/* Main Container the Calander Section is in */}
            <MainContainer>
                {/* This is a flexbox that contains the start and end date tabs */}
                <DateSelectTab data-testid = "DateSelectTab">
                    {/* The startdate tab */}
                    <StartdateTab data-testid = "StartDateTab" onClick={() => setEnddateState(true)} style={{ backgroundColor: isEndDate ? "var(--lightblue)" : "var(--darkblueaccent)" }}>
                        <DateTabText>Start Date</DateTabText>
                    </StartdateTab>

                    {/* Start Date Text */}
                    <EnddateTab data-testid = "EndDateTab" onClick={() => setEnddateState(false)} style={{ backgroundColor: isEndDate ? "var(--darkblueaccent)" : "var(--lightblue)" }}>
                        <DateTabText>End Date</DateTabText>
                    </EnddateTab>
                </DateSelectTab>

                {/* This is the flexbox that contains the logic for wether the start or end date of the calander is displayed */}
                {isEndDate ? (
                    <CalanderStartSection>
                            {/* Start Date Calendar Content  */}
                            <Calendar onChange={(startDate) => setStartDate(startDate)}
                                      value={startDate}
                                      style={{flex: 1, height: '100%', width: '100%'}}
                            />
                    </CalanderStartSection>
                    ) : (
                    <CalanderEndSection>
                            {/* End Date Calendar Content  */}
                            <Calendar onChange={(endDate) => setEndDate(endDate)}
                                        value={endDate}
                                        style={{flex: 1, height: '100%', width: '100%'}}
                            />                            
                    </CalanderEndSection>
                )}
            </MainContainer>
        </>
    )
}
export default SidebarCalander;
            

