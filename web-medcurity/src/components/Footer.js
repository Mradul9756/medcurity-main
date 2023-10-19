import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.div`
    background-color: var(--darkbluebg);
    color: var(--white);
    align-items: center;
    height: 4vh;
    z-index: 20;
`;

// The bottom bar for the website
function Footer() {

    return (
        <>
            <FooterBar></FooterBar>
        </>
    );
}

export default Footer;