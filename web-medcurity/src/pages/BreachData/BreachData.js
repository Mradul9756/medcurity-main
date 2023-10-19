import React, {useState, useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import styled from 'styled-components';

import SidebarNavTest from "./components/sidebarMain";
import WideLineGraphDisp from "./components/WideLineGraphDisp";
import PieChartBBType from "./components/PieChartBBType";
import PieChartBBLoc from "./components/PieChartBBLoc";
import RawDataDisp from "./components/RawDataDisplay";

import { supabase } from '../../Supabase/supabase.js'

import Papa from 'papaparse';

import "./BreachData.css";

const MainContentRow = styled(Row)`
    --bs-gutter-x: 0rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-direction: row;
    flex: 1 1 0%;
    position: relative;
    flex-wrap: wrap;
    z-index: 7;
`;
  
const LineGraphContainer = styled(Row)`
    --bs-gutter-x: 0rem;
    --bs-gutter-y: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--linegraphcontainerheight);
    padding: 15px;
    width: 100%;
`;

const PiChartsContainer = styled(Row)`
    --bs-gutter-x: 0rem;
    --bs-gutter-y: 0;
    display: flex;
    height: var(--pichartscontainerheight);
    overflow: visible;
`;

const LowerContainerElements = styled(Col)`
    color: var(--black);
    align-items: center;
    list-style: none;
    display: flex;
    justify-content: center;
    height: 100%;
    
    flex: 1;
`;

const PiChartsDispControlPanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    flex: 1 1 0%;
    background-color: var(--darkbluebg);
    height: 50px;
    border-bottom: var(--darkblueaccent) 1px solid;

`;


const PiChartsByLocButton = styled.div`
    margin-left: 10px;
    background-color: ${({dispLoc}) => (dispLoc ? 'var(--lightblue)' : 'var(--darkblueaccent)')};
    z-index: 6;
    font-family: Lato,sans-serif;
    font-weight: 200;
    letter-spacing: -1px;
    color: var(--white);
    display flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    border: 1px solid;
    border-color: var(--bgcontrasttransparent);
    border-radius: 5px 0px 0px 5px;
    height: 40px;
    width: 150px;
    &:hover {
        background: ${({dispLoc}) => (dispLoc ? 'var(--lighterbluetransparent)' : 'var(--lightbluetransparent)')};
        color: var(--white);
        border-color: var(--bgcontrasttransparent);
        cursor: pointer;
    } 
`;

const PiChartsByTypeButton = styled.div`
    background: ${({dispType}) => (dispType ? 'var(--lightblue)' : 'var(--darkblueaccent)')};
    z-index: 6;
    font-family: Lato,sans-serif;
    font-weight: 200;
    letter-spacing: -1px;
    color: var(--white);
    display flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: var(--bgcontrasttransparent);
    border-radius: 0px 5px 5px 0px;
    height: 40px;
    width: 150px;

    &:hover {
        background: ${({dispType}) => (dispType ? 'var(--lighterbluetransparent)' : 'var(--lightbluetransparent)')};
        color: var(--white);
        border-color: var(--bgcontrasttransparent);
        cursor: pointer;
    } 
`;

const ExportCSVButton = styled.div`
    margin-right: 10px;
    background: ${({dispType}) => (dispType ? 'var(--lightblue)' : 'var(--darkblueaccent)')};
    z-index: 6;
    font-family: Lato,sans-serif;
    font-weight: 200;
    color: var(--white);
    display flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: var(--bgcontrasttransparent);
    border-radius: 5px;
    height: 40px;
    width: 250px;
    &:hover {
        background: ${({dispType}) => (dispType ? 'var(--lighterbluetransparent)' : 'var(--lightbluetransparent)')};
        color: var(--white);
        border-color: var(--bgcontrasttransparent);
        cursor: pointer;
    }
`;

const PiChartButtons = styled.div`
    display: flex;
    flex: 1 1 0%;
    -webkit-box-pack: center;
    align-items: center;
`;

const RawDataContainer = styled(Row)`
    --bs-gutter-x: 0rem;
    --bs-gutter-y: 0;
    display: flex;
    height: var(--rawdatacontainerheight);
    margin-top: 110px;
    padding: 20px;
`;

const BreachData = () => {
    /* A state variable to keep track of the expanded state of the sidebar */
    const [isExpended, setExpendState] = useState(true);
    const padding = isExpended ? 'var(--sidebarwidth)' : '30px';
    /* 2 state variables to control the way the pie charts and raw data information
       are organized and displayed to the page */
    const [dispType, setTypePressedState] = useState(false);
    const flipDispTypeButtonState = () => setTypePressedState(!dispType);
    const [dispLoc, setLocPressedState] = useState(false);
    const flipDispLocButtonState = () => setLocPressedState(!dispLoc);
    /* Should only be true with dispType && dispLoc are true */ 
    const showBoth = (dispType===true && dispLoc===true) ? true : false;
    /* Add a final state variable to store all selected filters so the sidebar knows what is applied or not */
    const [selectedFilters, setSelectedFilters] = useState([]);
    /* Hold all data from our breaches. This should remain static */
    const [breachData, setBreachData] = useState([]);
    /* Hold all filtered data from our breaches */
    const [filterBreachData, setFilterBreachData] = useState([]);
    /* This will hold our starting and ending date. We will default so the end date is today and the starting is a week ago */
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())); // This will be defaulted to one month ago
    const [endDate, setEndDate] = useState(new Date()); // This will just be the current

    /* This will hold all our raw data */
    const [rawDataToDisplay, setRawDataToDisplay] = useState([]);

    // This will run our db query on the inital render.
    useEffect(() => { getBreaches(); }, []);

    // Run our db query
    async function getBreaches() {
        let { data, error } = await supabase.from('breach_data').select()
        setBreachData(data);
    }

    // Our default state for our filter breach data needs to be all the data since there are no filters to begin with.
    useEffect(() => { setFilterBreachData(breachData); }, [breachData]);

    // Display filter breach data.
    useEffect(() => {
        console.log(filterBreachData);
        console.log(dispLoc);
        console.log(dispType);
    }, [filterBreachData]);

    // Run when there is a change in the selected filters array.
    useEffect(() => {
        if (selectedFilters.length > 0) {
            applyFilters();
            // Reset the raw data
            setRawDataToDisplay([]);
        } else {
            // If no filters are selected, set the filtered data to be the same as the original data.
            setFilterBreachData(breachData);

            // Reset again because there is another filter change
            setRawDataToDisplay([]);
        }
    }, [selectedFilters]);
    
    function applyFilters() {
        // Group filters by type. This is for if we have multiple types such as filtering states by WA and CA.
        const groupedFilters = selectedFilters.reduce((grouped, filter) => {
            if (filter.selected) {
                // If the filter type does not exist in the grouped filters object, create an array for it.
                if (!grouped[filter.type]) {
                    grouped[filter.type] = [];
                }
                // Add the selected filter to its respective array in the grouped filters object.
                grouped[filter.type].push(filter);
            }
            return grouped;
        }, {});
    
        // Filter the breach data based on the grouped filters.
        const filteredData = breachData.filter(data => {
            // Check if the data object matches all filter types.
            return Object.keys(groupedFilters).every(filterType => {
                // Check if the data object matches any filter within the same filter type.
                return groupedFilters[filterType].some(filter => {
                    return data[filter.type] === filter.title;
                });
            });
        });

        // Update the state with the filtered data.
        setFilterBreachData(filteredData);
    }

    function exportBreachDataToCSV() {
        if(rawDataToDisplay.length !== 0) {
            // Create a new array excluding the 'id' field
            const dataToExport = rawDataToDisplay.map(({ id, id_match, ...rest }) => rest);

            const csv = Papa.unparse(dataToExport);
            const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

            const url = URL.createObjectURL(csvData);
            let link = document.createElement('a');
            link.href = url;
            link.style = 'visibility:hidden';
            link.download = 'data_export.csv';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  

    return (
        <>  {/* Header appears first, rest below */}

            {/* Create BG elements to be displayed on the page */}
            <div className="BGUpperGradient"> </div>
            <div className="BGPiCharts"> </div>

            {/* For actual content; Begin by creating the main content box, stored in a row */}
            <MainContentRow data-testid="MainContentRow">
                {/* Initialize the main content box by adding the filters sidebar on the left.*/}
                <SidebarNavTest isExpended={isExpended} setExpendState={setExpendState}
                      selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
                {/* Now we will plugin the rest of the content to the right 
                TODO -> Modify this to have the same transition animation as the sidebar so they flow together maybe */}
                <div className="BodyPageContentBox" style={{paddingLeft: padding, transition: '0.4s ease-in'}}>                    
                    {/* Create a container dictating the style for the line graph container */}
                    <LineGraphContainer data-testid="LineGraphContainer">
                        {/* Below is a temp class to display a dummyBG image showing the containers space. Remove later. */}
                            <WideLineGraphDisp filterBreachData={filterBreachData} startDate={startDate} endDate={endDate} data-testid="WideLineGraphDisp" setRawDataToDisplay={setRawDataToDisplay} rawDataToDisplay={rawDataToDisplay} >
                            </WideLineGraphDisp>
                    </LineGraphContainer>

                    {/* Create a button list on the line split  to toggle which pi charts are displayed */}
                    <PiChartsDispControlPanel>
                    {/* Main Goal:
                        - Display Raw Data to the right in a condensed format when only one chart is displayed.
                        This also means the gray divider will not need to exist
                        - Display Raw Data below the gap when only one chart is displayed. */}
                        {/* The Two buttons */}
                        <PiChartButtons>
                            <PiChartsByLocButton dispLoc={dispLoc} onClick={flipDispLocButtonState}>
                                Breaches by Location
                            </PiChartsByLocButton>
                            <PiChartsByTypeButton dispType={dispType} onClick={flipDispTypeButtonState}>
                                Breaches by Type
                            </PiChartsByTypeButton>
                        </PiChartButtons>
                        {/* This is the export CSV button, where it will save the data as a comma seperated value and export
                         on button press (will need to add a onclick function here G.B.) */}
                        <ExportCSVButton dispType={dispType} onClick={exportBreachDataToCSV}>
                            Export CSV File of Raw Data
                        </ExportCSVButton>

                    </PiChartsDispControlPanel>

                    {/* Here be logic - This may get a bit confusing... 
                        Display different things in this container based on certain logic
                        Do the logic for each row so that we dont have to deal with transition stuff*/}
                    <>
                        {/* Condition 1: are both buttons toggled? */}
                        { showBoth ? (
                        <PiChartsContainer data-testid="PieChartsContainer">
                            {/* Both Buttons are pressed, so display the default settings */}
                            <LowerContainerElements>
                                <div className="DummyContainerDisplay">
                                    <PieChartBBLoc filterBreachData={filterBreachData} setFilterBreachData={setFilterBreachData} graphContainer={LowerContainerElements} startDate={startDate} endDate={endDate}/>
                                </div>
                                <div className="DummyContainerDisplay">
                                    <PieChartBBType filterBreachData={filterBreachData} setFilterBreachData={setFilterBreachData} graphContainer={LowerContainerElements} startDate={startDate} endDate={endDate}/>
                                </div>
                            </LowerContainerElements>
                        </PiChartsContainer>
                            // Condition 2: is only the one button pressed?
                            // One or both buttons are not pressed, so do some other logic now..
                            // At least now we know the raw data will go off to the right
                        ) : (dispType===true && dispLoc===false) ? (
                        // Condition 2.1: Only Type is enabled, so display type and hide location
                        <div> 
                            <PiChartsContainer data-testid="PieChartsContainer">
                                <LowerContainerElements>
                                    <div className="DummyContainerDisplay">
                                        <PieChartBBType filterBreachData={filterBreachData} setFilterBreachData={setFilterBreachData} graphContainer={LowerContainerElements} startDate={startDate} endDate={endDate}/>
                                    </div>
                                    <div className="DummyContainerDisplay">
                                        <RawDataDisp graphContainer={LowerContainerElements} rawDataToDisplay={rawDataToDisplay} startDate={startDate} endDate={endDate}/>
                                    </div>
                                </LowerContainerElements>
                            </PiChartsContainer>
                        </div>
                        ) : (dispType===false && dispLoc===true) ? (
                        // Condition 2.2: Only Location is enabled, so display location and hide type
                        <div> 
                            <PiChartsContainer data-testid="PieChartsContainer">
    
                                <LowerContainerElements>
                                    <div className="DummyContainerDisplay">
                                        <PieChartBBLoc filterBreachData={filterBreachData} setFilterBreachData={setFilterBreachData} graphContainer={LowerContainerElements} startDate={startDate} endDate={endDate}/>
                                    </div>
                                    <div className="DummyContainerDisplay">
                                        <RawDataDisp graphContainer={LowerContainerElements} rawDataToDisplay={rawDataToDisplay} startDate={startDate} endDate={endDate}/>
                                    </div>
                                </LowerContainerElements>
                            </PiChartsContainer>
                        </div>
                        ) : (
                        // Condition 2.3: Neither button is pressed, so display raw data display only
                        <div>
                            <PiChartsContainer data-testid="PieChartsContainer">
                                <LowerContainerElements>
                                    <div className="DummyContainerDisplay">
                                        <RawDataDisp graphContainer={LowerContainerElements} rawDataToDisplay={rawDataToDisplay} startDate={startDate} endDate={endDate}/>
                                    </div>
                                </LowerContainerElements>
                            </PiChartsContainer>
                        </div>
                        )}
                        </>
                </div>
                {/* Display the raw graph data below, only if both buttons are pressed */}
                <>
                    {showBoth ? (
                    <div>
                        <div className="BGlowerElement"/>
                        <div className="BGLowerGradient"/>
                        <RawDataContainer data-testid="RawDataDisplayContainer">
                            <RawDataDisp data-testid="RawDataDisplay" rawDataToDisplay={rawDataToDisplay} startDate={startDate} endDate={endDate}/>
                        </RawDataContainer>
                    </div>
                    ) : ( 
                        // Otherwise show nothing
                        null
                    )}
                </>
            </MainContentRow>
        </>
    )
}

export default BreachData;