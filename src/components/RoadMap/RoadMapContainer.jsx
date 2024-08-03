import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import useClient from '../../hooks/useClient';
import {
	competencyListInSubjectState as competencyListInSubjectState,
	courseByCompetencyInSubjectState
} from '../../recoils/atoms';
import RoadMapTable from './RoadMapTable';

const Container = styled.div`
	margin-left: auto;
	display: flex;
	flex-direction: column;
	transition: width 500ms ease-in-out;

	&.with-sidebar {
		width: calc(100% - 20rem);
	}

	&.full-width {
		width: 100%;
	}
`;

const TitleWrapper = styled.div`
	padding-left: 1rem;
	padding-right: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.div`
	font-size: xx-large;
	font-weight: bolder;
	color: #036b3f;
`;

const Button = styled.button`
	height: 2rem;
	width: 23rem;
	background-color: #54ad2d;
	color: white;
	border: none;
	border-radius: 0.2rem;
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-size: small;

	&:hover {
		background-color: #459423;
	}
`;

// const courseByCompetencyInSubjectData_1 = {
// 	subjectCode: '122281',
// 	subjectName: '미디어커뮤니케이션학과',
// 	competencyCode: '12228106',
// 	competencyName: '기업 홍보 능력',
// 	courses: [
// 		{
// 			haksuId: 'BANA45191',
// 			courseName: '광고와 커뮤니케이션',
// 			year: 3,
// 			semester: '1학기'
// 		},
// 		{
// 			haksuId: 'COM402',
// 			courseName: '디지털 미디어 전략',
// 			year: 4,
// 			semester: '2학기'
// 		}
// 	]
// };

// const courseByCompetencyInSubjectData_2 = {
// 	subjectCode: '122281',
// 	subjectName: '미디어커뮤니케이션학과',
// 	competencyCode: '12228108',
// 	competencyName: '광고 기획 및 제작 능력',
// 	courses: [
// 		{
// 			haksuId: 'COM201',
// 			courseName: 'Lorem Ipsum2-1',
// 			year: 2,
// 			semester: '1학기'
// 		},
// 		{
// 			haksuId: 'BANA45191',
// 			courseName: '광고와 커뮤니케이션',
// 			year: 3,
// 			semester: '1학기'
// 		},
// 		{
// 			haksuId: 'COM403',
// 			courseName: 'Lorem Ipsum4-1',
// 			year: 4,
// 			semester: '1학기'
// 		}
// 	]
// };

// const courseByCompetencyInSubjectData_3 = {
// 	subjectCode: '122281',
// 	subjectName: '미디어커뮤니케이션학과',
// 	competencyCode: '12228103',
// 	competencyName: '융합커뮤니케이션 이해 및 응용 능력',
// 	courses: [
// 		{
// 			haksuId: 'COM202',
// 			courseName: 'Lorem Ipsum2-1-1',
// 			year: 2,
// 			semester: '1학기'
// 		},
// 		{
// 			haksuId: 'BANA45191',
// 			courseName: '광고와 커뮤니케이션',
// 			year: 3,
// 			semester: '1학기'
// 		},
// 		{
// 			haksuId: 'COM404',
// 			courseName: 'Lorem Ipsu3-2',
// 			year: 3,
// 			semester: '2학기'
// 		}
// 	]
// };
// const courseByCompetencyInSubjectData = [
// 	courseByCompetencyInSubjectData_1,
// 	courseByCompetencyInSubjectData_2,
// 	courseByCompetencyInSubjectData_3
// ];

const RoadMapContainer = ({ show }) => {
	const competencyListInSubject = useRecoilValue(competencyListInSubjectState); // eslint-disable-line no-unused-vars
	const courseByCompetencyInSubject = useRecoilValue(courseByCompetencyInSubjectState); // eslint-disable-line no-unused-vars

	const { fetchCompetencyListInSubject, fetchCourseByCompetencyInSubject } = useClient();

	const [roadMapTableData, setRoadMapTableData] = useState([
		[['semester3', '2-1', '', '']],
		[['semester4', '2-2', '', '']],
		[['semester5', '3-1', '', '']],
		[['semester6', '3-2', '', '']],
		[['semester7', '4-1', '', '']],
		[['semester8', '4-2', '', '']]
	]);
	const [myTableData, setMyTableData] = useState([
		[['semester3', '2-1', '', '']],
		[['semester4', '2-2', '', '']],
		[['semester5', '3-1', '', '']],
		[['semester6', '3-2', '', '']],
		[['semester7', '4-1', '', '']],
		[['semester8', '4-2', '', '']]
	]);
	const [myCompetencyList, setMyCompetencyList] = useState({}); // eslint-disable-line no-unused-vars

	const subjectName = competencyListInSubject.subjectName;

	useEffect(() => {
		fetchCompetencyListInSubject();
		fetchCourseByCompetencyInSubject();
	}, []);

	useEffect(() => {
		if (!courseByCompetencyInSubject.subjectCode) {
			console.log('courseByCompetencyInSubject is empty');
		} else {
			console.log('courseByCompetencyInSubject: ', courseByCompetencyInSubject);

			let delay = 0;
			courseByCompetencyInSubject.courses.forEach((course) => {
				const { year, semester, haksuId, courseName } = course;
				const semesterIndex = semester === '1학기' ? 0 : 1;
				const index = (year - 2) * 2 + semesterIndex;

				setTimeout(() => {
					setRoadMapTableData((prevItems) => {
						const newItems = [...prevItems];
						newItems[index] = [
							...newItems[index],
							[
								haksuId,
								courseName,
								courseByCompetencyInSubject.competencyCode,
								courseByCompetencyInSubject.competencyName
							]
						];
						return newItems;
					});
				}, delay);
				delay += 50;
			});
		}
	}, [courseByCompetencyInSubject]);

	const [unclickableCells, setUnclickableCells] = useState([]);

	const handleCellClick_add = (cellData, rowIndex) => {
		if (unclickableCells.some((cell) => cell.row === rowIndex && cell.cellData === cellData)) return;

		// Set cell as unclickable
		const updatedUnclickableCells = [...unclickableCells];
		updatedUnclickableCells.push({ cellData: cellData, row: rowIndex });
		setUnclickableCells(updatedUnclickableCells);

		// Update tableDataDefault to add the clicked cell's data
		const updatedMyTableData = [...myTableData];
		updatedMyTableData[rowIndex].push(cellData);
		setMyTableData(updatedMyTableData);
	};

	const handleCellClick_remove = (cellData, rowIndex) => {
		// Remove cell from unclickableCells
		const updatedUnclickableCells = unclickableCells.filter(
			(cell) => !(cell.row === rowIndex && cell.cellData === cellData)
		);
		setUnclickableCells(updatedUnclickableCells);

		// Update tableDataDefault to remove the clicked cell's data
		const updatedMyTableData = [...myTableData];
		const cellIndex = updatedMyTableData[rowIndex].indexOf(cellData);
		if (cellIndex !== -1) {
			updatedMyTableData[rowIndex].splice(cellIndex, 1);
		}
		setMyTableData(updatedMyTableData);
	};

	return (
		<Container className={`content ${show ? 'with-sidebar' : 'full-width'}`}>
			<TitleWrapper>
				<Title>학과 로드맵</Title>
				<Button>{subjectName} 로드맵 보기</Button>
			</TitleWrapper>
			<RoadMapTable
				competencyTableData={competencyListInSubject}
				roadMapTableData={roadMapTableData}
				onCellClick={handleCellClick_add}
				unclickableCells={unclickableCells}
			/>
			<TitleWrapper>
				<Title>내 로드맵</Title>
			</TitleWrapper>
			<RoadMapTable
				competencyTableData={myCompetencyList}
				roadMapTableData={myTableData}
				onCellClick={handleCellClick_remove}
				unclickableCells={[]}
			/>
		</Container>
	);
};

export default RoadMapContainer;
