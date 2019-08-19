import React from 'react';
import Icon1 from '../../../assets/img/icon-first.png';
import Icon2 from '../../../assets/img/icon-second.png';
import Icon3 from '../../../assets/img/icon-third.png';
import BgPNG from '../../../assets/img/back@3x.png';
import SchemePNG from '../../../assets/img/cvc@3x.png';
import Scheme1PNG from '../../../assets/img/scheme1.png';
import luxLogoPng from '../../../assets/img/luxoft-03-logo-white@3x.png';
import classSet from 'react-classset';
import './HomePage.scss';
import {doNavigate} from '../../../index';
import {ENTITY_MODIFIERS, users} from '../../../utils';
import Footer from '../../common/Footer/Footer';


export default class HomePage extends React.Component {
    state = {
        cardClicked: false,
        loaded: false,
        page: 1,
        pageChanged: false
    };

    componentDidMount() {
        document.getElementById('page-wrapper').style.overflow = 'hidden';
        setTimeout(() => this.setState({loaded: true}), 100)
    }

    render() {
        const classes = classSet({
            'fade-blow': true,
            active: this.state.cardClicked || !this.state.loaded,
            page: true,
            home: true
        });

        const {page, pageChanged} = this.state;

        const pa = users[ENTITY_MODIFIERS.PATIENT];
        const tc = users[ENTITY_MODIFIERS.TREATMENT_CENTER];
        const mf = users[ENTITY_MODIFIERS.MANUFACTURER];
        const cr = users[ENTITY_MODIFIERS.COURIER];
        const rm = users[ENTITY_MODIFIERS.RISK_MANAGER];

        const archClasses = classSet({
            architecture: true,
            fade: true,
            active: pageChanged,
            about: page === -1
        });

        const demoClasses = classSet({
            demo: true,
            fade: true,
            active: pageChanged
        });

        return (
            <main className={classes} style={{backgroundImage: `url(${BgPNG})`}}>
                <header>
                    <div className='title-wrapper'>
                        <div className='logo-wrapper'>
                            <img src={luxLogoPng} alt='Luxoft Logo' />
                        </div>
                        <div className='header-wrapper'>
                            <h1>Blockchain-powered solution for personalized medicine</h1>
                            <button onClick={this.handleNewRequestClick} className='new-request-btn'>
                                New patient request
                            </button>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <a className={page === 1 ? 'active' : ''} onClick={this.handleToDemo}>Demo</a>
                                </li>
                                <li>
                                    <a className={page === 0 ? 'active' : ''} onClick={this.handleToArchitecture}>
                                        Architecture
                                    </a>
                                </li>
                                <li>
                                    <a className={page === -1 ? 'active' : ''} onClick={this.handleToAbout}>
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <article>
                    <div className="content-wrapper">
                        {
                            page === 0
                                ? <div className={archClasses}>
                                    <img src={Scheme1PNG} data-rjs="3" alt="Architecture"/>
                                </div>
                                : page === 1
                                ? <div className={demoClasses}>
                                    <div className='text-card'>
                                        <img className='icon' src={Icon1} alt=""/>
                                        <div className='text'>
                                            <p>
                                                <b>Patients</b> have all their identity verifications in the app,
                                                giving them ability to identify themselves at <b>treatment centres</b> in
                                                order to request a personalized medicine for their condition.
                                            </p>
                                            <p>
                                                They can track <b>delivery process</b> and receive <b>notifications</b> when
                                                the medicine is ready.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='text-card'>
                                        <img className='icon' src={Icon2} alt=""/>
                                        <div className='text'>
                                            <p>
                                                <b>Treatment centres</b> are authorised to create medicine production
                                                requests to the <b>Manufacturing companies</b>.
                                            </p>
                                            <p>
                                                After the request is made, it is possible
                                                to <b>track the manufacturing</b> and <b>delivery process</b>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='text-card'>
                                        <img className='icon' src={Icon3} alt=""/>
                                        <div className='text'>
                                            <p>
                                                <b>Manufacturers</b> digitalize production, so that is it clear when
                                                the drug is ready, packed and shipped.
                                            </p>
                                            <p>
                                                Shared information includes delivery requirements, such as temperature
                                                and vibration levels, which can be synced with the smart Dewar
                                                containers automatically when needed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                : <div className={archClasses}>
                                    <div className='text-wrapper'>
                                        <p>Trusted Identity backed by credentials</p>
                                        <p>Patient privacy is preserved</p>
                                        <p>Digital proof of every change of custody is tracked</p>
                                        <p>Quality certificates are attached to the package</p>
                                        <p>Embedded license and certification enforcement</p>
                                    </div>
                                    <img src={SchemePNG} data-rjs="3" alt="About"/>
                                </div>
                        }
                    </div>
                </article>
                <Footer/>
            </main>
        )
    }

    handleToArchitecture = () => {
        if (this.state.page !== 0) {
            this.setState(
                {pageChanged: true},
                () => setTimeout(() => this.setState(
                    {page: 0},
                    () => setTimeout(() => this.setState({pageChanged: false}), 100)
                ), 300)
            );
        }
    };

    handleToAbout = () => {
        if (this.state.page !== -1) {
            this.setState(
                {pageChanged: true},
                () => setTimeout(() => this.setState(
                    {page: -1},
                    () => setTimeout(() => this.setState({pageChanged: false}), 100)
                ), 300)
            );
        }
    };

    handleToDemo = () => {
        if (this.state.page !== 1) {
            this.setState(
                {pageChanged: true},
                () => setTimeout(() => this.setState(
                    {page: 1},
                    () => setTimeout(() => this.setState({pageChanged: false}), 100)
                ), 300)
            );
        }
    };

    handleNewRequestClick = () => {
        setTimeout(() => {
            doNavigate('/request');
        }, 300)
    };
}
