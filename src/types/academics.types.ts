export interface APIAcademicYearProps {
    id: string;
    academicYearStart: number;
    academicYearEnd: number;
    schoolTerm: number;
    dateFrom: string;
    dateTo: string;
}


export interface APIAcademicPayload {
    academicYearStart: number;
    academicYearEnd: number;
    schoolTerm: number;
    dateFrom: string;
    dateTo: string;
}
