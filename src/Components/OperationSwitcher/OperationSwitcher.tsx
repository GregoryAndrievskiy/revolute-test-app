import React from 'react';

import { Operation } from '../../models';

import { Wrapper, SwitchButton } from './styled';

export interface OperationSwitcherProps {
    operation: Operation;
    onToggleOperation: () => void;
}

export const OperationSwitcher: React.FC<OperationSwitcherProps> = ({ operation, onToggleOperation }) => {
    return (
        <Wrapper>
            <SwitchButton onClick={onToggleOperation}>{operation === Operation.Sell ? 'JL' : 'T'}</SwitchButton>
        </Wrapper>
    )
};
