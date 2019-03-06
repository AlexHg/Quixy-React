import { shallow, mount } from 'enzyme';
import React from 'react';

import RepoListPage from 'containers/RepoListPage';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ReposList from '../index';

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<ReposList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <ReposList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [
      {
        owner: {
          login: 'flexdinesh'
        },
        html_url: 'https://konecta.team',
        name: 'Quixy-plataforma-de-noticias-inteligente',
        open_issues_count: 20,
        full_name: 'flexdinesh/react-redux-boilerplate'
      }
    ];
    const renderedComponent = shallow(
      <ReposList repos={repos} error={false} />
    );

    expect(
      renderedComponent.contains(
        <List items={repos} component={RepoListPage} />
      )
    ).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <ReposList repos={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
