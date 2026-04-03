'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type {
  TableColumn,
  TableProps,
} from 'react-data-table-component';
import "./../../styles/styles.css";

const DataTableBase = dynamic(
  () => import('react-data-table-component'),
  { ssr: false }
) as typeof import('react-data-table-component').default;

type DataTableClientProps<T> = TableProps<T> & {
  columns: TableColumn<T>[];
  data: T[];
};

function DataTableClient<T>({
  columns,
  data,
  ...props
}: DataTableClientProps<T>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const memoColumns = useMemo(() => columns, [columns]);

  const memoData = useMemo(() => data, [data]);

  if (!mounted) return null;

  return (
    <DataTableBase
      columns={memoColumns}
      data={memoData}
      {...props}
    />
  );
}

export default DataTableClient;