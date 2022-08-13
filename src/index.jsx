import React, { useEffect, useState, useRef } from 'react'
import { List } from 'antd'
import lodash from "lodash";
// import { request } from 'umi';
import { nanoid } from 'nanoid';
import './index.less'
let scrollInterval = '';

const TableScroll = (props) => {
    const scrollMain = useRef()
    const listContainer = useRef()
    const [data, setData] = useState([])
    const [listMarginTop, setListMarginTop] = useState('0')
    const [animate, setAnimate] = useState(false)
    const [field, setField] = useState([])
    const [lableNameAndWidth, setLableNameAndWidth] = useState([])

    useEffect(() => {
        // request('http://127.0.0.1:4523/m1/1446276-0-default/event/getListByCon', { method: 'post' }).then(r => {
        //     setData(r.data)
        // })
    }, [])
    useEffect(() => {
        if (data?.length) {
            scrollInterval = setInterval(() => {
                startScrollUp()
            }, 3000);
        }
        return () => {
            clearInterval(scrollInterval)
        }
    }, [data])
    useEffect(() => {
        if (animate && listMarginTop !== '0') {
            setTimeout(() => {
                const arr = lodash.cloneDeep(data)
                const shift = arr.shift()
                arr.push(shift)
                setData(arr)
                setAnimate(false)
                setListMarginTop('0')
            }, 2000)
        }
    }, [animate, listMarginTop])
    useEffect(() => {
        if (props.lable?.length) {
            let arr = []
            let propsField = []
            props.lable.map(i => {
                arr.push(<div className='name' style={{ width: i.width }} key={nanoid()}>{i.name}</div>)
                propsField.push({ field: i.field, width: i.width })
            })
            setField(propsField)
            setLableNameAndWidth(arr)
        }
    }, [props.lable])

    const startScrollUp = () => {
        endScroll();
        //父盒子 子盒子
        if (scrollMain.current.clientHeight < listContainer.current.clientHeight) {
            let height = document.getElementById("scrollList").getElementsByTagName("li")[0].scrollHeight;
            setAnimate(true)
            setListMarginTop("-" + height + "px")
        }
    }
    const endScroll = () => {
        clearInterval(scrollInterval);
    }

    const getRow = (row) => {
        let arr = []
        field?.map(i => {
            arr.push(
                <div className='lable' key={nanoid()} style={{ width: i.width }}>{row[i.field]}</div>
            )
        })
        return arr
    }

    return (
        <div className='scroll'>
            <div className='scrollName'>
                {lableNameAndWidth}
            </div>
            <div className='scrollMain' ref={scrollMain}>
                <div className="listContainer" ref={listContainer}
                    onMouseEnter={() => { endScroll() }}
                    onMouseLeave={(e) => { startScrollUp() }}
                >
                    {data?.length ? <List
                        itemLayout="horizontal"
                        id="scrollList"
                        style={{ marginTop: listMarginTop }}
                        className={animate ? "animate" : ''}
                        dataSource={data}
                        renderItem={i => (
                            <List.Item>
                                <List.Item.Meta
                                    description={
                                        <div className='alarmScroll' >
                                            {getRow(i)}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    /> : <></>}
                </div>
            </div>
        </div>
    )
}
export default TableScroll;
