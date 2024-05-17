import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyWidget = ({ id }) => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const response = await axios.get(`https://api.replyment.com/api/Customize/GetCustomizeByDomainId?domainId=${id}`);
                if (response.data && response.data.buttons) {
                    setButtons(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch styles:', error);
            }
        };

        fetchStyles();
    }, [id]);
    
    const widgetStyle = {
        position: 'fixed', // Fixed position
        bottom: '10px', // Top margin
        right: '10px', // Right margin
        zIndex: 1000, // Make sure it's on top of other elements
        display: 'flex', // Display buttons in a row
        flexDirection: 'column', // Align buttons vertically
        alignItems: 'flex-end' // Align buttons to the right
    };

    return (
        <div style={widgetStyle}>
            {buttons?.buttons?.map((button, index) => (
                <button key={index} onClick={() => window.open(button.link, "_blank")}>
                    {button.name}
                </button> 
            ))}
        </div>
    );
};

export default MyWidget;
