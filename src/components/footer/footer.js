import { Component } from 'react';
import { Pagination } from 'antd';
export default class Footer extends Component {
  static defaultProps = {
    totalPages: 50,
  };
  state = {
    current: 1,
  };

  render() {
    const { changePage, totalPages } = this.props;
    const { current } = this.state;

    const onChangePage = (page) => {
      this.setState(() => ({ current: page }));
      changePage(page);
    };

    return (
      <footer className="footer">
        <Pagination onChange={onChangePage} current={current} total={totalPages} />
      </footer>
    );
  }
}
