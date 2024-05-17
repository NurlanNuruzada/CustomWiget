import React from 'react';
import ReactDOM from 'react-dom';
import MyWidget from './mywidget'; // Adjust the path as necessary

function getScriptParams() {
    const scripts = document.getElementsByTagName('script');
    const myWidgetScript = Array.from(scripts).find(script => script.src.includes('my-widget.js'));
    if (!myWidgetScript) {
        console.error('my-widget.js script not found.');
        return {};
    }
    const queryString = new URL(myWidgetScript.src).search;
    const params = new URLSearchParams(queryString);
    return {
        id: params.get('id'),
        name: params.get('name')
    };
}

const { id, name } = getScriptParams();

if (!id) {
    console.error('ID not found in script URL parameters.');
} else {
    ReactDOM.render(
        <MyWidget id={id} name={name} />,
        document.getElementById('widget-container')
    );
}