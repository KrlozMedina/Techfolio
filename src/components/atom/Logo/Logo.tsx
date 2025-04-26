import React from 'react';
import Image from 'next/image';
import style from './Logo.module.css';
import Link from 'next/link';

interface LogoProps {
  label?: string;
  isHeader?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  label = "Krloz Medina </>",
  isHeader = false,
}) => {
  return isHeader ? (
    <Link href="/" className={style["logo__link"]}>
      <Image
        src="https://i.imgur.com/LGfotuO.png"
        alt="Logo Krloz Medina"
        width={100}
        height={40}
        className={style["logo__image"]}
        priority
      />
    </Link>
  ) : (
    <h1 className={style["logo__text"]}>{label}</h1>
  );
};

export default Logo;