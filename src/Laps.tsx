import { ReactElement } from "react";
import { computeTimeComponents } from "./TimeComponents";

export default function Laps(props: {
	lapsInMillis: number[];
}): ReactElement {
	return <>
		<div>Laps</div>
		<ul>
			{props.lapsInMillis.map((lapInMillis, index) => {
				return <li key={index}>{computeTimeComponents(lapInMillis).toString()}</li>
			})}
		</ul>
	</>;
}
