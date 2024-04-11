import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';

const MyWidget = ({ id, name }) => {
    // State to hold button styles
  
    const [buttonStyles, setButtonStyles] = useState({
        color: '#f200ff', // Default style
        fontSize: '24px',
        textAlign: 'center'
    });
    const [buttons, setButtons] = useState([]);
    const [AllCustomizeButton, setAllCustomizeButton] = useState();

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                // Fetching styles based on the provided domain ID
                const response = await axios.get(`https://api.replyment.com/api/WidgetAllStyles?DomainId=${id}`);
                if (response.data) {
                    setAllCustomizeButton(response)
                    // Update buttons array from the response
                    setButtons(response.data.buttons);
                    // Update styles based on the fetched data
                    setButtonStyles(prevStyles => ({
                        ...prevStyles,
                        color: response.data.color || prevStyles.color,
                        fontSize: response.data.fontSize || prevStyles.fontSize,
                        textAlign: response.data.textAlign || prevStyles.textAlign,
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch styles:', error);
            }
        };

        fetchStyles();
    }, [id]); // Dependency array includes id to re-fetch when it changes
    const [apiData, setApiData] = useState({
        ButtonStyle: AllCustomizeButton?.buttonStyle === 0 ? true : false, //classic;  //rectangle
        ButtonSize: 100,
        BorderRadius: AllCustomizeButton?.borderRadius,
        Shadow: AllCustomizeButton?.shadow,
        Opacity: AllCustomizeButton?.opacity,
        Greeting: true,
        buttonLenght: AllCustomizeButton?.getCustomButtons?.length,
        widgetColor: AllCustomizeButton?.widgetColor,
    });

    const widgetHeight = (apiData.buttonLenght * 80) + (apiData.buttonLenght * 12);
    const buttonWidghtSize = AllCustomizeButton?.buttonStyle === 1 ? (80 * AllCustomizeButton?.buttonSize / 100) : (240 * AllCustomizeButton?.buttonSize / 100);
    const buttonHeightSize = (80 * AllCustomizeButton?.buttonSize) / 100;
    const widgetWidth = apiData.ButtonStyle ? 80 : (240 * apiData?.ButtonSize / 100);
    const buttonBorderRadius = apiData.BorderRadius;
    const buttonShadow = apiData?.shadow ? apiData?.shadow : '';
    const [openWidget, setOpenWidget] = useState(false);
    const widgetStyles = {
        container: {
            position: 'fixed',
            bottom: '20px', // Adjust spacing from the bottom
            right: '20px', // Adjust spacing from the right side
            width: 'max-content', // Automatically adjust width
            backgroundColor: 'transparent', // Background color for the widget
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height:"max-content",
            overflow:"hidden"
        },
        button: {
            padding: '10px 20px',
            margin: '10px 0', // Space between buttons
            borderRadius: '5px', // Rounded corners for buttons
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        },
        title: {
            color: '#f200ff',
            fontSize: '24px',
            textAlign: 'center',
        },
        details: {
            fontSize: '16px',
            color: '#333',
            margin: '10px 0',
        }
    };
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px', // Adjust spacing from the bottom
            right: '20px', // Adjust spacing from the right side
        }}>
            <div style={widgetStyles.container} >
                {AllCustomizeButton?.data?.getCustomButtons.map((button, index) => {
                    var socialNetworkAddresUrl = button?.addressUrl;
                    var isWhatsapp = button?.isWhatsapp;
                    return (
                        <button key={index} style={{ boxShadow: (`${buttonShadow / 10}px ${buttonShadow / 5}px ${buttonShadow / 5}px black `), border: `1px solid green`, borderRadius: buttonBorderRadius, width: buttonWidghtSize, height: buttonHeightSize, opacity: openWidget === true ? 0 : (AllCustomizeButton?.opacity / 100) }}>
                            <div style={{ borderRadius: buttonBorderRadius, width: AllCustomizeButton?.buttonStyle === 1 ? '100%' : '90%', display: AllCustomizeButton?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.buttonStyle === 1 ? 'center' : 'start', }}>
                                <SocialIcon style={{ display: AllCustomizeButton?.buttonStyle === 1 ? "block" : "none", width: '100%', height: '100%' }} bgColor="white" fgColor='green' url={"https://www.youtube.com/watch?v=_Wyf7Xm7-j8"} />
                                <p style={{ display: AllCustomizeButton?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: (`${buttonHeightSize / 3}px`) }}>{button?.name}</p>
                            </div>
                        </button>
                    )
                })
                }
                <button onClick={() => setOpenWidget((prev) => !prev)} style={{ boxShadow: (`${buttonShadow / 10}px ${buttonShadow / 5}px ${buttonShadow / 5}px black `), opacity: apiData.Opacity / 100, border: `1px solid ${apiData.widgetColor}`, borderRadius: buttonBorderRadius, width: buttonWidghtSize, height: buttonHeightSize }}>
                    <div color={apiData.widgetColor} style={{ display: AllCustomizeButton?.buttonStyle === 1 ? "block" : "none" }} >X</div>
                    <div style={{ borderRadius: buttonBorderRadius, width: AllCustomizeButton?.buttonStyle === 1 ? 'none' : '90%', display: AllCustomizeButton?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.buttonStyle === 1 ? 'center' : 'start' }}>
                        <div color={apiData.widgetColor} style={{ width: (`${buttonWidghtSize / 3.4}px`), height: (`${buttonWidghtSize / 3.}px`) }} >X</div>
                        <p style={{ display: AllCustomizeButton?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: (`${buttonHeightSize / 3}px`) }}>Close</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MyWidget;
