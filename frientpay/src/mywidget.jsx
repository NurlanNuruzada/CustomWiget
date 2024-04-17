import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { CgClose } from "react-icons/cg";
import ReplymentLogo1 from "./Vector.png";
import { MdClose } from "react-icons/md";


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

    };
    console.log("----->", AllCustomizeButton?.data);

    const [notSocialIcon, setNotSocialIcon] = useState(false);
    useEffect(() => {
        // SelectedButtons içerisinde "Skype", "Waze", "Call" veya "Google Maps" varsa notSocialIcon true yap
        if (AllCustomizeButton?.data?.getCustomButtons.some(button => ["Skype", "Waze", "Call", "Google Maps"].includes(button.name))) {
            setNotSocialIcon(true);
        } else {
            setNotSocialIcon(false); // Eğer listede bu butonlar yoksa notSocialIcon false yap
        }
    }, [AllCustomizeButton?.data?.getCustomButtons]);

    return (
        <div style={{ position: 'fixed', bottom: '2%', right: '1.8%', display: 'flex', flexDirection: "column", left: AllCustomizeButton?.data?.position === false && '1.5%', right: AllCustomizeButton?.data?.position === true && '1.8%' }} className={widgetStyles.LiveYourButtons}>
            {AllCustomizeButton?.data?.getCustomButtons && AllCustomizeButton?.data?.getCustomButtons.map((button, index) => (
                <button key={index} style={{ backgroundColor: 'transparent', boxShadow: (`${AllCustomizeButton?.data?.shadow / 10}px ${AllCustomizeButton?.data?.shadow / 5}px ${AllCustomizeButton?.data?.shadow / 5}px black `), border: AllCustomizeButton?.data?.buttonStyle !== 1 && `1px solid ${AllCustomizeButton?.data?.widgetColor}`, borderRadius: AllCustomizeButton?.data?.borderRadius / 2.35, width: buttonWidghtSize, height: buttonHeightSize, opacity: openWidget ? 0 : AllCustomizeButton?.data?.opacity / 100 }} className={widgetStyles.yourButton}>
                    {notSocialIcon === true &&
                        <img style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? "block" : "none" }} src={'https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s='} />
                    }
                    {notSocialIcon === false &&
                        <SocialIcon style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? "block" : "none", width: '100%', height: '100%' }} url={button.addressUrl} />
                    }
                    <div className={widgetStyles.yourButtonInDiv} style={{ borderRadius: AllCustomizeButton?.data?.borderRadius, width: AllCustomizeButton?.data?.buttonStyle === 1 ? '100%' : '90%', display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.data?.buttonStyle === 1 ? 'center' : 'start', }}>
                        {notSocialIcon === true &&
                            <img src={'https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s='} />
                        }
                        {notSocialIcon === false &&
                            <SocialIcon style={{ width: (`${buttonWidghtSize / 3.4}px`), height: (`${buttonWidghtSize / 3.4}px`) }} url={button.url} />
                        }
                        <p className={widgetStyles.yourButtonInDivInP} style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: button.name.length > 10 ? (`${buttonHeightSize / 3.8}px`) : (`${buttonHeightSize / 3}px`) }}>{button.name}</p>
                    </div>
                </button>
            ))}
            <button onClick={() => setOpenWidget((open) => !open)} style={{ boxShadow: (`${AllCustomizeButton?.data?.shadow / 10}px ${AllCustomizeButton?.data?.shadow / 5}px ${AllCustomizeButton?.data?.shadow / 5}px black `), opacity: AllCustomizeButton?.data?.opacity / 100, border: AllCustomizeButton?.data?.buttonStyle !== 1 && `1px solid ${AllCustomizeButton?.data?.widgetColor}`, borderRadius: AllCustomizeButton?.data?.borderRadius / 2.35, width: buttonWidghtSize, height: buttonHeightSize }} className={widgetStyles.yourButton}>
                <img style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? "block" : "none", width: '93%', height: '93%' }} src={ReplymentLogo1} />
                <div className={widgetStyles.yourButtonInDiv} style={{ borderRadius: AllCustomizeButton?.data?.borderRadius, width: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '90%', display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : 'flex', justifyContent: AllCustomizeButton?.data?.buttonStyle === 1 ? 'center' : 'start' }}>
                    <MdClose color={AllCustomizeButton?.data?.widgetColor} style={{ width: (`${buttonWidghtSize / 3.4}px`), height: (`${buttonWidghtSize / 3.}px`) }} />
                    <p className={widgetStyles.yourButtonInDivInP} style={{ display: AllCustomizeButton?.data?.buttonStyle === 1 ? 'none' : '', color: 'black', fontSize: (`${buttonHeightSize / 3}px`) }}>Close</p>
                </div>
            </button>
        </div>

        // <div></div>
    );
};

export default MyWidget;
