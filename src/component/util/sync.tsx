import * as React from "react";
import { observer } from "mobx-react";
import { Icon } from "Component";
import { I, S, analytics } from "Lib";

interface Props {
	id?: string;
	className?: string;
	rootId: string;
	onClick: (e: any) => void;
}

const Sync = observer(
	class Sync extends React.Component<Props> {
		public static defaultProps = {
			className: "",
		};

		node: any = null;

		constructor(props: Props) {
			super(props);

			this.onClick = this.onClick.bind(this);
		}

		render() {
			const { id, className } = this.props;
			const { icon, error } = this.getStatus();
			const cn = ["sync"];

			if (className) {
				cn.push(className);
			}
			if (error) {
				cn.push(`error${I.SyncStatusError[error]}`);
			}

			return (
				<div
					ref={(node) => (this.node = node)}
					id={id}
					className={cn.join(" ")}
					onClick={this.onClick}
				>
					<Icon className={icon} />
				</div>
			);
		}

		onClick(e: any) {
			const { onClick } = this.props;
			const syncStatus = S.Auth.getSyncStatus();

			if (onClick) {
				onClick(e);
			}

			analytics.event("ClickSyncStatus", { status: syncStatus.status });
		}

		getStatus(): any {
			const syncStatus = S.Auth.getSyncStatus();
			const { status, network, error } = syncStatus;

			let icon: any = "";
			if (network == I.SyncStatusNetwork.LocalOnly) {
				icon = I.SyncStatusSpace.Offline;
			} else {
				icon = I.SyncStatusSpace[status];
			}

			icon = String(icon).toLowerCase();
			return { icon, error };
		}
	},
);

export default Sync;
