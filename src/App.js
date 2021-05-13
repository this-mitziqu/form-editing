import React, { Fragment } from 'react'
import Editable from './Editable';
import InputForm from './InputForm';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          result: {},
          showTable: false,
          CardIndex: false,
        };
    }

    handleResult = (response) => {
        this.setState({result: response.data, showTable: true});
    }

    reset = () => {
        this.setState({result: {}, showTable: false, CardIndex: false});
    }

    render() {
        const {showTable} = this.state;
        // const { result, showTable, CardIndex } = this.state;
        return(
            <>
                <InputForm
                handleResult = {this.handleResult}
                reset = {this.reset}
                />
                {
                    showTable?(<Editable
                    data = {this.state.result}
                    />):null
                }
            </>
        )
    }
}


export default App;