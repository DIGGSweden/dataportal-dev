import {
  Box,
  Container,
  Logo,
  Text,

} from '@digg/design-system';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { SettingsContext } from '../SettingsProvider';
import i18n from 'i18n';

import 'scss/footer/footer.scss';

export interface FooterProps {
  onToTopButtonPushed: () => void;
}

const FooterBox = Box.withComponent('footer');

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
                        {settings.footermenu &&
                            settings.footermenu[0] &&
                            settings.footermenu[0].children &&
                            settings.footermenu[0].children
                              ?.sort(
                                (a, b) =>
                                  parseInt(a.data.indexOrder + '0') -
                                  parseInt(b.data.indexOrder + '0')
                              )
                              .map((m, i) => {
                                var output = [];

                                if (m && m.data && m.data.externalUrl) {
                                  output.push(
                                    <a
                                      className={'footer-link text-6-link'}
                                      href={m.data.externalUrl}
                                      target="_blank"
                                    >
                                      {m.data.title}
                                    </a>
                                  );
                                } else if (
                                  m &&
                                  m.data &&
                                  m.data.connectedContent
                                )
                                  output.push(
                                    <a
                                      className={'footer-link text-6-link'}
                                      href={`/${i18n.languages[0]}${m.data.urlsegment}`}
                                    >
                                      {m.data.title}
                                    </a>
                                  );
                                else if (m && m.data && m.data.title) {
                                  var parent: any = [];

                                  if (m && m.children && m.children.length > 0)
                                    m.children
                                      .sort(
                                        (a, b) =>
                                          parseInt(a.data.indexOrder + '0') -
                                          parseInt(b.data.indexOrder + '0')
                                      )
                                      .map((c) => {
                                        if (c && c.data && c.data.externalUrl)
                                          parent.push(
                                            <a
                                              className={
                                                'footer-link text-6-link'
                                              }
                                              href={c.data.externalUrl}
                                              target="_blank"
                                            >
                                              {c.data.title}
                                            </a>
                                          );

                                        if (
                                          c &&
                                          c.data &&
                                          c.data.connectedContent
                                        )
                                          parent.push(
                                            <a
                                              className={
                                                'footer-link text-6-link'
                                              }
                                              href={`/${i18n.languages[0]}${c.data.urlsegment}`}
                                            >
                                              {c.data.title}
                                            </a>
                                          );
                                      });

                                  output.push(
                                    <ul>
                                      <li className="text-5-bold footer__links-nav--heading">
                                        {m.data.title}
                                      </li>
                                      {parent.map((p: any) => {
                                        return <li>{p}</li>;
                                      })}
                                    </ul>
                                  );
                                }

                                return output;
                              })}

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
