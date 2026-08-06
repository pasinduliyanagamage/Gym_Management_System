import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

const DataTable = ({ 
  columns, 
  data, 
  searchQuery, 
  onSearchChange,
  pagination,
  onPageChange,
  className 
}) => {
  return (
    <div className={cn("bg-darkSurface border border-white/5 rounded-2xl overflow-hidden flex flex-col", className)}>
      
      {/* Toolbar */}
      {(onSearchChange !== undefined) && (
        <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          {/* Slot for extra toolbar actions */}
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs uppercase bg-darkBg/50 text-gray-400 border-b border-white/5">
            <tr>
              {columns.map((col, i) => (
                <th key={i} scope="col" className={cn("px-6 py-4 font-medium", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={cn("px-6 py-4 whitespace-nowrap", col.cellClassName)}>
                      {col.accessor ? row[col.accessor] : col.render ? col.render(row) : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-400">
          <div>
            Showing <span className="font-medium text-white">{(pagination.currentPage - 1) * pagination.pageSize + 1}</span> to <span className="font-medium text-white">{Math.min(pagination.currentPage * pagination.pageSize, pagination.total)}</span> of <span className="font-medium text-white">{pagination.total}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage * pagination.pageSize >= pagination.total}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
