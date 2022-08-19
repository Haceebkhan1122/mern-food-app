import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return (
        <div className='input'>
            <div class="ui input">
                <label htmlFor={props.input.id} className="labels">{props.label}</label>
                <input ref={ref} id={props.input.id} {...props.input} />
            </div>
        </div>
    )
});

export default Input