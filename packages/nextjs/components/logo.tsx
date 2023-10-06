import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "usehooks-ts";

interface Props {
  href?: string;
}

const Logo: FC<Props> = ({ href = "/" }) => {
  const [darkMode, setDarkMode] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <Link href={href}>
      {darkMode ? (
        <Image src={`/logo/dark.svg`} alt="header-logo" width="40" height="40" />
      ) : (
        <Image src={`/logo/light.svg`} alt="header-logo" width="40" height="40" />
      )}
    </Link>
  );
};

export default Logo;
