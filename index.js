import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Entry from './src/container/entry';


// export  default function Welcome(props) {
//     return <div>{`hello world, ${props.name}`}</div>
// }



ReactDOM.render(
    <Entry />,
    document.getElementById('react-root')
);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(Welcome);
