import React from 'react';
import successIcon from '../../images/infoTooltip__icon_success.svg';
import errorIcon from '../../images/infoTooltip__icon_error.svg';

const InfoTooltip = ({ isOpenInfoTooltip, isSuccess, successText, errorText, }) => {
    return (
        <div className={`info ${isOpenInfoTooltip ? 'info_opened' : ''}`}>
            <div className='info__container'>
                <img
                    src={isSuccess ? successIcon : errorIcon}
                    alt={isSuccess ? successText : errorText}
                    className='info__icon'
                />
                <h2 className='info__title'>
                    {isSuccess ? successText : errorText}
                </h2>
            </div>
        </div>
    );
};

export default InfoTooltip;