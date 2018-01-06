/**
 * @flow
 * @see https://flow.org/en/docs/react/children/
 */

import * as React from 'react';

type Props = {
  children?: React.Node
};

class Wrap extends React.Component<Props> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Wrap
