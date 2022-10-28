import { FunctionComponent } from 'react';
import linkStyles from '../link/link.module.scss';

interface Props {
    anchorTag: string;
}

export const AnchorLink: FunctionComponent<Props> = (props) => {
    return (
        <a id={props.anchorTag} href={'#' + props.anchorTag} className={linkStyles.link}>
            {props.children}
        </a>
    );
};
