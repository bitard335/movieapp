import { Component } from 'react';
import { Pagination } from 'antd';
export default class Footer extends Component {
  static defaultProps = {
    totalPages: 50,
  };

  render() {
    const { changePage, totalPages, current } = this.props;

    const onChangePage = (page) => {
      changePage(page);
    };

    return (
      <footer className="footer">
        <Pagination onChange={onChangePage} current={current} total={totalPages} />
      </footer>
    );
  }
}
