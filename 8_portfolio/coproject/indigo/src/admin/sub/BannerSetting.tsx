import React,{useState} from 'react';
import axios from 'axios';
import { Layout} from '../../component/layout/Layout';
import * as B from "../css/Sub.styled";

// 캐러셀 이미지 데이터 타입 정의
interface CarouselItem{
    id:number; url:string;
}

export const BannerSetting = () => {
// --- 🌟 메인 배너 설정 상태 (단일 이미지 vs 캐러셀) ---
const [bannerType, setBannerType ] = useState<'single' | 'carousel'>('single');
const [singleBanner, setSingleBanner] = useState('/assets/images/p-images/slide01.jpg');
const [carouselImages, setCarouselImages] = useState<CarouselItem[]>([
{ id:1, url:'/assets/images/slide/banner1.jpg'}
]);

// --- 캐러셀 이미지 추가/삭제/수정 로직 ---
const handleAddCarouselImage = () => {
    const newImage: CarouselItem = {id:Date.now(), url:''};
    setCarouselImages([...carouselImages, newImage]);
}

const handleRemoveCarouselImage = (id:number) => {
    setCarouselImages(carouselImages.filter(img => img.id !== id));
}



    return(
        <>
        <Layout>

        </Layout>
        </>
    )
}