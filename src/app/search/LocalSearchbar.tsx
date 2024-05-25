'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Searchbar from '@/components/searchbar/Searchbar';

const LocalSearchbar = ({ defaultValue }: { defaultValue: string }) => {
	const router = useRouter();

	function onSearchSubmit(reqText: string) {
		router.push(`/search?query=${encodeURIComponent(reqText)}`);
	}

	return <Searchbar onSubmit={onSearchSubmit} defaultValue={defaultValue} />;
};

export default LocalSearchbar;
