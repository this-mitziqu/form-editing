import React from 'react'
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios'

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            submission: {}
        }       
    };


    fetchAppDetail(id) {
        axios.post('https://apply.veritaschina.org/api/app-fetch-detail.php', {
            query: id,
          }
            ).then((response) => {
              this.setState({loading: false});
              console.log(response)
              if (response.data.length === 0) {
                alert("你查询的信息不存在");
              } else {
                this.setState({submission: JSON.parse(response.data[0])});
              }
            }
            ).catch(function (error) {
              alert("查询错误");
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
        //   event.preventDefault(); 
    }



    renderTable() {
        const result = this.props.result;
        return result.map((app, i) => {
            return(
                    <tr key={i+1}>
                    <td>{i+1}</td>
                    <td>{app.name}</td>
                    <td>{app.school}</td>
                    <td>{app.user_id}</td>
                    <td>{app.id}</td>
                    <td>{app.appName}</td>
                    <td>{JSON.parse(app.trackInfo)[0].steps[1].stepStatus}</td>
                    <td><Button variant="primary" onClick={()=>{this.props.showEditable(i+1);this.fetchAppDetail(app.id)}}>点击查看</Button></td>
                    </tr>
            )
        })
    }

    
    render() {
    return(
        <Container className="px-1 px-md-4 mx-auto">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>学校</th>
                    <th>个人ID</th>
                    <th>申请ID</th>
                    <th>申请/报名类别</th>
                    <th>申请状态</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </Table>
        </Container>
    );
    }
}

export default ResultTable;