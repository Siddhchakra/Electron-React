import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props { };

class Home extends React.Component<Props, {}> {
    render() {
        return <h1> Hello There </h1>;
    }
}

ReactDOM.render(<Home />, document.querySelector('p'));