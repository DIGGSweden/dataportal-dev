import {
  Box,
  colorPalette,
  Container,
  Divider,
  FacebookIcon,
  Heading,
  LinkedinIcon,
  Logo,
  styled,
  Text,
  themes,
  TwitterIcon,
  YoutubeIcon,
} from '@digg/design-system';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { EventEffect } from '../EventEffect';
import { ScrollToTop } from '../ScrollToTop';
import { SettingsContext } from '../SettingsProvider';
import i18n from 'i18n';

import 'scss/footer/footer.scss';

export interface FooterProps {
  onToTopButtonPushed: () => void;
}

const FooterBox = Box.withComponent('footer');

const SocialIcons: { [key: string]: typeof TwitterIcon } = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  linkedIn: LinkedinIcon,
};

export class Footer extends React.Component<FooterProps> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <FooterBox
        className="footer"
        bgColor=""
        paddingX={2}
        // paddingTop={4}
        lang="sv"
      >
        <Text>
          <Container>
            <SettingsContext.Consumer>
              {(settings) => (
                <>
                  <Box>
                    <Box className="footer-main">
                      <Box className="footer__links">
                        <div className="footer__links-nav">
                          <a
                            href="#"
                            className="footer-link text-6-link"
                          >
                            Lorem ipsum dolor
                          </a>

                        </div>
                        <div className="footer__links-contact">
                              {/* Space for twitter/facebook.. */}

                        </div>
                      </Box>
                      <Box className="digg__">
                        <Box width="15rem" marginRight={2}>
                          {process.env.CLIENT && (
                            <Logo
                              aria-label="Diggs logotyp"
                              id="footer"
                              mode="wide"
                              width={30 * 16}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </SettingsContext.Consumer>
          </Container>
        </Text>
      </FooterBox>
    );
  }
}
