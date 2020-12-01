import React from 'react';
import i18n from 'i18n';

export const Breadcrumb: React.SFC = () => (
  <div className="breadcrumb text-7">
    <ul className="breadcrumb__list">
      <li className="breadcrumb__list--item">
        <a href={`/${i18n.languages[0]}`}>Hem</a>
      </li>
      <li className="breadcrumb__list--item">
        <a>Om webbplatsen</a>
      </li>
      <li className="breadcrumb__list--item">
        <a>ThisIsThePageYouAreLookingAt</a>
      </li>
    </ul>
  </div>
);
