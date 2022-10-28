import { FunctionComponent, ReactNode } from 'react';
import linkStyles from '../link/link.module.scss';

interface Props {
    anchorTag: string;
    children: ReactNode;
}

export const AnchorLink: FunctionComponent<Props> = (props) => {
    return (
        <a id={props.anchorTag} href={'#' + props.anchorTag} className={linkStyles.link}>
            {props.children}
        </a>
    );
};
