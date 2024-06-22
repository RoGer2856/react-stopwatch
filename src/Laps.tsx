import { ReactElement } from "react";

export default function Laps(props: {
	lapsInMillis: number[];
}): ReactElement {
	return <>
		<div>Laps</div>
		<ul>
			{props.lapsInMillis.map((lapInMillis, index) => {
				return <li key={index}>{lapInMillis}</li>
			})}
		</ul>
	</>;
}
