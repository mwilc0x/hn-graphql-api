var topItems = {
  id: '1',
  items: ['1', '2', '3', '4', '5']
};

var data = {
  items: {
    '1': {
      name: 'one'
    },
    '2': {
      name: 'two'
    },
    '3': {
      name: 'three'
    },
    '4': {
      name: 'four'
    },
    '5': {
      name: 'five'
    }
  }
};

export function getTopItems() {
  return topItems;
}

export function getItem(id) {
  return data.items[id];
}
