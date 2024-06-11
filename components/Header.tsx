import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref legacyBehavior>
          <a className="text-white text-2xl font-bold">Product Store</a>
        </Link>
        <Link href="/productCreate" passHref legacyBehavior>
          <a className="text-white text-lg font-semibold">Create Product</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;


// The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.