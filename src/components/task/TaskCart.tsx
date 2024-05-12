import React from 'react';

import styles from './taskCart.module.scss';

interface TaskCartProps {
	title: string;
	isComplete: boolean;
	isPrioritize: boolean;

	taskClickHandler: () => void;
	completeChangeHandler: () => void;
	priorityChangeHandler: () => void;
}

const TaskCart = ({ title, isComplete, taskClickHandler }: TaskCartProps) => {
	return (
		<div className={styles.taskContainer}>
			<div className={styles.taskContainer__title} onClick={taskClickHandler} data-iscomplete={isComplete}>
				{title}
			</div>
		</div>
	);
};

export default TaskCart;
