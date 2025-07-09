import React, { useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table"; //리액트가 제공하는 테이블 라이브러리
import { IoIosArrowBack, IoIosArrowForward, IoMdSearch } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaFileCirclePlus } from "react-icons/fa6";


import DataSUD from "../components/dataSUD.jsx";

function SavingList({shelters}) {
  const [searchInput, setSearchInput] = useState(""); //검색어 저장
  const [showDetail, setShowDetail] = useState(false); //하단 상세 표 보이기 안보이기

  const [selectData, setSelectData] = useState("");

  const columns = useMemo(() => [
      { accessor: "id",//연결데이터 키
        Header: "번호"//화면에 보여질 이름
      },
      { accessor: "name", Header: "이름"},
      { accessor: "desc", Header: "설명"},
    ],[]
  );

  const data = React.useMemo(() => 
    shelters.map((shelter) => ({
      id: shelter.id,
      name: shelter.name,
      desc: shelter.description,
    })), [shelters]
  );

  // 검색 버튼 클릭 시
  const handleSearch = () => {
    setFilter('name', searchInput); // name 컬럼에만 필터 적용
  };

  //엔터 눌렀을 때도 검색 기능 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터 키 입력 시 검색 실행
    }
  };

  //열 눌렀을때 데이터 호출
  const handleClickRow = (item) => {
    handleClose();
    setSelectData(item);
    setShowDetail(true);
  };

  //추가 버튼 클릭시
  const handleAdd = () => {
    setShowDetail(true);
  };

  //상세창 닫기
  const handleClose = () => {
    setShowDetail(false);
    setSelectData("");
  };

  const {
    getTableProps, //헤더부분 props 정보
    getTableBodyProps, //나열하는 데이터 부분 정보
    headerGroups, //헤더 렌더링용 배열 (그룹화 가능)
    //rows, //데이터 행 정보
    page, // 페이지네이션 할때는 rows가 아니라 이 걸로 설정해야한다. 이게 전체 rows가 아니라 현재 페이지의 rows
    prepareRow,//row를 그리기 전에 꼭 호출해야 함
    //페이지네이션을 위한 부분 추가
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    state: { pageIndex, pageSize }, // 현재 페이지 상태
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5}, // 기본 페이지 0부터 시작
    },
    useFilters,
    usePagination, // 여기에 붙이면 페이지 기능 활성화
  );


  return (
    <div className="listSet">
      <div className="listTop">
        <div className="search">
          <input type="text" placeholder="보호소 이름" 
                onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}/>
          <IoMdSearch className="icon_public icon_search" onClick={handleSearch}/>
        </div>
        
        <FaFileCirclePlus className="icon_public" onClick={handleAdd}/>
      </div>

      <table className="saveList" {...getTableProps()}>
        <colgroup>
          <col width={"2%"} />
          <col width={"5%"} />
          <col width={"15%"} />
        </colgroup>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className="tHead" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(
                {
                  onClick: () => {handleClickRow(row.original.id) },
                  style: { cursor: "pointer" }
                }
              )}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
          
      <div className="pagination">
        <span className="pageButton">
          <MdKeyboardDoubleArrowLeft onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
          {' '}
          <IoIosArrowBack onClick={() => previousPage()} disabled={!canPreviousPage}/>
          {' '}
          <IoIosArrowForward  onClick={() => nextPage()} disabled={!canNextPage}/>
          {' '}
          <MdKeyboardDoubleArrowRight  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
          {' '}
        </span>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>

      {showDetail && <DataSUD showDetail={handleClose} shelters={selectData}/>}
    </div>
  );
}

export default SavingList;