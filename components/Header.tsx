import { NextPage } from "next";

interface HeaderProps {
  label: string;
}

const Header: NextPage<HeaderProps> = ({ label }) => {
  return <div>{label}</div>;
};

export default Header;
