import {
  Box,
  Container,
  styled,
  MenuIcon,
  CloseIcon,
} from '@digg/design-system';
import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DataportalLogo } from '../../assets/Logo';
import { EventEffect } from '../EventEffect';
import { skipToContent } from '../SkipToContent';
import i18n from 'i18n';
import 'scss/header/header.scss';
import 'scss/general/general.scss';
import { SettingsContext } from 'components/SettingsProvider';
import FocusTrap from 'focus-trap-react';

const InnerBox = styled(Box)`
  pointer-events: auto;
`;

interface HeaderProps {
  activeLink?: string;
}

export class Header extends React.Component<HeaderProps, any> {
  setFocusOnMenuButton() {
    skipToContent();
  }

  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      showMenu: false,
      focusTrap: false,
    };
  }

  toggleShowOrHideMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
    this.setState({ focusTrap: !this.state.focusTrap });
  };

  openMenu = () => {
    this.setState({ showMenu: true });
    this.setState({ focusTrap: true });
    document.body.setAttribute('style', `position:fixed;`);
  };

  closeMenu = () => {
    this.setState({ showMenu: false });
    this.setState({ focusTrap: false });
    document.body.setAttribute('style', ``);
  };




  render() {
    return (
      <>
        <header>
          <InnerBox paddingY={0} paddingX={2}>
            <Container>

              <FocusTrap active={this.state.focusTrap}>

                <Box className="header-box">
                  <EventEffect outline noHover>
                    {({ className }) => (
                      <Link
                        onClick={this.closeMenu}
                        to={`/${i18n.languages[0]}`}
                        aria-label={i18n.t('common|logo-title')}
                        className={'dataportal-logo'}
                      >
                        <Box>
                          <div className="logo-box">
                            <DataportalLogo />
                          </div>
                        </Box>
                      </Link>
                    )}
                  </EventEffect>

                  {this.state.showMenu ? (
                    <button
                      aria-label={i18n.t('common|close')}
                      className="nav-btn close-menu-btn"
                      onClick={this.closeMenu}
                    >
                      <CloseIcon className="close-icon"></CloseIcon>{' '}
                      <span className="nav-btn--text text-6">
                        {' '}
                        {i18n.t('common|close')}
                      </span>
                    </button>
                  ) : (

                    <button
                      aria-label={i18n.t('common|menu')}
                      className={
                        'nav-btn' + (this.state.showMenu ? ' nav-btn--open' : '')
                      }
                      onClick={this.openMenu}
                    >
                      <MenuIcon className="menu-icon"></MenuIcon>
                      <span className="nav-btn--text text-6">
                        {i18n.t('common|menu')}
                      </span>
                    </button>
                  )}

                  <div
                    className={
                      'menu-bg' + (this.state.showMenu ? ' menu-bg--active' : '')
                    }
                  ></div>
                  <nav
                    className={
                      'header-links' +
                      (this.state.showMenu ? '--active text-5' : '')
                    }
                  >
                    <SettingsContext.Consumer>
                      {(settings) => (
                        <>
                          {settings.mainmenu &&
                            settings.mainmenu[0] &&
                            settings.mainmenu[0].children &&
                            settings.mainmenu[0].children
                              ?.sort(
                                (a, b) =>
                                  parseInt(a.data.indexOrder + '0') -
                                  parseInt(b.data.indexOrder + '0')
                              )
                              .map((m, i) => {
                                //connectedContent set
                                if (m && m.data && m.data.connectedContent) {
                                  return (
                                    <Link
                                      onClick={this.closeMenu}
                                      key={i}
                                      className={
                                        'header-link ' +
                                        (this.props.activeLink == 'Om oss' ||
                                          this.props.activeLink == 'About us'
                                          ? 'active'
                                          : '')
                                      }
                                      to={`/${i18n.languages[0]}${m.data.urlsegment}`}
                                    >
                                      {m.data.title}
                                    </Link>
                                  );
                                }
                                //externalurl set
                                else if (m && m.data && m.data.externalUrl) {
                                  return (
                                    <a
                                      key={i}
                                      className={'header-link external-link'}
                                      href={m.data.externalUrl}
                                    >
                                      {m.data.title}
                                    </a>
                                  );
                                }
                                //default empty
                                return;
                              })}
                        </>
                      )}
                    </SettingsContext.Consumer>
                    <div
                      className="click-outside"
                      onClick={this.closeMenu}
                    ></div>
                  </nav>
                </Box>
              </FocusTrap>
            </Container>
          </InnerBox>
        </header>
      </>
    );
  }
}
