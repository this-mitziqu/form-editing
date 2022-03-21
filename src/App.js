import React, { Component } from 'react'
import { Button, Input, Form } from 'antd';
import 'antd/dist/antd.css';
// import 'bootstrap/dist/css/bootstrap.css';
import MainApp from './MainApp';
import CryptoJs from 'crypto-js'
import axios from 'axios'


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
        this.setState({ value: e.target.value });
    }

    handleSubmit = (e) => {
        var self = this;
        e.preventDefault();
        axios.post('https://apply.veritaschina.org/api/team2022-app-pass.php', {
            query: CryptoJs.SHA1(this.state.value).toString(),
        }
        ).then((response) => {
            self.setState({ loading: false });
            console.log(response.data);
            if (typeof (response.data) == "string" || response.data.length === 0) {
                alert("验证失败");
                self.setState({ validateStatus: 'error' })
            } else {
                self.setState({ passIsCorr: true })
            }
        }
        ).catch(function (error) {
            alert("验证失败");
            self.setState({ validateStatus: 'error' })
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
        e.preventDefault();
    }

    render() {
        return (
            <>
                {this.state.passIsCorr ?
                    <MainApp /> :
                    <div className="d-flex flex-column justify-content-center vh-100">
                        <Form layout="inline" className='justify-content-center'>
                            <Form.Item
                                validateStatus={this.state.validateStatus}
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
        )
    }
}

export default App;