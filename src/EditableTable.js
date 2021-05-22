import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Select, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

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
        <Option value="false">未通过</Option>
        <Option value="skipped">跳过</Option>
        <Option value="rejected">拒绝</Option>
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
        },[data]
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
        return (<a
            href="#!"
            onClick={() => add()}
        >
            增加一行
        </a>)
    }

    const stepColumns = [
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
        },
        {
            title: '操作',
            dataIndex: 'operation',
            // width: '15%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="#!"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                    </a>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => del(record.key)}>
                            <a style={{
                                marginRight: 8,
                            }}>删除</a>
                        </Popconfirm>
                        <Popconfirm title="确定要取消吗？" onConfirm={cancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        修改
                    </Typography.Link>
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

    return(
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