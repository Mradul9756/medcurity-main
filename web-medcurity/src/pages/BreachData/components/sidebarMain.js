import React, {useRef} from "react";
import styled from 'styled-components';

// import other container bases
import SidebarCalander from "./SidebarCalander";
import {SidebarData} from './SidebarDDdata'; /* Import the data for the sidebar */
import SubMenu from './SidebarDDmenus'; /* Import the data for the sidebar */

import "./sidebarMain.css";

const HeaderField = styled.div`
    display:flex;
    height: 45px;
    width: 100%;
`;

const ResetFiltersButton = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--lightblueaccent);
    border: 2px solid var(--darkblueaccent);
    border-radius: 10px;
    color: var(--white);
    justify-content: center;
    font-family: Lato, sans-serif;
    font-size: 24px;
    height: 100%;
    padding: 0px 5px 0px 5px;
    & :hover {
        cursor: pointer;
    }
`;

const DropdownContainer = styled.div`
    z-index: 7;
`;
const LowerEmptyContainer = styled.div`
    flex: 1;
    height: 50px;
    width: 100%,
    min-height: 150px;
    z-index: 7;
    border-top: 1px solid var(--darkblueaccent);
`;


const SidebarNavTest = ({ isExpended, setExpendState, selectedFilters, setSelectedFilters, setStartDate, setEndDate, startDate, endDate}) => {
   
    const subMenuRefs = SidebarData.map(() => React.createRef());
    
    function resetFilters() {
        console.log(selectedFilters);
        setSelectedFilters([])
        
        // Call the function in each child component
        subMenuRefs.forEach(ref => {
            ref.current.resetFilters();
        });
    }

    return (
        /*  Now we are in the sidebar, first design the expanded and compressed containers.
            This way we will not have to apply these conditions to every element within them */
        <div className={isExpended ? "main-filter-nav nav-expanded-width" :
                                     "main-filter-nav nav-compressed-width"} data-testid="Main-Filter-Nav">
                {/*---------- THE EXPANDED FILTERS CONTAINER (Below) --------------*/}
                {/* Effectively saying: "Create the expanded sidebar container, then put it either on or off
                                         of the screen depending on the sidebar button state in isExpended" */}
                <div className={isExpended ? "filter-nav-container-box nav-expanded-width filter-nav-onscreen" :
                                             "filter-nav-container-box nav-expanded-width filter-nav-offscreen"} data-testid="Expanded-Nav-Container">
                    {/* Styled expanded filter container for independant style */}  

                    <div className="expanded-filter-style" data-testid="Expanded Filter Style">
                        {/* Styled comp. for formatting grid structure of expanded filters menu */}
                        <div className="expanded-filter-grid" data-testid="Expanded-Filter-Grid">
                            {/* The Expanded Filters Sidebar Header */}
                            <div className="expanded-filter-header" data-testid="Expanded-Filter-Header">
                                
                                {/* The Apply Filters Row */}
                                <HeaderField>
                                    <ResetFiltersButton onClick={() => {resetFilters()}}>
                                        <div style={{paddingTop: "2px"}}>Reset Filters</div>
                                    </ResetFiltersButton>
                                </HeaderField>
                                <button className={ isExpended? "pullout-button-sidebar pullout-button-in" :
                                                                "container-hidden"} onClick={() => {setExpendState(!isExpended);}}>
                                    <span></span><span></span><span></span>
                                </button>
                            </div>
                            {/* The Calandar Section */}
                            <SidebarCalander setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>

                            {/* The Dropdown Filters Section */}
                            <DropdownContainer>
                                {SidebarData.map((item, index) => {
                                    return <SubMenu item={item} key={index} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} ref={subMenuRefs[index]}/>;
                                })}
                                <LowerEmptyContainer></LowerEmptyContainer>
                            </DropdownContainer>
                            {/* Filters Expanded Sidebar Finished */}
                        </div>
                    </div>
                </div>
                {/* END OF EXPANDED FILTERS CONTAINER */}

                {/* THE COLLAPSED FILTERS CONTAINER */}
                {/* Effectively saying: "Put the expanded container on or off the screen based on buttons state"*/}
                <div className={isExpended ?
                                "filter-nav-container nav-compressed-width filter-nav-offscreen" :
                                "filter-nav-container nav-compressed-width filter-nav-onscreen"}>
                    <button className={
                            isExpended? "container-hidden" : "pullout-button pullout-button-out"}
                            onClick={() => setExpendState(!isExpended)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className="compressed-filter-style" data-testid="Compressed Filter Style">
                    </div>
                </div>
                {/* END OF COLLAPSED FILTERS CONTAINER */}
        </div>
    );
};

export default SidebarNavTest;