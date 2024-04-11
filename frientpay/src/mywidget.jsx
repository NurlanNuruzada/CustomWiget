import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { CgClose } from "react-icons/cg";

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
        ButtonStyle: AllCustomizeButton?.data?.buttonStyle === 0 ? true : false, //classic;  //rectangle
        ButtonSize: 100,
        BorderRadius: AllCustomizeButton?.data?.borderRadius,
        Shadow: AllCustomizeButton?.data?.shadow,
        Opacity: AllCustomizeButton?.data?.opacity,
        Greeting: true,
        buttonLenght: AllCustomizeButton?.data?.getCustomButtons?.length,
        widgetColor: AllCustomizeButton?.data?.widgetColor,
    });

    const widgetHeight = (apiData.buttonLenght * 80) + (apiData.buttonLenght * 12);
    const buttonWidghtSize = AllCustomizeButton?.data?.buttonStyle === 1 ? (80 * AllCustomizeButton?.data?.buttonSize / 100) : (240 * AllCustomizeButton?.data?.buttonSize / 100);
    const buttonHeightSize = (80 * AllCustomizeButton?.data?.buttonSize) / 100;
    const widgetWidth = apiData.ButtonStyle ? 80 : (240 * apiData?.ButtonSize / 100);
    const buttonBorderRadius = AllCustomizeButton?.data?.borderRadius;
    const buttonShadow = apiData?.shadow ? apiData?.shadow : '';
    const [openWidget, setOpenWidget] = useState(false);
    const widgetStyles = {
        container: {
            position: 'fixed',
            bottom: '20px', // Adjust spacing from the bottom
            right: '20px', // Adjust spacing from the right side
            width: 'max-content', // Automatically adjust width'max-content'
            backgroundColor: 'transparent', // Background color for the widget
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: "max-content",
            overflow: "hidden",
            // backgroundColor: 'red'
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
    console.log("----->", AllCustomizeButton?.data);
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
                        <button key={index} style={{ boxShadow: (`${buttonShadow / 10}px ${buttonShadow / 5}px ${buttonShadow / 5}px black `), border: `1px solid ${apiData.widgetColor}`, borderRadius: buttonBorderRadius, marginTop: '8px', width: buttonWidghtSize, height: buttonHeightSize, opacity: openWidget === true ? 0 : (AllCustomizeButton?.data?.opacity / 100) }}>
                            <div style={{ borderRadius: buttonBorderRadius, height: (`${buttonWidghtSize / 3}px`), width: AllCustomizeButton?.data?.buttonStyle === 1 ? (`${buttonWidghtSize / 3.4}px`) : '90%', display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.data?.buttonStyle === 1 ? 'center' : 'start', alignItems: 'center' }}>
                                <SocialIcon style={{ marginLeft: '16px', display: AllCustomizeButton?.data?.buttonStyle === 1 ? "block" : "flex", width: (`${buttonHeightSize / 2}px`), height: (`${buttonHeightSize / 2}px`) }} url={isWhatsapp ? "https://whatsapp.com" : "https://www.youtube.com/"} />
                                <p style={{ marginLeft: '4px', display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: button?.name.length >10 ? (`${buttonHeightSize / 3.3}px`) : (`${buttonHeightSize / 3}px`) }}>{button?.name}</p>
                            </div>
                        </button>
                    )
                })}
                <button onClick={() => setOpenWidget((prev) => !prev)} style={{ boxShadow: (`${buttonShadow / 10}px ${buttonShadow / 5}px ${buttonShadow / 5}px black `), opacity: apiData.Opacity / 100, border: `1px solid ${apiData.widgetColor}`, marginTop: '8px', borderRadius: buttonBorderRadius, width: buttonWidghtSize, height: buttonHeightSize }}>
                    <div color={apiData.widgetColor} style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? "block" : "none" }} ><CgClose size={(`${buttonHeightSize / 2}px`)} /></div>
                    <div style={{ borderRadius: buttonBorderRadius, width: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '90%', display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.data?.buttonStyle === 1 ? 'center' : 'start' }}>
                        <div color={apiData.widgetColor} style={{ width: (`${buttonWidghtSize / 3.4}px`), height: (`${buttonWidghtSize / 3}px`), display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <CgClose size={(`${buttonHeightSize / 2}px`)} />
                        </div>
                        <p style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: (`${buttonHeightSize / 3}px`), marginLeft: '4px' }}>Close</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MyWidget;
