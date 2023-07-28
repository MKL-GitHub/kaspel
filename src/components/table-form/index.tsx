import { FC } from "react";
import { Button, DatePicker, Form, FormInstance, Input } from "antd";
import ruLocale from "antd/es/date-picker/locale/ru_RU";

import "./index.scss";
import { TableRow } from "@store/table";

export interface TableFormProps {
  onFinish: (v: TableRow) => void;
  formRef: React.Ref<FormInstance<TableRow>>;
}

export const TableForm: FC<TableFormProps> = ({ onFinish, formRef }) => {
  const [form] = Form.useForm();

  const callbacks = {
    onReset: () => {
      // @ts-ignore
      formRef.current.resetFields();
    },
    onFinish: (row: TableRow) => {
      onFinish(row);
    },
  };

  return (
    <Form
      className="TableForm"
      form={form}
      labelCol={{ flex: "6rem" }}
      labelAlign="left"
      onFinish={callbacks.onFinish}
      autoComplete="off"
      ref={formRef}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Дата" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} locale={ruLocale} />
      </Form.Item>
      <Form.Item name="value" label="Число" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <div className="TableForm-floor">
          <Button onClick={callbacks.onReset}>Очистить</Button>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
