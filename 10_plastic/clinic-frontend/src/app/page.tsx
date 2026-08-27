import Image from "next/image";
import MainCarousel from '@/component/MainCarousel';
import RollingBanner from "@/component/RollingBanner";
import CategoryNav from "@/component/CategoryNav";

export default function Home() {
  return (
    <>
    <MainCarousel/>
    <RollingBanner/>
    <CategoryNav/>
    </>
  );
}
