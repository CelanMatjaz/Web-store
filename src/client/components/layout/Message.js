import React from 'react';

const ErrorMessage = (props) => {
	return (
		<div className="message" style={style}>
			{ props.message || 'Message' }
		</div>
	)
}

export default ErrorMessage;

const style = {
    width: '100%',
    height: 'auto',
    backgroundColor: '#82f927',
    border: '3px solid #1c8223',
    color: '#1c8223',
    borderRadius: '5px',
    padding: '10px',
    margin: '20px 0',
    lineHeight: '20px',
    fontSize: '18px',
    wordBreak: 'break-word'
}
