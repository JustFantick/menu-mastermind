import React from 'react';
import s from './recipeCard.module.scss';

const Category = ({ text }: { text: string }) => {
	return <div className={s.category}>{text}</div>;
};

export default Category;
