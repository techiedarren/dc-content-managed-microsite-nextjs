import React, { useState } from "react";
import {
  withStyles,
  WithStyles,
  Paper,
  Theme,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@material-ui/core";
import clsx from "clsx";

import { fade } from "@material-ui/core/styles/colorManipulator";
import Logo from "../../core/Logo";
import LocatorIcon from "../../../public/svg/locator.svg";
import AccountIcon from "../../../public/svg/account.svg";
import CartIcon from "../../../public/svg/cart.svg";
import Link from "next/link";
import { NavigationNode } from "../../../lib/fetchNavigation";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const styles = (theme: Theme) => ({
  root: {},
  background: {
    position: "fixed" as "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    transition: "all 200ms ease-out",
    display: "none",

    "&$open": {
      background: fade(theme.palette.common.black, 0.3),
      display: "unset",
    },
  },
  sidebar: {
    position: "fixed" as "fixed",
    width: 300,
    bottom: 0,
    left: -300,
    top: 0,
    zIndex: 99999,

    transition: "all 200ms ease-out",

    "&$open": {
      left: 0,
    },
  },

  paper: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },

  open: {},

  logo: {
    display: "flex",
    padding: "10px",
    justifyContent: "center",
  },

  menu: {},

  icon: {
    width: "30px",
    height: "30px",
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
});

export interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onToggleOpen: () => void;
  navigation: NavigationNode[];
}

const Sidebar: React.SFC<Props> = (props) => {
  const { classes, open, onToggleOpen, navigation, ...other } = props;
  const [openNodes, setOpenNodes] = useState<{ [key: string]: boolean }>({});

  const handleToggleNode = (key: string) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [key]: !prevOpenNodes[key],
    }));
  };

  return (
    <div>
      <div
        onClick={onToggleOpen}
        className={clsx(classes.background, {
          [classes.open]: open,
        })}
      ></div>
      <aside
        className={clsx(classes.sidebar, {
          [classes.open]: open,
        })}
      >
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.logo}>
            <Logo height={25} />
          </div>
          <Divider />
          <div className={classes.menu}>
            <List component="nav">
              <ListItem button>
                <ListItemIcon>
                  <AccountIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CartIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LocatorIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Location" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              {navigation.map((node) => {
                const hasChildren = node.children && node.children.length > 0;
                const isOpen = openNodes[node.content.title];
                const listItem = (
                  <ListItem
                    button
                    onClick={() => handleToggleNode(node.content.title)}
                  >
                    <ListItemText primary={node.content.title} />
                    {hasChildren ? (
                      isOpen ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : (
                      undefined
                    )}
                  </ListItem>
                );

                return (
                  <>
                    {hasChildren ? (
                      listItem
                    ) : (
                      <Link href={node.content.link?._meta?.deliveryKey || ""}>
                        {listItem}
                      </Link>
                    )}
                    {hasChildren && (
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {node.children.map((childNode) => (
                            <Link
                              href={
                                childNode.content.link?._meta?.deliveryKey || ""
                              }
                              key={childNode.content.title}
                            >
                              <ListItem button className={classes.nested}>
                                <ListItemText
                                  primary={childNode.content.title}
                                />
                              </ListItem>
                            </Link>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </>
                );
              })}
            </List>
          </div>
        </Paper>
      </aside>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
