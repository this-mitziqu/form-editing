import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Popconfirm, Form, Typography, Button } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { Container } from 'react-bootstrap';

const { Option } = Select;
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'select' ?
        <Select>
            <Option value="true">已通过</Option>
            <Option value="ongoing">处理中</Option>
            <Option value="rejected">拒绝</Option>
            <Option value="skipped">跳过</Option>
            <Option value="false">未处理</Option>
        </Select> :
        <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `请输入${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props) => {
    var steps = props.originData.steps;
    steps.map((el, idx) => {
        el['key'] = idx;
    });
    const [form] = Form.useForm();
    const [data, setData] = useState(steps);
    const [editingKey, setEditingKey] = useState('');

    useEffect(
        () => {
            props.getSteps(data, props.idx);
        }, [data]
    )

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            stepName: '',
            stepStatus: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const del = async (key) => {
        const oldData = [...data];
        const newData = oldData.filter((item) => item.key !== key);
        setData(newData);
        setEditingKey('');
    };
    const add = () => {
        const newData = [...data];
        const row = {
            stepName: '新的一行',
            stepStatus: 'false',
            key: newData.length,
        };
        newData.push(row);
        setData(newData);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            }
            // else {
            //   newData.push(row);
            //   setData(newData);
            //   setEditingKey('');
            // }
            // console.log(newData);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const footer = () => {
        return (
            <>
            <span>快速设置：</span>
                <Typography.Link onClick={() => add()} className="me-2">
                    增加一行
                </Typography.Link>
                <Popconfirm className="me-2" title="确定要设置为录取吗？" onConfirm={() => setData([{ stepName: "报名已提交", stepStatus: "true" }, { stepName: "录取", stepStatus: "true" }])}>
                    <Typography.Link>录取</Typography.Link>
                </Popconfirm>
                <Popconfirm className="me-2" title="确定要设置为拒绝吗？" onConfirm={() => setData([{ stepName: "报名已提交", stepStatus: "true" }, { stepName: "拒绝", stepStatus: "rejected" }])}>
                    <Typography.Link type="danger">拒绝</Typography.Link>
                </Popconfirm>
                <Popconfirm
                    className="me-2"
                    title="确定要设置为等待名单吗？"
                    onConfirm={() => setData([{ stepName: "报名已提交", stepStatus: "true" }, { stepName: "等待名单", stepStatus: "true"}, { stepName: "结果", stepStatus: "ongoing" }])}>
                    <Typography.Link type="warning">等待名单</Typography.Link>
                </Popconfirm>
            </>)
    }

    const stepColumns = [
        {
            title: '序号',
            dataIndex: 'key',
            // width: '40%',
            editable: false,
            render: (text) => {
                return (<b> {parseInt(text) + 1} </b>)
            }
        },
        {
            title: '步骤',
            dataIndex: 'stepName',
            // width: '40%',
            editable: true,
        },
        {
            title: '状态',
            dataIndex: 'stepStatus',
            // width: '15%',
            editable: true,
            render: (text) => {
                if (text === 'true') {
                    return ("已通过")
                } else if (text === 'false') {
                    return ('未处理')
                } else if (text === 'ongoing') {
                    return ('处理中')
                } else if (text === 'skipped') {
                    return ('跳过')
                } else if (text === 'rejected') {
                    return ('拒绝')
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            // width: '15%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            className="me-2"
                        >
                            保存
                        </Typography.Link>
                        <Popconfirm title="确定要取消吗？" onConfirm={cancel}>
                            <Typography.Link>取消</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} className="me-2">
                            修改
                        </Typography.Link>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => del(record.key)}>
                            <Typography.Link type="danger">删除</Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mergedColumns = stepColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'stepStatus' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                rowKey="key"
                footer={footer}
            />
        </Form>
    )
}

export default EditableTable