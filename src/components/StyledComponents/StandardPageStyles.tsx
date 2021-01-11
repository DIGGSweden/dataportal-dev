import { styled, colorPalette } from '@digg/design-system';

export const PixelWrapper = styled('div')`
  margin-top: 48px;
  padding-bottom: 16px;
  &:empty {
    margin: 0px;
  }
`;

export const PageNavigation = styled('div')`
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  width: 100%;
  float: right;
  top: 32px;
  padding: 0 16px 16px 16px;
  right: 0px;

  @media screen and (max-width: 56.1875rem) {
    width: 100%;
    position: unset;
    float: unset;
    padding-left: 0px;
    padding-bottom: 0px;
    /* margin-top: 32px; */
    margin-bottom: 48px;
    /* margin-bottom: 48px; */
  }

  nav {
    max-width: 350px;
    min-width: 250px;

    @media screen and (max-width: 56.1875rem) {
      max-width: 40rem;
    }
  }

  .anchorLinks {
    display: flex;
    flex-direction: column;

    a {
      color: ${colorPalette.black100};
      line-height: 24px;
      padding-bottom: 8px;
      padding-left: 16px;
      border-left: 2px solid ${colorPalette.black10};

      &:active {
        border-left: 2px solid ${colorPalette.pink100};
        font-weight: bold;
      }

      &:hover {
        border-left: 2px solid ${colorPalette.black10};
        color: ${colorPalette.blackhover};
      }
    }
  }
`;
