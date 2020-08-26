import React, {MouseEvent, ReactNode} from 'react';

import './button.less';

export enum ButtonType {'primary', 'secondary', 'error'}

export enum Variant {'outlined', 'contained'}

type Props = {
    type?: ButtonType,
    variant?: Variant,
    disabled?: boolean,
    fullWidth?: boolean,

    className?: string,
    onClick?: (e: MouseEvent) => void,

    children: ReactNode
};

export const Button = (({
                            type = ButtonType.primary,
                            variant = Variant.contained,
                            disabled = false,
                            fullWidth = false,
                            className,
                            onClick, children
                        }: Props) => {
    let cn = 'button';
    switch (type) {
        case ButtonType.primary:
            cn += ' primary';
            break;
        case ButtonType.secondary:
            cn += ' secondary';
            break;
        case ButtonType.error:
            cn += ' error';
            break;
        default:
            break;
    }
    if (disabled)
        cn += ' disabled';
    switch (variant) {
        case Variant.outlined:
            cn += ' outlined';
            break;
        case Variant.contained:
            cn += ' contained';
            break;
    }
    if (fullWidth)
        cn += ' full-width';
    if (className)
        cn += ` ${className}`;

    return (
        <div className={cn} onClick={onClick}>
            {children}
        </div>
    );
}) as React.FC<Props>;