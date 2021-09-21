
import React from 'react';

import { Screen, Content, Info, Action, Rate, ConfirmButton } from './styled';

export interface ExchangeProps { }

export const Exchange: React.FC<ExchangeProps> = () => {
    return (
        <Screen>
            <Content>
                <Info>
                    <Action>
                        Sell USD
                    </Action>
                    <Rate>
                        $1 = $1.3EUR
                    </Rate>
                </Info>
                <input />
                <input />
            </Content>
            <ConfirmButton>
                Sell USD for EUR
            </ConfirmButton>
        </Screen>
    );
};
