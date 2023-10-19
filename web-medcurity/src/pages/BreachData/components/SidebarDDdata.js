import React from 'react'

/* Importing data for the sidebar */

/* Icons from https://react-icons.github.io/react-icons */
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Covered Entity Type',
        icon: <MdIcons.MdPermIdentity />,
        dropdownClosed: <BsIcons.BsFillCaretRightFill />,
        dropdownOpened: <BsIcons.BsFillCaretUpFill />,
        /* The subNav is the dropdown's menu data.*/
        subNav: [
            { type: 'covered_entity_type', title: 'Business Associate', selected: false },
            { type: 'covered_entity_type', title: 'Health Plan', selected: false },
            { type: 'covered_entity_type', title: 'Healthcare Clearing House', selected: false },
            { type: 'covered_entity_type', title: 'Healthcare Provider', selected: false }
        ]
    },
    {
        title: 'Business Associate Present',
        path: '#',
        icon: <MdIcons.MdPermIdentity />,
        dropdownClosed: <BsIcons.BsFillCaretRightFill />,
        dropdownOpened: <BsIcons.BsFillCaretUpFill />,
        subNav: [
            { type: 'business_associate_present', title: 'Yes', selected: false },
            { type: 'business_associate_present', title: 'No', selected: false }
        ]
    },
    {
        title: 'Type of Breach',
        path: '#',
        icon: <MdIcons.MdPermIdentity />,
        dropdownClosed: <BsIcons.BsFillCaretRightFill />,
        dropdownOpened: <BsIcons.BsFillCaretUpFill />,
        subNav: [
            { type: 'type_of_breach', title: 'Hacking/IT Incident', selected: false },
            { type: 'type_of_breach', title: 'Improper Disposal', selected: false },
            { type: 'type_of_breach', title: 'Loss', selected: false },
            { type: 'type_of_breach', title: 'Theft', selected: false },
            { type: 'type_of_breach', title: 'Unauthorized Access/Disclosure', selected: false }
        ]
    },
    {
        title: 'Location of Breach',
        path: '#',
        icon: <MdIcons.MdPermIdentity />,
        dropdownClosed: <BsIcons.BsFillCaretRightFill />,
        dropdownOpened: <BsIcons.BsFillCaretUpFill />,
        subNav: [
            { type: 'location_of_breached_information', title: 'Network Server', selected: false },
            { type: 'location_of_breached_information', title: 'Electronic Medical Record', selected: false }, 
            { type: 'location_of_breached_information', title: 'Email', selected: false },
            { type: 'location_of_breached_information', title: 'Paper/Films', selected: false },
            { type: 'location_of_breached_information', title: 'Desktop Computer', selected: false},
            { type: 'location_of_breached_information', title: 'Laptop', selected: false},
            { type: 'location_of_breached_information', title: 'Other Portable Device', selected: false},
            { type: 'location_of_breached_information', title: 'Other', selected: false},
        ]
    },
    {
        title: 'State',
        path: '#',
        icon: <MdIcons.MdPermIdentity />,
        dropdownClosed: <BsIcons.BsFillCaretRightFill />,
        dropdownOpened: <BsIcons.BsFillCaretUpFill />,
        subNav: [
            { title: 'AL', type: 'state' },
            { title: 'AK', type: 'state' },
            { title: 'AZ', type: 'state' },
            { title: 'AR', type: 'state' },
            { title: 'CA', type: 'state' },
            { title: 'CO', type: 'state' },
            { title: 'CT', type: 'state' },
            { title: 'DE', type: 'state' },
            { title: 'FL', type: 'state' },
            { title: 'GA', type: 'state' },
            { title: 'HI', type: 'state' },
            { title: 'ID', type: 'state' },
            { title: 'IL', type: 'state' },
            { title: 'IN', type: 'state' },
            { title: 'IA', type: 'state' },
            { title: 'KS', type: 'state' },
            { title: 'KY', type: 'state' },
            { title: 'LA', type: 'state' },
            { title: 'ME', type: 'state' },
            { title: 'MD', type: 'state' },
            { title: 'MA', type: 'state' },
            { title: 'MI', type: 'state' },
            { title: 'MN', type: 'state' },
            { title: 'MS', type: 'state' },
            { title: 'MO', type: 'state' },
            { title: 'MT', type: 'state' },
            { title: 'NE', type: 'state' },
            { title: 'NV', type: 'state' },
            { title: 'NH', type: 'state' },
            { title: 'NJ', type: 'state' },
            { title: 'NM', type: 'state' },
            { title: 'NY', type: 'state' },
            { title: 'NC', type: 'state' },
            { title: 'ND', type: 'state' },
            { title: 'OH', type: 'state' },
            { title: 'OK', type: 'state' },
            { title: 'OR', type: 'state' },
            { title: 'PA', type: 'state' },
            { title: 'RI', type: 'state' },
            { title: 'SC', type: 'state' },
            { title: 'SD', type: 'state' },
            { title: 'TN', type: 'state' },
            { title: 'TX', type: 'state' },
            { title: 'UT', type: 'state' },
            { title: 'VT', type: 'state' },
            { title: 'VA', type: 'state' },
            { title: 'WA', type: 'state' },
            { title: 'WV', type: 'state' },
            { title: 'WI', type: 'state' },
            { title: 'WY', type: 'state' }
            
        ]
      }
]