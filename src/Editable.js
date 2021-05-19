// https://www.pluralsight.com/guides/creating-dynamic-editable-tables-with-reactjs

import React, { useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// function mapTable(data) {
//   if (Array.isArray(data)) {
//   return data.map((app, appIdx) => {
//     return(
//     <Table striped bordered hover responsive>
//       <tr>
//         {mapTable(app)}
//       </tr>
//     </Table>
//     )
//   })
// } else {
//     return(
//     <td>{Object.keys(data).map((val) => {
//       return(
//         {mapTable(data)}
//       )
//     })}
//   </td>)
// }
// }


class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.result,
      trackInfo: JSON.parse(props.result.trackInfo),
      inEditMode: false,
    };
  }

  editing() {

  }
  
  mapTable(data, trackInfo) {
    if (Array.isArray(trackInfo)) {
    return trackInfo.map((app, appIdx) => {
      return(
      <Table striped bordered hover responsive>
        <tr>
          <th>姓名</th>
          <th>学校</th>
          <th>类别</th>
          <th>最近更新时间</th>
          <th>步骤</th>
          <th>编辑</th>
        </tr>
        <tr>
            <td>{data.name}</td>
            <td>{data.school}</td>
            <td>{app.branchName}</td>
            <td>{app.lastUpdateTime}</td>
            <td className="p-0 w-50">
              <Table striped hover responsive className="m-0">
                <tr>
                  <th>进度</th>
                  <th>状态</th>
  
                </tr>
                  {app.steps.map((step,idx) => {
                    return(
                      <tr key={idx}>
                        <td key={"stepName"+idx}>{step.stepName}</td>
                        <td key={"stepStatus"+idx}>{step.stepStatus}</td>
                      </tr>
                      )
                  })}
              </Table>
            </td>
            <td><Button variant="primary" onClick={()=>this.editing}>编辑</Button></td>
        </tr>
      </Table>
      )
    })
  }
  }


  render() {
    const {data, trackInfo} = this.state;
    return (
      <Container>
        {this.mapTable(data, trackInfo)}
        <div className="text-center">
          <Button variant="primary" onClick={() => this.props.onClick()}>返回列表</Button>
        </div>
      </Container>
    )
  }
}

export default Editable
