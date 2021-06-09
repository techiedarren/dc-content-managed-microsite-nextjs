import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavigationNode } from '../../lib/fetchNavigation';

const styles = (theme: Theme) => ({
    root: {
        padding: '0px 45px',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        borderTop: `1px solid ${theme.palette.grey[400]}`
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        display: 'inline-block',
        padding: '10px 15px',
        cursor: 'pointer',
        borderBottom: `3px solid ${theme.palette.background.default}`,
        transition: 'all 0.3s',
        '& a':{
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
        '&:hover': {
            borderBottom: `3px solid ${theme.palette.primary.light}`,
        }
    },
    activeListItem: {
        borderBottom: `3px solid ${theme.palette.primary.light}`
    }
});


interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    navigation: NavigationNode[];
}

const Navigation: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        navigation,
        ...other
    } = props;

    const router = useRouter();

    return (
        <nav className={clsx(classes.root, className)} {...other}>
            <ul className={classes.list}>
                {
                    navigation.map(node => {
                        return <li className={clsx(classes.listItem, {
                            [classes.activeListItem]: router?.asPath === `/${node.content.link?._meta?.deliveryKey}`
                        })}>
                            <Link href={node.content.link?._meta?.deliveryKey || ''}>
                                <a>
                                    {node.content.title}
                                </a>
                            </Link>
                        </li>;
                    })
                }
            </ul>
        </nav>
    );
};

export default withStyles(styles)(Navigation);