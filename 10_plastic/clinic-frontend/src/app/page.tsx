import Image from "next/image";
import MainCarousel from '@/component/MainCarousel';
import RollingBanner from "@/component/RollingBanner";
import CategoryNav from "@/component/CategoryNav";
import CircularOverlay from "@/component/CircularOverlay";
import Selfies from '@/component/main/Selfies';

export default function Home() {
  return (
    <>
    <MainCarousel/>
    <RollingBanner/>
    <CategoryNav/>
    <Selfies/>
    <CircularOverlay/>
    </>
  );
}
