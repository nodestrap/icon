import React from 'react';
import Base, {
    VariantTheme as Base_VariantTheme,
    Props        as Base_Props,
    State        as Base_State
} from '@nodestrap/element/src/index';
import './index.scss';



export interface VariantSize  {
    size?: 'sm' | 'nm' | 'md' | 'lg';
}
export interface VariantTheme extends Base_VariantTheme { }



export interface Props extends Base_Props, VariantSize, VariantTheme {
    content : string;
}

export interface State extends Base_State {
}

export default class Icon<TProps extends Props = Props, TState extends State = State> extends Base<TProps, TState> {
    constructor(props: TProps) {
        super(props);
    }



    /*override*/ get defaultClassName(): string {
        return 'icon';
    }



    /*override*/ get compositeClassName(): string {
        const props = this.props;
        return [
            // custom class(es):
            this.className,

            // content:
            (props.content || ' '),

            // variants:
            (props.theme   || ' '),
            (props.size    || ' '),
        ]
        .filter(c => (c !== ' ') && (c !== '')) // removes blank classes
        .join(' '); // combines all classes separated by space
    }



    render() {
        return (
            <span
                className={this.compositeClassName}
            />
        );
    }
}