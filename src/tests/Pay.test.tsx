import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Pay } from '../components/Usecases/components';
import store from '../store';

import requestData from './Mocks/request-data';

describe('Testing manage component', () => {
    test('should render manage component', () => {
        render(
            <Provider store={store}>
                <Pay requestData={requestData} />
            </Provider>
        );
        expect(screen.getByTestId('pay')).toBeInTheDocument();
    });
});
