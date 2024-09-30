import { Skeleton } from "antd"
import { FC } from "react"

export const SkeletonList: FC = () => {
	return (
		<>
			<Skeleton
				active
				paragraph={{
					width: "100%",
				}}
			/>
			<Skeleton
				active
				title={false}
				paragraph={{
					width: "100%",
					rows: 6,
				}}
			/>
		</>
	)
}