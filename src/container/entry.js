import React, { Component } from 'react';
//import * as style from 'index.less';

const keyList = ['a', 'b', 'c', 'd', 'e', 'f','g'];
export default class Index extends Component {
    constructor() {
        super();
        const array1 = [{
          [keyList[0]]: 0
        }];
        const array2 = [{
          [keyList[0]]: 0
        }];
        this.state = {
            array1,
            array2,
            operateIndex1: 0,
            operateName1: '',
            operateIndex2: 0,
            operateName2: '',
            arrSum1:{
              0: array1,
            },
            arrSum2:{
              0: array2,
            },
        }
        console.log('arrSum1');
        console.log(this.state.arrSum1);
    }

    add = (index, keyName) => {
        return () => {
            let {
                operateIndex1,
                operateIndex2,
                operateName1,
                operateName2,
                arrSum1,
                arrSum2,
            } = this.state;
            const newArr = this.state[keyName];
            const newArrSum = keyName === 'array1' ? JSON.parse(JSON.stringify(arrSum1)) : JSON.parse(JSON.stringify(arrSum2));
            const operateCount = keyName === 'array1' ? (operateIndex1 + 1) : (operateIndex2 + 1);
            newArr.splice(index+1, 0, {
                [keyList[index+1]]: operateCount
            });
            if (keyName === 'array1') {
                ++ operateIndex1;
                console.log('增加前 arrSum1');
                console.log(arrSum1);
                newArrSum[operateIndex1] = newArr;
                console.log('增加后 arrSum1');
                console.log(arrSum1);
                console.log('operateIndex1: ' + operateIndex1);
                operateName1 = '增加';
                this.setState({
                    operateIndex1,
                    operateName1,
                    arrSum1: newArrSum
                });
            } else {
                ++ operateIndex2;
                newArrSum[operateIndex2] = newArr;
                operateName2 = '增加';
                this.setState({
                    operateIndex2,
                    operateName2,
                    arrSum2: newArrSum
                });
            }

            this.setState({
                [keyName]: newArr,
            });
        }
    }

    remove = (index, keyName) => {
        return () => {
            let {
                operateIndex1,
                operateIndex2,
                operateName1,
                operateName2,
                arrSum1,
                arrSum2,
            } = this.state;
            const newArr = this.state[keyName];
            const newArrSum = keyName === 'array1' ? JSON.parse(JSON.stringify(arrSum1)) : JSON.parse(JSON.stringify(arrSum2));
            newArr.splice(index, 1);
            if (keyName === 'array1') {
                ++ operateIndex1;
                newArrSum[operateIndex1] = newArr;
                ++operateIndex1;
                operateName1 = '删除';
                this.setState({
                    operateIndex1,
                    operateName1,
                    arrSum1: newArrSum
                });
            } else {
                ++ operateIndex2;
                newArrSum[operateIndex2] = newArr;
                operateName2 = '删除';
                this.setState({
                    operateIndex2,
                    operateName2,
                    arrSum2: newArrSum
                });
            }
            this.setState({
                keyName: newArr,
            });
        }
    }

    render() {
        const {
           array1,
           array2,
           arrSum1,
           arrSum2,
           operateIndex1,
           operateIndex2,
           operateName1,
           operateName2,
        } = this.state;

        const padding= {
            paddingLeft: '10px',
            color: 'blue',
            cursor: 'pointer'
        };

        const margin = {
            marginTop: '20px',
            marginBottom: '10px'
        };

        const flex = {
            display: 'flex',
            width: '100%'
        };

        const flexCenter = {
            ...flex,
            justifyContent: 'center',
            flexDirection: 'row-reverse'

        };

        const flex1 = {
            flex: 1,
            marginRight: '20px'
        };

        const borderWrapper = {
            maxHeight: '300px',
            overflowY: 'auto',
            borderStyle: 'inset'
        };

        const textWrapper = {
            color: '#333',
            fontSize: '14px',
            borderBottom: '1px solid',
            paddingBottom: '5px'
        };

        return <div>
          <div style={textWrapper}>
            实现逻辑：
            <div>1)点击"增加"将在数组中插入一个新的值，插入的位置为当前位置(index)的下一位(index+1)</div>
            <div>{'新增的值为{}, key为[a,b,c,d,e,f,g]中index+1个值(从0开始)，value为当前的操作次数，即value的值在数组中唯一的'}</div>
            <div>2)点击"删除"将从数组中删除当前的值</div>
          </div>
          <div style={flex}>
          <div style={flex1}>
            <h3 style={margin}>{'a) 以下使用index作为key值'}</h3>
              {
                  array1.map((item, index) => {
                      const key = Object.keys(item)[0];
                      const value = item[key];
                      return (<div key={index}>
                        <span>{`${key}:  `}</span>
                        <input defaultValue={value} />
                        <a style={padding} onClick={this.add(index, 'array1')}>增加</a>
                        <a style={padding} onClick={this.remove(index, 'array1')}>删除</a>
                      </div>);
                  })
              }
            <h3 style={margin}>此时的数组为：</h3>
            <div>{JSON.stringify(array1)}</div>
            {
                operateIndex1 > 0 ? <h4>{`当前的操作名称为： ${operateName1}`}</h4> : null
            }
            {
                operateIndex1 > 0 ? <h4>{`当前的操作次数为： ${operateIndex1}`}</h4> : null
            }

            {
              operateIndex1 > 0 ? <h3 style={margin}>操作历史记录：</h3> : null
            }
            {
                operateIndex1 > 0 ? Object.keys(arrSum1).reverse().map((key, index) => {
                    const arrStr = JSON.stringify(arrSum1[key]);
                    console.log('arrSum1');
                    console.log(arrSum1);
                    return <div key={`${arrStr}-${index}`} style={{marginTop: '5px'}}>
                      <span>第{key}次的操作数组为：</span>
                      <div>{arrStr}</div>
                    </div>
                }) : null
            }
          </div>
          <div style={flex1}>
            <h3 style={margin}>{'b) 以下使用key-value-index作为key值'}</h3>
            {
                array2.map((item, index) => {
                    const key = Object.keys(item)[0];
                    const value = item[key];
                    console.log(`${key}-${value}-${index}`);
                    return (<div key={`${key}-${value}-${index}`}>
                      <span>{`${key}:  `}</span>
                      <input defaultValue={value} />
                      <a style={padding}  onClick={this.add(index, 'array2')}>增加</a>
                      <a style={padding}  onClick={this.remove(index, 'array2')}>删除</a>
                    </div>);
                })
            }
            <h3 style={margin}>此时的数组为：</h3>
            <div>{JSON.stringify(array2)}</div>
            {
                operateIndex2 > 0 ? <h4>{`当前的操作名称为： ${operateName2}`}</h4> : null
            }
            {
                operateIndex2 > 0 ? <h4>{`当前的操作次数为： ${operateIndex2}`}</h4> : null
            }
            {
              operateIndex2 > 0 ? <h3 style={margin}>操作历史记录：</h3> : null
            }
            {
                operateIndex2 > 0 ? Object.keys(arrSum2).reverse().map((key, index) => {
                    return <div key={`${arrSum2[key]}-${index}`} style={{marginTop: '5px'}}>
                      <span>第{key}次的操作数组为：</span>
                      <div>{JSON.stringify(arrSum2[key])}</div>
                    </div>
                }) : null
            }
          </div>
        </div>
      </div>
    }

}
