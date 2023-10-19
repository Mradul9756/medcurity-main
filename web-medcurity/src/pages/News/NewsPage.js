import React, { useState, useEffect }from "react";
import styled from 'styled-components';

import ScrollingNews from "./components/scrollingNews";
import "./NewsPage.css";

import { supabase } from '../../Supabase/supabase.js'


// Define styles
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const CircleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 5vw;
`;

const Circle = styled.div`
  width: 12vw;
  height: calc(12vw);
  border-radius: 50%;
  background-color: var(--lightblue);
  z-index: 1;
`;

const LineRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vw;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const Line = styled.div`
  height: 1vh;
  width: 12vw;
  background-color: var(--darkbluebg);
`;

const ArticleListBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  margin-top: 3vh;
  padding-left: 10%;
  padding-right: 10%;
  height: 1000px;
  background-color: var(--graymedcuritylight);
`;

const ContentListContainer = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: var(--dynamic-button-pressed);
margin-top: 1vh;
  z-index: 2;
  
`;

const ArticleLink = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  font-family: Lato,sans-serif;
  font-size: 1.25em;
  font-weight: 400;
  letter-spacing: -1px;
  color: var(--darkbluebg);
  text-align: left;
  padding: 5px;
`;

const ArticleContentBySite = ({ index, healthitsecdata, hipaaJournaldata,
       healthcareItdata, govinfodata, fiercehealthdata, beckershealthdata }) => {
  // conditional statement for rending the article page based on the circle pressed.
  if (index === 1) {
    // Display the content for the first site on first circle.
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {hipaaJournaldata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  } else if (index === 2) {
    // Display the content for the second site on second circle.
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {healthcareItdata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  } else if (index === 3) {
    // Display the content for the third site on third circle.
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {govinfodata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  } else if (index === 4) {
    // Display the content for the fourth site on fourth circle.
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {fiercehealthdata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  } else if (index === 5) {
    // Display the content for the fifth site on fifth circle.
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {beckershealthdata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  } else {
    // Display the content for the sixth site on sixth circle. 
    return (
      <ArticleListBox>
        {/* map out the article listing area so that we display the appropriate article list */}
        {healthitsecdata.map((item, index) => (
          // Define a container with its own style for each article in the list 
          // but first define the href link so we can access it by clicking anywhere on container            
          <a href={item.url} key={index} style={{ textDecoration: 'none'}}>
          <ContentListContainer>
            {/* Make it so we display the text but make it iteractable via click */}
            <ArticleLink><b>{index+1})</b> {item.title}</ArticleLink>
          </ContentListContainer>
          </a>
        ))}
      </ArticleListBox> 
    );
  }
};

const NewsPage = () => {
  // Define state to keep track of which circle is pressed
  const [activeCircleIndex, setActiveCircleIndex] = useState(0);

  /* Hold all data from the selected sites table. This should remain static */
  const [hipaaJournaldata, setHipaaData] = useState([]);
  const [healthcareItdata, setHealthCareItData] = useState([]);
  const [govinfodata, setGovInfoData] = useState([]);
  const [fiercehealthdata, setFierceHealthData] = useState([]);
  const [beckershealthdata, setBeckersHealthData] = useState([]);
  const [healthitsecdata, setHealthItSecData] = useState([]);

  // use effects for calling the  getting data.
  useEffect(() => { getHipaaData(); }, []);
  useEffect(() => { getHealthCareItData(); }, []);
  useEffect(() => { getGovInfoData(); }, []);
  useEffect(() => { getFierceHealthData(); }, []);
  useEffect(() => { getBeckersHealthData(); }, []);
  useEffect(() => { getHealthItSecData(); }, []);

  // get and set data from supabase
  async function getHipaaData() {
    let { data, error } = await supabase.from('hippa_journal_news').select().order('id', {ascending:false}).limit(10);
    setHipaaData(data); }
  async function getHealthCareItData() {
    let { data, error } = await supabase.from('healthcare_it').select().order('id', {ascending:false}).limit(10);
    setHealthCareItData(data); }
  async function getGovInfoData() {
    let { data, error } = await supabase.from('gov_info').select().order('id', {ascending:false}).limit(10);
    setGovInfoData(data);}
  async function getFierceHealthData() {
    let { data, error } = await supabase.from('fierce_health').select().order('id', {ascending:false}).limit(10);
    setFierceHealthData(data); }
  async function getBeckersHealthData() {
    let { data, error } = await supabase.from('becker_health_it').select().order('id', {ascending:false}).limit(10);
    setBeckersHealthData(data); }
  async function getHealthItSecData() {
    let { data, error } = await supabase.from('health_it_security').select().order('id', {ascending:false}).limit(10);
    setHealthItSecData(data);}

  return (
    <>
      {/* // This will be the initial, primary space for any background elements to be assigned, much like the breachdata page. */}
      <div className="BGArticleContent"/>
      {/* Here, we initialize our scrolling news articles component from the scrolling news page. */}
      <ScrollingNews  hipaaJournaldata={hipaaJournaldata} healthcareItdata={healthcareItdata} govinfodata={govinfodata}
      fiercehealthdata={fiercehealthdata} beckershealthdata={beckershealthdata} healthitsecdata={healthitsecdata}/>
      {/* Now we initialize the visibility of the different news page logos for people to
          switch between what articles they want to view. */}
      <MainContainer>
        {/* Create our row of circles and lines. */}
        <CircleRow>
            <Circle key={0} onClick={() => setActiveCircleIndex(0)} style={{opacity: activeCircleIndex === 0 ? 1 : 0.5}}>
              <div className="CircleOne"/>
            </Circle>
            <Circle key={1} onClick={() => setActiveCircleIndex(1)} style={{opacity: activeCircleIndex === 1 ? 1 : 0.5}}>
              <div className="CircleTwo"/>
            </Circle>
            <Circle key={2} onClick={() => setActiveCircleIndex(2)} style={{opacity: activeCircleIndex === 2 ? 1 : 0.5}}>
              <div className="CircleThree"/>
            </Circle>
            <Circle key={3} onClick={() => setActiveCircleIndex(3)} style={{opacity: activeCircleIndex === 3 ? 1 : 0.5}}>
              <div className="CircleFour"/>
            </Circle>
            <Circle key={4} onClick={() => setActiveCircleIndex(4)} style={{opacity: activeCircleIndex === 4 ? 1 : 0.5}}>
              <div className="CircleFive"/>
            </Circle>
            <Circle key={5} onClick={() => setActiveCircleIndex(5)} style={{opacity: activeCircleIndex === 5 ? 1 : 0.5}}>
              <div className="CircleSix"/>
            </Circle>
        </CircleRow>
        {/* We do the same for the lines, so they are treated equally.*/}
        <LineRow>
          {[...Array(6)].map((_, index) => (
            <Line 
              key={index}
              onClick={() => setActiveCircleIndex(index)}
              style={{
                opacity: activeCircleIndex === index ? 1 : 0.5,
              }}
            />
          ))}
        </LineRow>
        {/* The next section will be a flexbox with the news articles. These will go in a vertical list,
            left aligned (or center aligned), scrolling down to the bottom of the page. */}
        <ArticleContentBySite index={activeCircleIndex + 1} hipaaJournaldata={hipaaJournaldata} healthcareItdata={healthcareItdata}
            govinfodata={govinfodata} fiercehealthdata={fiercehealthdata} beckershealthdata={beckershealthdata} healthitsecdata={healthitsecdata}/>
      </MainContainer>
    </>
  )
}
export default NewsPage;
