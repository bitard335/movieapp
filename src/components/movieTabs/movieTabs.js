import { Component } from 'react';
import { Tabs } from 'antd';

export default class MovieTabs extends Component {
  findKey(items, label) {
    console.log(label);
    const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return items.find((el) => el.label === formattedLabel).key;
  }

  render() {
    const { changeTab, tab } = this.props;
    const items = [
      {
        key: '1',
        label: 'Search',
      },
      {
        key: '2',
        label: 'Rated',
      },
    ];
    const activeKey = this.findKey(items, tab);

    const changeHadler = (key) => {
      const tab = items.find((el) => key === el.key).label;
      changeTab(tab.toLowerCase());
    };
    return <Tabs items={items} activeKey={activeKey} centered="true" onChange={changeHadler} />;
  }
}
