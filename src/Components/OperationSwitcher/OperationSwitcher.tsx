import React from 'react';

import { Operation } from '../../models';
import { ArrowUp } from './ArrowUp'
import { ArrowDown } from './ArrowDown';

import { Wrapper, SwitchButton } from './styled';

const operationMap = {
    [Operation.Sell]: <ArrowDown />,
    [Operation.Buy]: <ArrowUp />,
};

export interface OperationSwitcherProps {
    operation: Operation;
    onToggleOperation: () => void;
}

export const OperationSwitcher: React.FC<OperationSwitcherProps> = ({ operation, onToggleOperation }) => {
    return (
        <Wrapper>
            <SwitchButton data-testid="switch-btn" onClick={onToggleOperation}>{operationMap[operation]}</SwitchButton>
        </Wrapper>
    )
};
