'use client'

import React from 'react';
import {Sidebar} from ../sidebar/Sidebar;
import {Topbar} from '../topbar/Topbar';
import {
    Wrapper, ContentWrapper, MainContent, ContainerFluid
} from '../components/layout/layout.styled';

interface LayoutProps {
    children:React.ReactNode;
}