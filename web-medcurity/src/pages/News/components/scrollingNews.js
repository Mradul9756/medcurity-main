import React from "react";
import styled from 'styled-components';

/* Scrolling news functionality inspired from and learned off variety of reference sources:
    - https://www.youtube.com/watch?v=0wvrlOyGlq0 
    - https://www.youtube.com/watch?v=3Z780EOzIQs&t=21s
    - https://www.youtube.com/watch?v=sVZX0XvEBhk
    - https://ryanmulligan.dev/blog/css-marquee/ */

import "./scrollingNews.css"

const MostRecentArticleHippaJournalBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: white;
    padding: 5%;
    transition: transform 1s;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;

const MostRecentArticleHealthcareITNewsBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: #bd311a;
    padding: 5%;
    transition: transform 1s;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;

const MostRecentArticleGovInfoSecurityBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: white;
    padding: 5%;
    transition: transform 1s;
    z-index: 2;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;

const MostRecentArticleFierceHealthcareBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: white;
    padding: 5%;
    transition: transform 1s;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;

const MostRecentArticleHealthcareITBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: white;
    padding: 5%;
    transition: transform 1s;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;

const MostRecentArticleHealthITSecurityBG = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2%;
    background-color: var(--lightblue);
    padding: 5%;
    transition: transform 1s;

    &:hover {
        z-index: 5;
        transform: translateZ(15px);
    }
`;


const ScrollingNews = ({hipaaJournaldata, healthcareItdata, govinfodata, fiercehealthdata,
        beckershealthdata, healthitsecdata}) => {
    return (
    <>
        <div className="scrollerContainer">
            <div className="slider">
                <div className="slide-track">
                    {/* Include 5 most recent article slides. Most recent one from each site. */}
                    <div className="slide">
                        <MostRecentArticleHippaJournalBG>
                            <div className="MostRecentArticleHippaJournal">
                                {/* Contents of most recent report 1 go in here
                                - Struggling how to get this fully working at the moment */}
                            </div>
                        </MostRecentArticleHippaJournalBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthcareITNewsBG>
                            <div className="MostRecentArticle_HealthcareITNews">
                                {/* Contents of most recent report 2 go in here */}
                            </div>
                        </MostRecentArticleHealthcareITNewsBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleGovInfoSecurityBG>
                            <div className="MostRecentArticle_GovInfoSecurity">
                                {/* Contents of most recent report 3 go in here */}
                            </div>
                        </MostRecentArticleGovInfoSecurityBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleFierceHealthcareBG>
                            <div className="MostRecentArticle_FierceHealthcare">
                                {/* Contents of most recent report 4 go in here */}
                            </div>
                        </MostRecentArticleFierceHealthcareBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthcareITBG>
                            <div className="MostRecentArticle_HealthcareIT">
                                {/* Contents of most recent report 5 go in here */}
                            </div>
                        </MostRecentArticleHealthcareITBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthITSecurityBG>
                            <div className="MostRecentArticle_HealthITSecurity">
                                {/* Contents of most recent report 5 go in here */}
                            </div>
                        </MostRecentArticleHealthITSecurityBG>
                    </div>
{/* Double our slides to make it look seemless. (Can just copy down whatever you have for the first 6 below*/}
                    <div className="slide">
                        <MostRecentArticleHippaJournalBG>
                            <div className="MostRecentArticleHippaJournal">
                                {/* Contents of most recent report 1 go in here */}
                            </div>
                        </MostRecentArticleHippaJournalBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthcareITNewsBG>
                            <div className="MostRecentArticle_HealthcareITNews">
                                {/* Contents of most recent report 2 go in here */}
                            </div>
                        </MostRecentArticleHealthcareITNewsBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleGovInfoSecurityBG>
                            <div className="MostRecentArticle_GovInfoSecurity">
                                {/* Contents of most recent report 3 go in here */}
                            </div>
                        </MostRecentArticleGovInfoSecurityBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleFierceHealthcareBG>
                            <div className="MostRecentArticle_FierceHealthcare">
                                {/* Contents of most recent report 4 go in here */}
                            </div>
                        </MostRecentArticleFierceHealthcareBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthcareITBG>
                            <div className="MostRecentArticle_HealthcareIT">
                                {/* Contents of most recent report 5 go in here */}
                            </div>
                        </MostRecentArticleHealthcareITBG>
                    </div>
                    <div className="slide">
                        <MostRecentArticleHealthITSecurityBG>
                            <div className="MostRecentArticleHealthITSecurity">
                                {/* Contents of most recent report 5 go in here */}
                            </div>
                        </MostRecentArticleHealthITSecurityBG>
                    </div>
                    {/* End of mirrored slides. */}
                </div>
            </div>
        </div>
    </>
    )
}
export default ScrollingNews;