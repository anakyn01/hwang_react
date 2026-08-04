'use client';

import React,{useState, useEffect} from 'react';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
   MDBCardImage, MDBIcon 
} from 'mdb-react-ui-kit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

//1. 스프링부트에서 넘어올 동물 데이터의 타입(Interface) 정의
interface Animal {
  id:number;
  region:string;
  noticeNo:string;
  birthYear:string;
  gender:string;
  weight:number;
  imageUrl:string;
}

export const HomePage = () => {
//2. 동물 리스트 상태 관리
const [animals, setAnimals] = useState<Animal[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch('http://localhost:8080/api/animals/recommended')
  .then((res) => {
    if(!res.ok) throw new Error('네트워크 응답이 정상이 아닙니다');
    return res.json();
  }).then((data) => {
    setAnimals(data);
    setIsLoading(false);
  }).catch((error) => {
    console.error('API 호출 에러 :', error);
    setIsLoading(false);
  })
},[]);


  return(
    <></>
  );
}