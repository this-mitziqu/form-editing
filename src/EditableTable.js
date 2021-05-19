import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import axios from 'axios';

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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
                message: `Please Input ${title}!`,
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
    const originData = JSON.parse(props.result.trackInfo)[0].steps;
    originData.map((el, idx)=> {
      el['key']= idx;
    });
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        stepName: '',
        stepStatus: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    const handleDelete = async (key) => {
      const newData = [...data];
      newData.filter((item) => item.key !== key);
      setData(newData);
    };
    const handleAdd = () => {
      const newData = [...data];
      const row = {
        stepName: ``,
        stepStatus: 'false',
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
        console.log(newData);
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const columns = [
      {
        title: '步骤',
        dataIndex: 'stepName',
        width: '40%',
        editable: true,
      },
      {
        title: '状态',
        dataIndex: 'stepStatus',
        width: '15%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
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
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'text',
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
          pagination={ false }
          rowKey="uid"
        />
      </Form>
    );
  };

export default EditableTable