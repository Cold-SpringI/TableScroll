import React, { useEffect, useState, useRef } from 'react'
import { List } from 'antd'
import lodash from "lodash";
import { nanoid } from 'nanoid';
import style from './index.less'
let scrollInterval = '';

const TableScroll = (props) => {
    const scrollMain = useRef()
    const listContainer = useRef()
    const [data, setData] = useState([])
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#FFFFFF")
    const [tableBackgroundColor, setTableBackgroundColor] = useState("transparent")
    const [headerFontColor, setHeaderFontColor] = useState("#000000")
    const [tableFontColor, setTableFontColor] = useState("#000000")
    const [oldData, setOldData] = useState([])
    const [listMarginTop, setListMarginTop] = useState('0')
    const [animate, setAnimate] = useState(false)
    const [field, setField] = useState([])
    const [lableNameAndWidth, setLableNameAndWidth] = useState([])
    const [element, setElement] = useState(<></>)

    useEffect(() => {
        if (props.data) {
            setOldData(props.data)
        }
    }, [props.data])
    useEffect(() => {
        if (props?.headerBackgroundColor) {
            setHeaderBackgroundColor(props.headerBackgroundColor)
        }
        if (props?.headerFontColor) {
            setHeaderFontColor(props.headerFontColor)
        }
        if (props?.tableBackgroundColor) {
            setTableBackgroundColor(props.tableBackgroundColor)
        }
        if (props?.tableFontColor) {
            setTableFontColor(props.tableFontColor)
        }
    }, [props.headerBackgroundColor, props.headerFontColor, props.tableBackgroundColor, props.tableFontColor])
    useEffect(() => {
        const isEqual = lodash.isEqual(oldData, props.data)
        if (!isEqual && props.data) {
            setData(props.data)
        }
    }, [oldData, props.data])
    useEffect(() => {
        if (data.length) {
            setElement(
                <List
                    itemLayout="horizontal"
                    id="scrollList"
                    style={{ marginTop: listMarginTop }}
                    className={animate ? style.animate : ''}
                    dataSource={data}
                    renderItem={i => (
                        <List.Item>
                            <List.Item.Meta
                                description={
                                    <div className={style.alarmScroll} >
                                        {getRow(i)}
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )

            scrollInterval = setInterval(() => {
                startScrollUp()
            }, 3000);
        } else {
            setElement(props.emptyElement)
        }
        return () => {
            clearInterval(scrollInterval)
        }
    }, [data, listMarginTop, props.emptyElement])
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
        if (props.lable.length) {
            let arr = []
            let propsField = []
            props.lable.map(i => {
                arr.push(<div className={style.name} style={{ width: i.width }} key={nanoid()}>{i.name}</div>)
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
        field.map(i => {
            arr.push(
                <div className={style.lable}
                    key={nanoid()}
                    style={{ width: i.width, color: tableFontColor }}>
                    {row[i.field]}
                </div>
            )
        })
        return arr
    }

    return (
        <div className={style.scroll}>
            <div className={style.scrollName} style={{ background: headerBackgroundColor, color: headerFontColor }}>
                {lableNameAndWidth}
            </div>
            <div className={style.scrollMain} ref={scrollMain} style={{ backgroundColor: tableBackgroundColor }}>
                <div className={style.listContainer} ref={listContainer}
                    onMouseEnter={() => { endScroll() }}
                    onMouseLeave={() => { startScrollUp() }}
                >
                    {element}
                </div>
            </div>
        </div>
    )
}
export default TableScroll;
