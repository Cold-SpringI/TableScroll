import React from 'react'
import TableScroll from '../src/index.jsx'    //引入组件
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const container = document.getElementById('root');
const root = createRoot(container);
const lableNameAndWidth = [
    {
        name: '电站名称',
        field: 'stationName',
        width: '15%'
    },
    {
        name: '告警时间',
        field: 'happenTime',
        width: '15%'
    },
    {
        name: '告警源类型',
        field: 'srcType',
        width: '15%'
    },
    {
        name: '告警类型',
        field: 'eventDesc',
        width: '15%'
    },
    {
        name: '告警级别',
        field: 'alarmDesc',
        width: '15%'
    },
    {
        name: '告警状态',
        field: 'eventStatus',
        width: '15%'
    },
    {
        name: '测试',
        field: 'eventId',
        width: '19%'
    },
]
let data
axios.post("http://127.0.0.1:4523/m1/1446276-0-default/event/getListByCon").then(r => {
    data = r.data.data
})

root.render(
    <>
        <TableScroll
            lable={lableNameAndWidth}
            data={data}
            headerBackgroundColor="#5e72e4"
            tableBackgroundColor="#ff9435"
            headerFontColor="#35d2ff"
            tableFontColor="#ff3535"
            emptyElement={(
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>暂无数据</div>
            )}
        />
    </>
);