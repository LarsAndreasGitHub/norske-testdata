import { default as React, FunctionComponent, ReactNode } from 'react';
import styles from './pageWrapper.module.scss';
import { Banner } from '../Banner/Banner';
import { Footer } from '../Footer/Footer';

interface Props {
    title: string;
    children: ReactNode;
}

export const PageWrapper: FunctionComponent<Props> = (props) => (
    <div className={styles.pageWrapper}>
        <Banner>{props.title}</Banner>
        <div className={styles.content}>{props.children}</div>
        <Footer />
    </div>
);
