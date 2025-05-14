import React, {useContext} from "react";
import {useTable} from "react-table";
import {TableColumns} from "./TableColumns";
import {AppContext} from "../../context";

export const Table = ({data = [], type}) => {

    const {user} = useContext(AppContext);

    const columns = React.useMemo(() => TableColumns(type, user), [type]);
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
    return (<div className="tableContainer">
            <table {...getTableProps()} key={getTableProps.id}>
                <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                        {headerGroup.headers.map((column, colIndex) => (
                            <th {...column.getHeaderProps()} key={`header-${colIndex}`} style={column.style}>
                                {column.render("Header")}
                            </th>))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {prepareRow(row);
                    return (<tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                            {row.cells.map((cell, cellIndex) => (
                                <td {...cell.getCellProps()} key={`cell-${cellIndex}`}>
                                    {cell.render("Cell")}
                                </td>))}
                    </tr>);
                })}
                </tbody>
            </table>
        </div>);
};