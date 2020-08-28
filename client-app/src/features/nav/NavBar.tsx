import React from 'react'
import { Menu, Button, Container } from 'semantic-ui-react';


interface IProps {
    createActivityFormHandler: () => void;
}

export const NavBar: React.FC<IProps> = ({ createActivityFormHandler }) => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    SocialSite
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => { createActivityFormHandler() }} positive content="Create Activities" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}

export default NavBar;