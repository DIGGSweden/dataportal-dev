import { styled } from '@digg/design-system';
import React from 'react';
import { EventEffect } from '../EventEffect';

import 'scss/general/general.scss';

const SkipLink = styled('button')`
  display: block;
  position: absolute;
  top: 0;
  padding: 2rem 4rem;
  z-index: 10;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.primary};

  transform: translateY(-100%);
  opacity: 0;

  &:focus {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const skipToContent = (ev?: React.MouseEvent) => {
  if (ev) {
    ev.preventDefault();
  }
  let content = document.querySelector('[data-content]');
  if (!content) content = document.querySelector('main');
  if (!content) return;

  const focusable = content.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const first = focusable[0];

  if (first) {
    first.focus();
  }
};

export const SkipToContent = () => (
  <EventEffect outline noHover noColorInvert>
    {({ className }) => (
      <>
        <SkipLink className={className} onClick={skipToContent}>
          Till innehållet
        </SkipLink>

        <noscript>
          <a className="skiptocontent_nojs" href="#main">Till innehållet</a>
        </noscript>
      </>
    )}
  </EventEffect>
);

/**
 * Skips to the desired element by setting focus to it
 * and scrolls it into view
 * @param id to the html-element
 * @param ev the clickEvent that occurs
 */
export const skipToElement = (id: string, ev?: React.MouseEvent) => {
  if (ev) {
    ev.preventDefault();
  }
  id = id.replace('#', '');
  const element = document.getElementById(id);
  if (!element) return;

  if (element.title == 'anchorTarget') {
    const sibling = document.getElementById(`${id}-value`);
    if (sibling) {
      sibling.tabIndex = -1;
      sibling.focus();
      element.scrollIntoView();
    }
    return;
  }

  if (element.nodeName == 'H1') {
    element.tabIndex = -1;
  }

  element.focus();
  element.scrollIntoView();
};

/**
 * When using internal links, scroll position
 * might not be at the top, this function can then
 * be used to reset the scroll
 */
export const startFromTop = () => {
  if (typeof window !== 'undefined') {
    // Dirty solution to prevent smooth scrolling
    const html = document.querySelector('html');
    html && (html.style.scrollBehavior = 'auto');

    // Scroll to top
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    // Todo: find a better solution for handling scrollbehaviour
    html && (html.style.scrollBehavior = 'smooth');
  }
};
