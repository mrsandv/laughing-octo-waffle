'use client';
import { FaXmark } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import styles from './modal.module.css';

type TModal = {
	item: {
		title: string;
		html?: string;
		files?: any;
		type?: 'single' | 'double' | 'none';
		footer?: string;
	};
	open?: boolean;
};

export default function Modal({ item, open = false }: TModal) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	const handleClose = () => {
		document.body.style.overflow = 'auto';
		setIsOpen(false);
	};

	const handleOpen = () => {
		document.body.style.overflow = 'hidden';
		setIsOpen(true);
	};

	const { title, html, footer, files, type } = item;

	return (
		<>
			<span className={styles.button} onClick={handleOpen}>
				{item.title}
			</span>
			{isOpen && (
				<div className={styles.overlay} onClick={handleClose}>
					<div
						className={styles.container}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<div className={styles.title}>
							{title}
							<div className={styles.closeIcon} onClick={handleClose}>
								<FaXmark />
							</div>
						</div>
						<div className={styles.content}>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
