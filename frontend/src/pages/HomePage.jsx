// pages/HomePage.jsx or /app/page.jsx depending on structure
import React from 'react';
import Layout from '../components/Layout';
import { useThemeStore } from '../store/useThemeStore';

const HomePage = () => {
  const {theme , setTheme} = useThemeStore();
  return (
    <Layout>
    <div className="text-xl" data-theme={theme}>
        👋 Welcome to the Chat App Homepage!
      </div>
    </Layout>
  );
};

export default HomePage;
