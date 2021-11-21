import { FunctionComponent } from 'react';
import styles from './anchorLink.module.scss';

interface Props {
    anchorTag: string;
}

export const AnchorLink: FunctionComponent<Props> = (props) => {
    return (
        <a id={props.anchorTag} href={'#' + props.anchorTag} className={styles.anchorLink}>
            {props.children} #
        </a>
    );
};
