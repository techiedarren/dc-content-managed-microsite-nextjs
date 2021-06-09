import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { SocialMediaLinks, EmailSignUp } from '..';

const styles = theme => ({
    root: {
        paddingTop: 46,
        paddingBottom: 46,
        margin: '10px 0px 10px 0px'
    },

    newsletterWrap: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    socialWrap: {
        textAlign: 'center' as 'center',
        padding: 20
    },

    copyrightWrap: {
        textAlign: 'center' as 'center'
    },

    newsletterHeading: {
        fontSize: '2rem',
        fontWeight: 500,
        margin: 0,
        textTransform: 'uppercase' as 'uppercase',

        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
    },

    emailSignUp: {
        width: '100%',
        maxWidth: 400
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
}

const Footer: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        ...other
    } = props;

    return (
        <footer className={clsx(classes.root, className)} {...other}>
            <div className={classes.newsletterWrap}>
                <h2 className={classes.newsletterHeading}>exclusive offers &amp; updates</h2>
                <p>
                    Receive our newsletter on the latest deals and happenings.
                 </p>
                <EmailSignUp className={classes.emailSignUp} />
            </div>
            <div className={classes.socialWrap}>
                <SocialMediaLinks />
            </div>
            <div className={classes.copyrightWrap}>
                © 2020 ANYA FINN. All Rights Reserved.
             </div>
        </footer>
    );
};

export default withStyles(styles)(Footer);