import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import Link from '@docusaurus/Link';

export default function Navbar(props) {
  return (
    <>
      <OriginalNavbar {...props} />
      {/* Additional interactive elements can be added here */}
    </>
  );
}