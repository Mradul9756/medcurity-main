import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const RawDataAllDisp = styled.div`
  padding: 10px;
  radius: 10px;
  align-items: center;
  list-style: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const RawDataAllDispText = styled.div`
  display: flex;
  color: var(--darkblueaccent);
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  height: 100%
`;

const TableStyles = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  font-family: Lato, sans-serif;
  background-color: rgba(15,45,69,.65);
  padding: 20px;
  width: 100%;
  display: relative;
  overflow: auto;

  th {
    background-color: rgba(23,77,125,.6);
    color: white;
    font-weight: bold;
    text-align: left;
    padding: 12px;
    border: 1px solid var(--darkbluebg);
    
  }

  td {
    background-color: hsla(0,0%,100%,0.6);
    padding: 12px;
    border: 1px solid var(--darkblueaccent);
  }

  tbody tr:hover {
    background-color: var(--darkblueaccent);
  }
`;

const RawDataDisp = ({ rawDataToDisplay }) => {
    /* Variable Functions go here */
  
    return (
      <>
        {rawDataToDisplay.length === 0 ? (
          <RawDataAllDispText>Click on a point to see some data!</RawDataAllDispText>
        ) : (
          <RawDataAllDisp>
            <div style={{width: '100%', height: '100%', background: 'rgba(130,130,130,0.1)'}}>
              <TableStyles>
                {/* <Table bordered hover style={{border: 'var(--bgcontrasttransparent)'}}> */}
                  <thead>
                    <tr>
                      <th>Name of Covered Entity</th>
                      <th>State</th>
                      <th>Covered Entity Type</th>
                      <th>Individuals Affected</th>
                      <th>Breach Submission Date</th>
                      <th>Type of Breach</th>
                      <th>Location of Breached Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawDataToDisplay.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name_of_covered_entity}</td>
                        <td>{item.state}</td>
                        <td>{item.covered_entity_type}</td>
                        <td>{item.individuals_affected}</td>
                        <td>{item.breach_submission_date}</td>
                        <td>{item.type_of_breach}</td>
                        <td>{item.location_of_breached_information}</td>
                      </tr>
                    ))}
                  </tbody>
                {/* </Table> */}
              </TableStyles>
            </div>
          </RawDataAllDisp>
        )}
      </>
    );
  };
  

export default RawDataDisp;