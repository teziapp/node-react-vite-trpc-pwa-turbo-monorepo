import { Link, LinkProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "../utils/recoilState";

type inputProps = LinkProps & {
  to: string;
  title: string;
}

export const InternalLink = ({title, children, underline, ...others}: PropsWithChildren<inputProps>) => {
  const setPageTitle = useSetRecoilState(pageTitleState);
  return (
  <Link component={RouterLink} onClick={()=> {setPageTitle(title)}} underline={underline || "none"} {...others}>
    {children}
  </Link>
)}