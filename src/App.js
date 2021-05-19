import React, { Fragment } from 'react'
import Editable from './Editable';
import EditableTable from './EditableTable';
import InputForm from './InputForm';
import ResultTable from './ResultTable';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          result: {},
          showTable: false,
          EditableIndex: false,
        };
    }

    handleResult = (response) => {
        this.setState({result: response.data, showTable: true});
    }

    reset = () => {
        this.setState({result: {}, showTable: false, EditableIndex: false});
    }

    showEditable = (i) => {
        console.log(i);
        this.setState({showTable: false, EditableIndex: i});
    }

    render() {
        const {showTable, EditableIndex} = this.state;
        // const { result, showTable, EditableIndex } = this.state;
        return(
            <>
                <InputForm
                handleResult = {this.handleResult}
                reset = {this.reset}
                />
                {
                    showTable?(<ResultTable
                    result = {this.state.result}
                    showEditable = {this.showEditable}
                    />):null
                }
                {
                    EditableIndex?(<EditableTable
                        result = {this.state.result[EditableIndex - 1]}
                        onClick = {()=>this.setState({showTable: true, EditableIndex: false})} 
                    />):null
                }
            </>
        )
    }
}


export default App;