'use client';
import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import { Recipe } from '@/app/page';
import styles from './homeSlider.module.scss';
import ArrowLeftSVG from '../../../public/arrow-left.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

interface HomeSliderProps {
	recipes: Recipe[];
}

const HomeSlider = ({ recipes }: HomeSliderProps) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);

	const swiperRef = useRef<SwiperType>();

	return (
		<div className={styles.recipesSlider}>
			<Swiper
				modules={[Navigation, Autoplay]}
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				breakpoints={{
					320: {
						spaceBetween: 20,
						slidesPerView: 'auto',
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
				}}
				onBeforeInit={swiper => {
					swiperRef.current = swiper;
				}}
			>
				{recipes.map((recipe, id) => (
					<SwiperSlide className={styles.slide} key={id}>
						<Image src={recipe.image} alt={`Recipe ${recipe.id}`} width={350} height={350} />
					</SwiperSlide>
				))}
			</Swiper>

			<div onClick={() => swiperRef.current?.slidePrev()} ref={navigationPrevRef} className={styles.btnPrev}>
				<ArrowLeftSVG className={styles.arrowLeft} />
			</div>
			<div onClick={() => swiperRef.current?.slideNext()} ref={navigationNextRef} className={styles.btnNext}>
				<ArrowLeftSVG className={styles.arrowRight} />
			</div>
		</div>
	);
};

export default HomeSlider;
