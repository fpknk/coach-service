import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { ServiceStyle } from '../styles/ServiceStyle';

export default function Service({ service }) {
  //Extract info from props
  const { Title, Price, Images, Slug } = service.attributes;
  return (
    <ServiceStyle>
      <Link href={`service/${Slug}`}>
        <div>
          <img src={Images.data.attributes.formats.small.url} alt='' />
        </div>
      </Link>
      <h2>{Title}</h2>
      <h3>$ {Price}</h3>
    </ServiceStyle>
  );
}
