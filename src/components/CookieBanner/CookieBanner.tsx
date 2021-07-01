import {
  Box,
  Button,
  colorPalette,
  Container,
  Text,
} from '@digg/design-system';
import { css } from 'emotion';
import React from 'react';
import { EventEffect } from '../EventEffect';
import {
  LocalStoreContext,
  LocalStoreContextData,
} from '../LocalStoreProvider';
import { NoServerRender } from '../NoServerRender';
import { Link } from 'react-router-dom';

const MainContent = Box.withComponent('main');

export class CookieBanner extends React.Component {
  acceptCookies = (localStore: LocalStoreContextData) =>
    localStore.set({ cookiesAccepted: true });

  render() {
    return (
      <NoServerRender>
        <LocalStoreContext.Consumer>
          {(localStore) => {
            return (
              !localStore.store.cookiesAccepted && (
                <Box
                  className="cookiebanner"
                  position="fixed"
                  bottom={true}
                  left
                  width="100%"
                  zIndex={100}
                >
                  <Container>
                    <MainContent
                      className="detailpage main-container"
                      flex="1 1 auto"
                    >
                      <div className="cookiebanner">
                        <div className="cookiebanner__text">
                          <span className="text-5">
                            På dataportal.se använder vi kakor (cookies) för att
                            webbplatsen ska fungera på ett bra sätt för dig. Med
                            hjälp av webbanalys och anonymiserad data
                            vidareutvecklas webbplatsen ytterligare. Genom att
                            surfa vidare godkänner du att vi använder kakor.
                            <Link
                              to="Kakor"
                              className="text-5"
                            >
                              Läs mer om kakor
                            </Link>
                          </span>
                        </div>
                        <div className="cookiebanner__button">
                          <button
                            className="primary-btn"
                            onClick={() => this.acceptCookies(localStore)}
                          >
                            Jag förstår
                          </button>
                        </div>
                      </div>
                    </MainContent>
                  </Container>
                </Box>
              )
            );
          }}
        </LocalStoreContext.Consumer>
      </NoServerRender>
    );
  }
}
