import React from 'react'
import { Container, Table, Button } from 'react-bootstrap';

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    };




    renderTable() {
        const result = this.props.result;
        return result.map((app, i) => {
            return (
                <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.school}</td>
                    <td>{app.user_id}</td>
                    <td>{app.id}</td>
                    <td>{app.app_name}</td>
                    <td><Button variant="primary" onClick={() => { this.props.showDetail(i + 1, app.id); }}>点击查看</Button></td>
                </tr>
            )
        })
    }


    render() {
        return (
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
                            <th>申请详情</th>
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