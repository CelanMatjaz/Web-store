import React from 'react';

const ErrorMessage = (props) => {
	return (
		<div className="error-message" style={style}>
			{ props.message || 'Error message' }
		</div>
	)
}

export default ErrorMessage;

const style = {
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgb(255, 94, 94)',
    border: '3px solid rgb(255, 34, 34)',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
    margin: '20px 0',
    lineHeight: '20px',
    fontSize: '18px',
    wordBreak: 'break-word'
}
