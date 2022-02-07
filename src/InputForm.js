import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Form, InputGroup, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from './Loading'

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      type: '',
      loading: false
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleSubmit(event) {
    this.props.reset();
    this.setState({loading: true});
    axios.post('https://apply.veritaschina.org/api/app-search.php', {
      query: this.state.query,
      type: this.state.type
    }
      ).then((response) => {
        this.setState({loading: false});
        if (typeof(response.data) == "string" || response.data.length === 0) {
          alert("你查询的信息不存在");
        } else {
          this.props.handleResult(response);
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
    event.preventDefault();
  }

  render() {
    return (
      <Container className="py-5">
    <Form onSubmit={this.handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <Form.Control 
        as="select"
        value={this.state.type || '请选择类别'} 
        onChange={this.handleTypeChange}
        >
          <option disabled>请选择类别</option>
          <option>姓名</option>
          <option value='类别'>报名类别（如OL28）</option>
          <option>报名id</option>
          <option>个人id</option>
        </Form.Control>
        </InputGroup.Prepend>
          <Form.Control
            placeholder="请输入查找内容"
            aria-label="请输入查找内容"
            aria-describedby="basic-addon2"
            type="text" 
            value={this.state.query || ''} 
            onChange={this.handleQueryChange}
          />
        <InputGroup.Append>
          <Button variant="primary" type="submit" value="Submit">查询进度</Button>
        </InputGroup.Append>
      </InputGroup>


    </Form>
  <div>
    {
      this.state.loading?<Loading message="查询中..." />:null
    }
  </div>
  </Container>
    );
  }
}

ReactDOM.render(
  <InputForm />,
  document.getElementById('root')
);

export default InputForm;