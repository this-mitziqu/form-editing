import React, { useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import EditableTable from './EditableTable'
import Loading from './Loading'



  const InfoTable = (props) => {
    const result = props.result;
    const [trackInfo, setInfo] = useState(JSON.parse(result.trackInfo));
    const [syncing, setSyncing] = useState(false);

    const getSteps = (steps, idx) => {
      var newInfo = [...trackInfo];
      newInfo[idx].steps = steps;
      var d = new Date();
      newInfo[idx].lastUpdateTime = d.getFullYear() + '-' + (("0" + (d.getMonth()+1)).slice(-2)) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      setInfo(newInfo);
    }

    const goSync = () => {
      axios.post('https://apply.veritaschina.org/api/app-update.php', {
        trackInfo: trackInfo,
        id: result.id
      }
        ).then((response) => {
          setSyncing(false);
        //   if (typeof(response.data) == "string" || response.data.length === 0) {
        //     alert("你查询的ID不存在");
        //   } else {
        //     this.props.handleResult(response);
        //   }
        }
        ).catch(function (error) {
          alert("上传失败，请检查网络");
          if (error.response) {
            console.log(error.response.headers);
          } 
          else if (error.request) {
              console.log(error.request);
          } 
          else {
            console.log(error.message);
          }
        console.log(error.config);
      });
    }

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

      const expandedRowRender = (_, idx) => {
        return(
          <EditableTable
          originData = {trackInfo[idx]}
          getSteps = {getSteps}
          idx = {idx}
        />

        )
      }

      return(
          <Table
          bordered
          dataSource={trackInfo}
          columns={columns}
          pagination={ false }
          rowKey='branchName'
          expandable={{ expandedRowRender }}
          />
      )}

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '学校',
        dataIndex: 'school',
      },
      {
        title: '个人ID',
        dataIndex: 'user_id',
      },
      {
        title: '申请ID',
        dataIndex: 'id',
      },
      {
        title: '申请/报名类别',
        dataIndex: 'appName',
      }
    ]

    return (
      <Container className="pb-5">
        <Table
          bordered
          dataSource={[result]}
          columns={columns}
          pagination={ false }
          rowKey='id'
          expandable={{ expandedRowRender }}
          defaultExpandAllRows = {true}
        />
      
        <div className="pt-4 d-flex justify-content-evenly">
          <Button variant="success" 
                  onClick={() => {
                      setSyncing(true);
                      goSync();
                      }}>
                上传到数据库
          </Button>
          <Button variant="primary" onClick={() => props.goBack()}>返回列表</Button>
        </div>
        {syncing?<Loading message="上传中..." />:null}
      </Container>
    );
  };

export default InfoTable