import { App } from '../../../app/client/components/';
import React from 'react';

describe('App', () => {
  it('should render an App', () => {
    const wrapper = shallow( <App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a document title', () => {
    const wrapper = shallow(
        <DocumentTitle title="Events" />
    );
    expect(wrapper.prop('title')).toEqual('Events');
});

});
