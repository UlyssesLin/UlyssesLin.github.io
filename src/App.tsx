import * as React from "react"
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { mockAPICall } from "./store/actionCreators"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";

// import { useRef } from 'react'; // usable with the below TODO

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const App: React.FC = () => {
  const payload: GenericObject = useSelector(
    (state: DashboardState) => state,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  // Run the mock API call
  useEffect(() : any => dispatch(mockAPICall()), [dispatch]);

  // Number->Dollar conversion helper
  const convertToDollars = (amount: number): string => {
    return '$' + amount.toLocaleString();
  };

  
  // TODO: A better method would be to use the below to check if a month has already
  // labeled a tick, providing a more direct way to avoid month label replication
  // let monthRef: { current: string[] } = useRef([]);
  // const checkMonth = (month: string): boolean => {
  //   if (!monthRef.current.includes(month)) {
  //     monthRef.current.push(month);
  //     return true;
  //   }
  //   return false;
  // };

  // Converts numbers to dollar strings for table cell values
  const parseForTable = (sales: GenericObject[]): GenericObject[] => {
    let newSales: GenericObject[] = [];
    if (sales.length) {
      newSales = sales.map((sale) => {
        return {
          ...sale,
          retailSales: convertToDollars(sale.retailSales),
          wholesaleSales: convertToDollars(sale.wholesaleSales),
          retailerMargin: convertToDollars(sale.retailerMargin)
        }
      });
    }
    return newSales;
  };

  return (
    <>
      <header><a href="https://www.stackline.com/"><img id="sl_logo" src="sl_logo.svg" alt="Company logo"/></a></header>
      <main>
        <Container fluid id="cards_wrapper">
          <Row>
            <Col xs={12} sm={4} lg={3} xl={2}>
              <Card id="product_info" className="card_area">
                <Card.Img variant="top" src={payload.image} />
                <Card.Body>
                  <Card.Title>{payload.title}</Card.Title>
                  <Card.Text>{payload.subtitle}</Card.Text>
                  <div id="tags_area">
                    {payload?.tags.map((tag: string) => {
                      return <span key={tag} className="tag">{tag}</span>;
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={8} lg={9} xl={10}>
              <Stack gap={3}>
                <Card id="graph" className="card_area">
                  <Card.Title id="graph_title">Retail Sales</Card.Title>
                  <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart width={500} height={300} data={payload?.sales}>
                      <YAxis type="number" domain={[-1000000, 2000000]} hide />
                      <XAxis 
                        dataKey="weekEnding" 
                        interval={4} 
                        padding={{ left: 30, right: 30 }} 
                        style={{fontWeight: '100', fontSize: '10px', stroke: '#b6c0d0'}} 
                        tickLine={false} 
                        tickFormatter={(date): string => {
                          // Takes the month from sales dates; currently the method is to use every 4th date
                          // to avoid duplication of months displayed
                          let curr: string = new Date(date).toLocaleString('default', { month: 'short' }).toUpperCase();
                          // return checkMonth(curr) ? curr : ''; // currently not working as desired
                          return curr;
                        }} />
                      <Line type="monotone" dataKey="retailSales" stroke="#45a8f6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="wholesaleSales" stroke="#9ba6bf" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  </Card>
                  <Card id="table" className="card_area">
                    <DataTable value={parseForTable(payload?.sales)} tableStyle={{ minWidth: '50rem' }}>
                      <Column field="weekEnding" header="WEEK ENDING" sortable style={{ width: '17%' }}></Column>
                      <Column field="retailSales" header="RETAIL SALES" sortable style={{ width: '20%' }}></Column>
                      <Column field="wholesaleSales" header="WHOLESALE SALES" sortable style={{ width: '20%' }}></Column>
                      <Column field="unitsSold" header="UNITS SOLD" sortable style={{ width: '20%' }}></Column>
                      <Column field="retailerMargin" header="RETAILER MARGIN" sortable style={{ width: '20%' }}></Column>
                    </DataTable>
                  </Card>
              </Stack>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default App;
