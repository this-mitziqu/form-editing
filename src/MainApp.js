import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import Footer from './Footer';
import axios from 'axios'
import InfoTable from './DetailTable';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import Loading from './Loading'


class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showTable: false,
      EditableIndex: false,
      detail: {}
    };
  }

  handleResult = (response) => {
    this.setState({ result: response.data, showTable: true });
  }

  reset = () => {
    this.setState({ result: {}, showTable: false, EditableIndex: false });
  }

  fetchAppDetail = (app_id) => {
    this.setState({ detail: {}, loading: true });
    axios.get('https://apply.veritaschina.org/slim/team2022-detail', {
      params: {
        query: app_id,
      }
    }
    ).then((response) => {
      this.setState({ loading: false });
      console.log(response.data)
      if (response.data.length === 0) {
        alert("你查询的信息不存在");
      } else {
        this.setState({ detail: response.data[0] });
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

  showDetail = (i, id) => {
    this.fetchAppDetail(id);
    this.setState({ showTable: false, EditableIndex: i });
  }

  render() {
    const { showTable, EditableIndex } = this.state;
    // const { result, showTable, EditableIndex } = this.state;
    return (
      <Container fluid className="min-vh-100 px-0 d-flex flex-column justify-content-between">
        <Navbar bg="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://www.veritaschina.org/assets/img/veritas/trans_logo.png"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <InputForm
          handleResult={this.handleResult}
          reset={this.reset}
        />
        {
          showTable ? (<ResultTable
            result={this.state.result}
            showDetail={this.showDetail}
          />) : null
        }
        {
          EditableIndex ? (<InfoTable
            detail={this.state.detail}
            goBack={() => this.setState({ showTable: true, EditableIndex: false })}
          />) : null
        }
        {
          this.state.loading ? <Loading message="加载中..." /> : null
        }
        <Footer />
      </Container>
    )
  }
}


export default MainApp;