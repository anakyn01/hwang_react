'use client'

import React from 'react';
import {Sidebar} from ../sidebar/Sidebar;
import {Topbar} from '../topbar/Topbar';
import {
    Wrapper, ContentWrapper, MainContent, ContainerFluid
} from './Layout.styled';

interface LayoutProps {
    children:React.ReactNode;
}