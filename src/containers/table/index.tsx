import { FC, useState, useRef, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "@store";
import { TableForm } from "@components";
import {
  TableRow,
  addRow,
  deleteRowByKey,
  editRow,
  selectTableData,
} from "@store/table";
import "./index.scss";

const DATE_FORMAT = "D MMMM YYYY г.";

const { Search } = Input;

const getRowKey = ((key = 0) => {
  return () => key++;
})();

export const TableContainer: FC = () => {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(selectTableData);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRowKey, setCurrentRowKey] = useState<number | null>(null);
  const [filteredTableData, setFilteredTableData] =
    useState<TableRow[]>(tableData);

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a: TableRow, b: TableRow) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: TableRow, b: TableRow) =>
          dayjs(a.date).diff(dayjs(b.date), "day"),
      },
      render: (date: string) => dayjs(date).format(DATE_FORMAT),
      width: "10rem",
    },
    {
      title: "Число",
      dataIndex: "value",
      key: "value",
      sorter: {
        compare: (a: TableRow, b: TableRow) => a.value - b.value,
      },
      width: "10rem",
    },
    {
      dataIndex: "actions",
      key: "actions",
      render: (_: any, table: TableRow) => (
        <div className="TableContainer-rowButtons">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(table)}
          ></Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(table.key)}
          ></Button>
        </div>
      ),
      width: "6rem",
    },
  ];

  const onSearch = (value: string) => {
    const search = value.toLowerCase();

    setFilteredTableData(
      tableData.filter(
        ({ name, date, value }) =>
          name.toLowerCase().includes(search) ||
          dayjs(date).format(DATE_FORMAT).toLowerCase().includes(search) ||
          value.toString().includes(search)
      )
    );
  };

  const onAddNewRow = () => {
    // @ts-ignore
    formRef.current?.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFinish = (row: TableRow) => {
    row.value = +row.value;

    if (dayjs.isDayjs(row.date)) {
      row.date = row.date.toString();
    }

    if (currentRowKey === null) {
      row.key = getRowKey();
      dispatch(addRow(row));
    } else {
      row.key = currentRowKey;
      dispatch(editRow(row));
    }

    closeModal();
    setCurrentRowKey(null);
  };

  const onEdit = (row: TableRow) => {
    const editingRow: TableRow = {
      ...row,
      date: dayjs(row.date),
    };

    setCurrentRowKey(row.key);
    setIsModalOpen(true);
    setTimeout(() => {
      // @ts-ignore
      formRef.current?.setFieldsValue(editingRow);
    });
  };

  const onDelete = (key: number) => {
    dispatch(deleteRowByKey(key));
  };

  return (
    <>
      <div className="TableContainer">
        <Search
          className="TableContainer-search"
          placeholder="Поиск"
          onSearch={onSearch}
          enterButton
        />
        <Button
          type="primary"
          className="TableContainer-addButton"
          onClick={onAddNewRow}
        >
          Добавить
        </Button>

        <Table
          className="TableContainer-table"
          columns={columns}
          dataSource={filteredTableData}
          rowKey={"key"}
        />
      </div>

      <Modal
        title="Добавить элемент"
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
      >
        {isModalOpen && <TableForm formRef={formRef} onFinish={onFinish} />}
      </Modal>
    </>
  );
};
