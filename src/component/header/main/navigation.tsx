import * as React from "react";
import type { I } from "Lib";

class HeaderMainNavigation extends React.Component<I.HeaderComponent> {
	render() {
		const { renderLeftIcons, renderTabs } = this.props;

		return (
			<React.Fragment>
				<div className="side left">{renderLeftIcons()}</div>
				<div className="side center">{renderTabs()}</div>
				<div className="side right" />
			</React.Fragment>
		);
	}
}

export default HeaderMainNavigation;
