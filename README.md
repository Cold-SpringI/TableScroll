# mq-tablescroll

基于react+antd的列表滚动组件
滚动数据高度小于父盒子高度时不会滚动。内部对传入的data进行了对比，滚动中的数据与二次传入的数据相同时不会替换当前滚动的数据。

## Install
    # npm
    npm install mq-tablescroll
    # yarn
    yarn add mq-tablescroll

## Props

props: lable,data,headerBackgroundColor,tableBackgroundColor,headerFontColor,tableFontColor,emptyElement

  |            API    |说明     | 必填  |类型                       |默认值
  |----------|---------------------|--------------|---------------|-------------------------------
  |lable|`表头名称以及对应字段、表格宽度`     |true       |object[]            |-
  |data          |`数据数组`  |true          |object[]            |-
  |headerBackgroundColor          |`标题背景色`     |false      |String            |"#FFFFFF"
  |tableBackgroundColor          |`列表背景色`|false |String|"transparent"
  |headerFontColor          |`数据数组`|false |String|"#000000"
  |tableFontColor          |`列表字体颜色`|false |String|"#000000"
  |emptyElement          |`没有数据时显示的组件` |false|Element|<></> 

<br>
 
## ColumnsType[]
列配置项是固定的

|             API   |说明                          |类型                       |默认值
|----------------|-------------------------------|-----------------------------|-------------------------------
|name|`列名称`            |string            |-
|field          |`对应data中的字段`            |string            |-
|width          |`列的宽度`            |string            |-

<br>  


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
    
## Data[]
数据配置项【不是固定的字段】，用户可根据自己业务的需求，【随意传入】需要的字段，代码内部做了遍历，列项将全部渲染出来，以下是个示例:

<br>  

    const data = [
	    { 
            alarmDesc: "70",
            eventDesc: "62",
            eventId: "6368346411449130",
            eventStatus: "70",
            happenTime: "2003-12-28 08:58:13",
            srcType: "92",
            stationName: "Angela Williams" 
        },
         { 
            alarmDesc: "71",
            eventDesc: "62",
            eventId: "6368346411449130",
            eventStatus: "70",
            happenTime: "2003-12-28 08:58:13",
            srcType: "92",
            stationName: "Angela Williams" 
        },
         { 
            alarmDesc: "72",
            eventDesc: "62",
            eventId: "6368346411449130",
            eventStatus: "70",
            happenTime: "2003-12-28 08:58:13",
            srcType: "92",
            stationName: "Angela Williams" 
        },
    ]

## 引用示例
    import TableScroll from 'mq-tablescroll';
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
  
<br>

![Image text](https://raw.githubusercontent.com/china78/mq-tablescroll/main/src/assets/demo.png)