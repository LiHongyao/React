import { useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd/es/table';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';


/********************
 ** useTableHooks
 ********************/
type FetchType<T> = (current: number) => Promise<{
  list: T[];
  total: number;
}>;

const useTableHooks = <T,>(fetch: FetchType<T>) => {
  // -- state
  const [dataSource, setDataSource] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  // -- loadData
  const loadData = async (current = 1) => {
    setLoading(true);
    const { list, total } = await fetch(current);
    setDataSource(list);
    setTotal(total);
    setLoading(false);
  };
  // -- events
  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    setCurrent(pagination.current || 1);
    loadData(pagination.current || 1);
  };
  // -- effecs
  useEffect(() => {
    loadData();
  }, []);
  return {
    dataSource,
    onChange,
    current,
    loading,
    total,
  };
};
export default useTableHooks;
