import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentTest from './index';


test('render test-1 of the component', () => {
    render(<ComponentTest icon="whatsapp" />);
});

test('render test-2 of the component', () => {
    render(<ComponentTest icon="eldenery" />);
});
