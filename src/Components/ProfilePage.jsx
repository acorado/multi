import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate } from "@reach/router";
import {auth} from "../firebase";
import SpacingGrid from '../Vistas/SpacingGrid';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


const ProfilePage = () => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  console.log(user);
  

  return (
    <div>
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        <h3 className = "italic">{email}</h3>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Salir</button>

  </div>


  <Layout className="layout">
    <div>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Ciudades</Menu.Item>

      </Menu>
    </div>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
      </Breadcrumb>
	       <div className="site-layout-content"><SpacingGrid/></div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ciudades...</Footer>
  </Layout>

    </div>
  ) 
};

export default ProfilePage;

