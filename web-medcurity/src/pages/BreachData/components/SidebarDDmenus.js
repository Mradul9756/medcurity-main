import React, {useState, useImperativeHandle  } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';

/* This will be the file that controls how the dropdowns function,
    their formatting, and which of the stored information is displayed in what submenus.

    TODO: Turn multiple options into a scrollable version */
    
const SidebarLink = styled(Link)`
    background: var(--darkblueaccent);
    display: flex;
    color: var(--white);
    align-items: center;
    justify-content: space-between;
    padding: 2px 5px 2px 10px;
    list-style: none;
    height: 30px;
    text-decoration: none;
    font-size: 18px;
    border-top: 1px solid var(--lightblue);

    &:hover {
        background: var(--lightblue);
        color: var(--white);
        border-left: 4px solid var(--darkerblue);
        cursor: pointer;
    }
`;

const IconTextWrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    
`;

const DDItemText = styled.span`
    display: flex;
    margin-left: 8px;
    
`;

const DropdownAction = styled(Link)`
    background: var(--lightbluebright);
    height: 20px;
    padding-left: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--darkbluebg);
    font-size: 14px;
    

    &:hover {
        background: var(--lightblue);
        color: var(--white);
        cursor: pointer;
`;

const SubMenu = React.forwardRef(( { item, selectedFilters, setSelectedFilters, resetFilters }, ref ) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    // Expose the function for the parent to call
    useImperativeHandle(ref, () => ({
        resetFilters: () => {
            const updatedSubNav = item.subNav.map((subItem) => subItem.selected = false);
            console.log(updatedSubNav)
        }
    }));

    // Add a handle select to update the selected filters state
    const handleSelect = (selectedItem) => {
        const updatedSubNav = item.subNav.map((subItem) =>
            subItem.title === selectedItem.title
                ? { ...subItem, selected: !subItem.selected }
                : subItem
        ); 
        console.log(updatedSubNav);

        const selectedItemIndex = selectedFilters.findIndex(
            (filter) => filter.title === selectedItem.title
        );

        // If the item is already in the selectedFilters array
        if (selectedItemIndex !== -1) {
            // If the item is now unselected, remove it from selectedFilters
            if (!updatedSubNav.find((subItem) => subItem.title === selectedItem.title).selected) {
                const updatedFilters = [...selectedFilters];
                updatedFilters.splice(selectedItemIndex, 1);
                setSelectedFilters(updatedFilters);
            } else {
                // If the item is still selected, update its selected state
                const updatedFilters = [...selectedFilters];
                updatedFilters[selectedItemIndex] = {
                ...selectedFilters[selectedItemIndex],
                selected: true,
                };
                setSelectedFilters(updatedFilters);
            }
            } else {
            // If the item is not in the selectedFilters array, add it
            setSelectedFilters([...selectedFilters, { ...selectedItem, selected: true }]);
        }
        

        console.log('selectedFilters:', selectedFilters);
        item.subNav=updatedSubNav;
    };
    return (
        <>
            <SidebarLink onClick={item.subNav && showSubnav} data-testid="SubnavMain">
                <IconTextWrapper>
                    {item.icon}
                    <DDItemText data-testid="Item Text">{item.title}</DDItemText>
                </IconTextWrapper>
                {/*  Line below is saying: "If option has submenu and has path/interaction, then show it,
                        otherwise, when arrow is clicked, show the closed arrow,
                        otherwise, show nothing */}
                {item.subNav && subnav 
                        ? item.dropdownOpened : item.subNav
                            ? item.dropdownClosed : null
                }

            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                const itemSelected = item.selected;
                return (
                    <DropdownAction key={index} onClick={() => handleSelect(item)}>
                        {itemSelected ? <BiIcons.BiCheckboxSquare/> : <BiIcons.BiCheckbox/>}
                        <DDItemText>{item.title}</DDItemText>
                    </DropdownAction>
                )
            })}
            {/* Additional code to show a list of all values where selected is true */}
            {!subnav && item.subNav.map((item, index) => {
                const itemSelected = item.selected;
                return (
                    itemSelected ? (
                    <DropdownAction key={index} onClick={() => handleSelect(item)}>
                        {itemSelected ? <BiIcons.BiCheckboxSquare/> : <BiIcons.BiCheckbox/>}
                        <DDItemText>{item.title}</DDItemText>
                    </DropdownAction>
                    ) : null
                )
            })}
        </>
    )
})

export default SubMenu;