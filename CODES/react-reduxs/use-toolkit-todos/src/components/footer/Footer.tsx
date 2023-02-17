/*
 * @Author: Lee
 * @Date: 2023-02-12 07:20:04
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-12 15:01:51
 * @Description:
 */
import React from 'react';
import {
  FiltersState,
  FiltersStatus,
  filtersActions,
} from '@/store/slices/filtersSlice';
import { AVAILABLE_COLORs } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { todoActions } from '@/store/slices/todosSlice';

const RemainingTodos: React.FC<{ count: number }> = ({ count }) => {
  const suffix = count === 1 ? '' : 's';
  return (
    <div className='todo-count'>
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

const StatusFilter: React.FC<{
  value: FiltersStatus;
  onChange: (status: FiltersStatus) => void;
}> = ({ value: status, onChange }) => {
  // -- renders
  const renderedFilters = Object.keys(FiltersStatus).map((key: string) => {
    const value = FiltersStatus[key as keyof typeof FiltersStatus];
    const handleClick = () => {
      onChange(value);
    };
    const className = value === status ? 'selected' : '';
    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className='filters FiltersStatus'>
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

const ColorFilters: React.FC<{
  value: Array<string>;
  onChange: (color: string, changeType: 'added' | 'removed') => void;
}> = ({ value: colors, onChange }) => {
  // -- renders
  const renderedColors = AVAILABLE_COLORs.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added';
      onChange(color, changeType);
    };
    return (
      <div key={color}>
        <input
          type='checkbox'
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span className='color-block' style={{ backgroundColor: color }} />
        <span>{color[0].toUpperCase() + color.slice(1)}</span>
      </div>
    );
  });

  return (
    <div className='filters colorFilters'>
      <h5>Filter by Color</h5>
      <form className='colorSelection'>{renderedColors}</form>
    </div>
  );
};

const Footer: React.FC = () => {
  // -- selectors
  const todosRemaining = useSelector<RootState, number>((state) => {
    return state.todos.filter((todo) => !todo.completed).length;
  });
  const { colors, status } = useSelector<RootState, FiltersState>(
    (state) => state.filters
  );
  // -- dispatch
  const dispatch = useDispatch();

  // -- events
  const onColorChange = (color: string, changeType: 'added' | 'removed') => {
    dispatch(filtersActions.colorFilterChanged({ color, changeType }));
  };

  const onStatusChange = (status: FiltersStatus) => {
    dispatch(filtersActions.statusFilterChanged(status));
  };
  const onMarkCompletedClicked = () => {
    dispatch(todoActions.allCompleted());
  };
  const onClearCompletedClicked = () => {
    dispatch(todoActions.completedCleared());
  };
  // -- renders
  return (
    <footer className='footer'>
      <div className='actions'>
        <h5>Actions</h5>
        <button className='button' onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className='button' onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>
      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default Footer;
