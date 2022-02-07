import React, { Component } from 'react'
import { Button, Input, Form } from 'antd';
import 'antd/dist/antd.css';
// import 'bootstrap/dist/css/bootstrap.css';
import MainApp from './MainApp';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            passIsCorr: false,
            validateStatus: '',
          };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.value==='') {
            this.setState({passIsCorr: true})
        } else {
            this.setState({validateStatus: 'error'})
        }
    }

    render() {
        return(
            <>
            {this.state.passIsCorr?
            <MainApp/>:
            <div className="d-flex flex-column justify-content-center vh-100">
                <Form layout="inline" className='justify-content-center'>
                        <Form.Item
                        validateStatus= {this.state.validateStatus}
                        className="w-50"
                        >
                        <Input.Password 
                                placeholder="请输入密码" 
                                onChange={this.handleChange}
                                onPressEnter={this.handleSubmit}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit}>
                                验证
                            </Button>
                        </Form.Item>
                </Form>
            </div>       
            }
            </>
        )}
}

export default App;