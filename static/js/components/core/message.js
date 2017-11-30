import React from 'react';

const Message = ({alert_level, msg}) => (
	<div className="container">
		<div className="row top-buffer">
			<div className={alert_level.concat(' alert')} >{msg}</div>
		</div>
	</div>
);

export default Message;