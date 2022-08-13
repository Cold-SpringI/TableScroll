import React from 'react'
import TableScroll from '../src/index.jsx'    //引入组件
import { createRoot } from 'react-dom/client';

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
root.render(
    <>
        <TableScroll lable={lableNameAndWidth} url="http://127.0.0.1:4523/m1/1446276-0-default/event/getListByCon"/>
    </>
);