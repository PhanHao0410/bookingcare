import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class HomeHeader extends Component {
    changeLanguge = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='icon-left'><i className="fas fa-bars"></i></div>
                            <div className='img-left-content'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeHeader.specialty" /></b></div>
                                <div className='title-header'><FormattedMessage id="homeHeader.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeHeader.facility" /></b></div>
                                <div className='title-header'><FormattedMessage id="homeHeader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeHeader.doctor" /></b></div>
                                <div className='title-header'><FormattedMessage id="homeHeader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeHeader.check-package" /></b></div>
                                <div className='title-header'><FormattedMessage id="homeHeader.general-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='icon-support-header'><i className="fas fa-question-circle"></i><span><FormattedMessage id="homeHeader.header-support" /></span></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguge(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguge(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='header-banner-container'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="homeHeader.medical-background" /></div>
                        <div className='title2'><FormattedMessage id="homeHeader.health-care" /></div>
                        <div className='search-header'>
                            <i className=" fas fa-search"></i>

                            <input type='text' placeholder={language === LANGUAGES.VI ? 'Tìm phòng khám' : 'Find health clinic'} />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.speciali-exam" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.remote-exam" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.general-exam" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vials"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.medical-test" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-heartbeat"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.mental-health" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-ambulance"></i></div>
                                <div className='title-child'><FormattedMessage id="homeHeader.medical-product" /></div>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
