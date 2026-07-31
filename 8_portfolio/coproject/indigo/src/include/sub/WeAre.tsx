import React,{useState, useEffect} from "react"
import axios from 'axios';
interface FeatureItem{
id:number; icon:string; title:string; 
description:string;
}


export const WeAre = () => {
//상태관리
const [mainTitle, setMainTitle] = useState('');
const [mainDescription, setMainDescription] = useState('');
const [features, setFeatures] = useState<FeatureItem[]>([]);
//생명주기
useEffect(() => {
    try{

    }catch(error){

    }
},[]);

    return(
        <>
            <section className="display-section">
                <div className="container">
                    <h2 className="sec-tit">
                        WE ARE
                    </h2>
                    <p className="desc">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, quibusdam accusantium vitae neque modi ullam labore iste porro voluptates explicabo.
                    </p>
                </div>
            </section>

            <section className="promotion-section">
<div className="container">
    <ul className="promo-list">

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo01.png" 
                alt="house icon" />
                <h3>HOME</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo02.png" 
                alt="house icon" />
                <h3>WE ARE</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo03.png" 
                alt="house icon" />
                <h3>WORK</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo04.png" 
                alt="house icon" />
                <h3>BLOG</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

    </ul>
</div>
            </section>
        </>
    )
}