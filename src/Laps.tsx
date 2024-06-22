import { ReactElement } from "react";
import { computeTimeComponents } from "./TimeComponents";
import styles from "./Laps.module.css";

export default function Laps(props: {
	lapsInMillis: number[];
}): ReactElement {
	return <>
		<div className={styles.container}>
			{props.lapsInMillis.length === 0
				? <div>No laps recorded</div>
				: <>
					<div>Recorded laps</div>
					<div className={styles.list__container}>
						<ul className={styles.list}>
							{props.lapsInMillis.map((lapInMillis, index) => {
								return <li key={index}>{computeTimeComponents(lapInMillis).toString()}</li>
							})}
						</ul>
					</div>
				</>
			}
		</div>
	</>;
}
