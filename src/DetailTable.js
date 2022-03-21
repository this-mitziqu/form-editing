import React, { useState } from 'react';
import { Descriptions } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button } from 'react-bootstrap';



class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_info: false,
      loading: false,
    }
  };

  renderDescription = () => {
    const detail = this.props.detail;

    return Object.keys(detail).map((key, idx) => {
      if (idx > 8) {
        return (
          <Descriptions.Item
            style={{ border: '1px solid #000' }}
            label={key} labelStyle={{ fontWeight: "bold", minWidth: "20%" }}
            contentStyle={{ whiteSpace: "pre-line" }}>
            {detail[key]}
          </Descriptions.Item>
        )
      } else {
        if (this.state.show_info) {
          return (
            <Descriptions.Item
              style={{ border: '1px solid #000' }}
              label={key}
              labelStyle={{ fontWeight: "bold" }}
              contentStyle={{ whiteSpace: "pre-line" }}>
              {detail[key]}
            </Descriptions.Item>
          )
        }
      }
    })
  }

  // const columns = [
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //   },
  //   {
  //     title: '学校',
  //     dataIndex: 'school',
  //   },
  //   {
  //     title: '个人ID',
  //     dataIndex: 'user_id',
  //   },
  //   {
  //     title: '申请ID',
  //     dataIndex: 'id',
  //   },
  //   {
  //     title: '申请/报名类别',
  //     dataIndex: 'app_name',
  //   }
  // ]
  render() {
    return (
      <Container className="pb-5">
        {/* <Table
          bordered
          dataSource={[detail]}
          columns={columns}
          pagination={ false }
          rowKey='id'
          defaultExpandAllRows = {true}
        /> */}
        <div className="pt-4 d-flex justify-content-center">
          <Button className='me-4' variant="success" onClick={() => { this.setState(prevState => ({ show_info: !prevState.show_info })); this.renderDescription() }}>显示/隐藏基本信息</Button>
          <a className='me-4' href="https://forms.gle/eQ4ScK3syB6JEYXP8" target='_blank' rel="noreferrer" >
            <Button variant="primary" >
              打开审核问卷
            </Button>
          </a>
          <Button className='me-4' variant="primary" onClick={() => this.props.goBack()}>返回列表</Button>
        </div>
        <Descriptions
          title="申请者信息"
          column={1}
          bordered>
          {this.renderDescription()}
        </Descriptions>
        <div className="pt-4 d-flex justify-content-evenly">
          <Button variant="primary" onClick={() => this.props.goBack()}>返回列表</Button>
        </div>

      </Container>
    );
  };
}

export default DetailTable;