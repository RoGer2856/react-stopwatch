import { ReactElement, ReactNode } from "react";
import styles from "./Layout.module.css";

export default function Layout(props: {
	children: ReactNode;
}): ReactElement {
	return <>
		<div className={styles.page__container}>
			<div id={styles.header}>Stopwatch</div>
			<div className={styles.content__container}>
				{props.children}
			</div>
		</div>
	</>;
}
