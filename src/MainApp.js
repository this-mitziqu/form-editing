import React from 'react'
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import InfoTable from './InfoTable';
import InputForm from './InputForm';
import ResultTable from './ResultTable';


class MainApp extends React.Component {
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
        this.setState({showTable: false, EditableIndex: i});
    }

    render() {
        const {showTable, EditableIndex} = this.state;
        // const { result, showTable, EditableIndex } = this.state;
        return(
            <Container fluid className="min-vh-100 px-0 d-flex flex-column justify-content-between">
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
                    EditableIndex?(<InfoTable
                        result = {this.state.result[EditableIndex - 1]}
                        goBack = {()=>this.setState({showTable: true, EditableIndex: false})} 
                    />):null
                }
                <Footer />
            </Container>
        )
    }
}


export default MainApp;