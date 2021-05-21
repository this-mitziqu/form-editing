import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import EditableTable from './EditableTable'



  const InfoTable = (props) => {
    const result = props.result;
    const originData = JSON.parse(result.trackInfo);

    // const goSync = () => {
    //   axios.post('https://apply.veritaschina.org/api/track.php', {
    //     query: this.state.value
    //   }
    //     ).then((response) => {
    //       this.setState({loading: false});
    //       if (typeof(response.data) == "string" || response.data.length === 0) {
    //         alert("你查询的ID不存在");
    //       } else {
    //         this.props.handleResult(response);
    //       }
    //     }
    //     ).catch(function (error) {
    //       alert("查询错误");
    //       if (error.response) {
    //         console.log(error.response.headers);
    //       } 
    //       else if (error.request) {
    //           console.log(error.request);
    //       } 
    //       else {
    //         console.log(error.message);
    //       }
    //     console.log(error.config);
    //   });
    // }

    const expandedRowRender = () => {
      const columns = [
        {
          title: '所属申请',
          dataIndex: 'branchName',
        },
        {
          title: '最近更新时间',
          dataIndex: 'lastUpdateTime',
        }]

      return(
        <div className='d-flex flex-column justify-content-evenly'>
        {originData.map((el) => {
        return(
          <div>
        <EditableTable 
        originData = {el}
        columns = {columns}
        />
          </div>
          )}
      )}
      </div>
      )}

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '申请/报名类别',
        dataIndex: 'appName',
      }
    ]

    return (
      <Container>
        <Table
          bordered
          dataSource={[result]}
          columns={columns}
          pagination={ false }
          rowKey="uid"
          expandable={{ expandedRowRender }}
        />
      
        <div className="pt-4 d-flex justify-content-evenly">
          <Button variant="success" onClick={() => this.goSync()}>上传到数据库</Button>
          <Button variant="primary" onClick={() => props.goBack()}>返回列表</Button>
        </div>
      </Container>
    );
  };

export default InfoTable